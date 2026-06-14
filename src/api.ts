import { Game, GROUPS, ROUNDS, TEAM_NAMES } from "./tournament";

type ApiGame = {
  home_team_name_en?: string;
  away_team_name_en?: string;
  home_score: string;
  away_score: string;
  group: string;
  finished: string;
};

export const parseGames = (apiGames: ApiGame[]): Game[] => {
  const games: Game[] = [];

  apiGames.forEach((apiGame) => {
    const game: Partial<Game> = {};

    const finished = apiGame.finished;
    if (finished !== "TRUE" && finished !== "FALSE") {
      throw Error(`Invalid finished: ${finished}`);
    }
    game.isFinished = finished === "TRUE";

    const homeTeam = apiGame.home_team_name_en;
    const awayTeam = apiGame.away_team_name_en;
    if (!homeTeam || !awayTeam) {
      return;
    }

    if (!TEAM_NAMES.includes(homeTeam) || !TEAM_NAMES.includes(awayTeam)) {
      throw Error(`Invalid team: ${homeTeam}, ${awayTeam}`);
    }
    game.homeTeam = homeTeam;
    game.awayTeam = awayTeam;

    const homeScore = Number(apiGame.home_score);
    const awayScore = Number(apiGame.away_score);
    if (!Number.isFinite(homeScore) || !Number.isFinite(awayScore)) {
      throw Error(`Invalid score: ${apiGame}`);
    }
    game.homeScore = homeScore;
    game.awayScore = awayScore;

    const round = apiGame.group;
    if (!ROUNDS.includes(round) && !GROUPS.includes(round)) {
      throw Error(`Invalid round: ${apiGame}`);
    }

    if (GROUPS.includes(round)) {
      game.round = "GROUP";
    } else {
      game.round = round;
    }

    games.push(game as Game);
  });

  return games;
};

export const fetchGames = async (): Promise<Game[]> => {
  const response = await fetch(`https://worldcup26.ir/get/games`);
  const responseJson = await response.json();

  const games = responseJson.games;
  const completedGames = parseGames(games);

  return completedGames;
};
