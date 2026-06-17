import { Game, GROUPS, ROUNDS, TEAM_NAMES } from "./tournament";

type ApiGame = {
  home_team_name_en?: string;
  home_team_id: string;
  away_team_name_en?: string;
  away_team_id: string;
  home_score: string | null;
  away_score: string | null;
  group: string;
  time_elapsed: string;
};

export const parseGames = (apiGames: ApiGame[]): Game[] => {
  const games: Game[] = [];

  apiGames.forEach((apiGame) => {
    const game: Partial<Game> = {};

    if (apiGame.time_elapsed.toLowerCase() === "finished") {
      game.status = "finished";
    } else if (apiGame.time_elapsed === "live") {
      game.status = "in-progress";
    } else if (apiGame.time_elapsed === "notstarted") {
      if (apiGame.home_team_id === "0" || apiGame.away_team_id === "0") {
        game.status = "unknown";
      } else {
        game.status = "not-started";
      }
    } else {
      throw Error(`Invalid finished: ${apiGame.time_elapsed}`);
    }

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

    const homeScore =
      apiGame.home_score === "null" ? 0 : Number(apiGame.home_score);
    const awayScore =
      apiGame.away_score === "null" ? 0 : Number(apiGame.away_score);
    if (!Number.isFinite(homeScore) || !Number.isFinite(awayScore)) {
      throw Error(`Invalid score: ${JSON.stringify(apiGame)}`);
    }
    game.homeScore = homeScore;
    game.awayScore = awayScore;

    const round = apiGame.group;
    if (!ROUNDS.includes(round) && !GROUPS.includes(round)) {
      throw Error(`Invalid round: ${JSON.stringify(apiGame)}`);
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
