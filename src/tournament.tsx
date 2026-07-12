export const BABS = [
  "Julius",
  "Rob",
  "Potocki",
  "Ross",
  "Eugene",
  "Omar",
  "Chad",
  "Twomey",
];
export type Bab = (typeof BABS)[number];

export const TEAM_NAMES = [
  "Spain",
  "France",
  "Portugal",
  "Argentina",
  "England",
  "Brazil",
  "Germany",
  "Netherlands",
  "Senegal",
  "Colombia",
  "Morocco",
  "Norway",
  "Japan",
  "United States",
  "Mexico",
  "Belgium",
  "Croatia",
  "Uruguay",
  "Ecuador",
  "Switzerland",
  "South Korea",
  "Canada",
  "Panama",
  "Algeria",
  "Egypt",
  "Paraguay",
  "Sweden",
  "Scotland",
  "Austria",
  "Iran",
  "Turkey",
  "Ivory Coast",
  "Ghana",
  "Australia",
  "Iraq",
  "Czech Republic",
  "Uzbekistan",
  "Bosnia and Herzegovina",
  "New Zealand",
  "Saudi Arabia",
  "Haiti",
  "Jordan",
  "Qatar",
  "Tunisia",
  "Curaçao",
  "Democratic Republic of the Congo",
  "South Africa",
  "Cape Verde",
];
type TeamName = (typeof TEAM_NAMES)[number];

export const TEAMS: Record<TeamName, { flag: string; short: string }> = {
  Spain: { flag: "🇪🇸", short: "ESP" },
  France: { flag: "🇫🇷", short: "FRA" },
  Portugal: { flag: "🇵🇹", short: "POR" },
  Argentina: { flag: "🇦🇷", short: "ARG" },
  England: { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", short: "ENG" },
  Brazil: { flag: "🇧🇷", short: "BRA" },
  Germany: { flag: "🇩🇪", short: "GER" },
  Netherlands: { flag: "🇳🇱", short: "NED" },
  Senegal: { flag: "🇸🇳", short: "SEN" },
  Colombia: { flag: "🇨🇴", short: "COL" },
  Morocco: { flag: "🇲🇦", short: "MAR" },
  Norway: { flag: "🇳🇴", short: "NOR" },
  Japan: { flag: "🇯🇵", short: "JPN" },
  "United States": { flag: "🇺🇸", short: "USA" },
  Mexico: { flag: "🇲🇽", short: "MEX" },
  Belgium: { flag: "🇧🇪", short: "BEL" },
  Croatia: { flag: "🇭🇷", short: "CRO" },
  Uruguay: { flag: "🇺🇾", short: "URU" },
  Ecuador: { flag: "🇪🇨", short: "ECU" },
  Switzerland: { flag: "🇨🇭", short: "SUI" },
  "South Korea": { flag: "🇰🇷", short: "KOR" },
  Canada: { flag: "🇨🇦", short: "CAN" },
  Panama: { flag: "🇵🇦", short: "PAN" },
  Algeria: { flag: "🇩🇿", short: "ALG" },
  Egypt: { flag: "🇪🇬", short: "EGY" },
  Paraguay: { flag: "🇵🇾", short: "PAR" },
  Sweden: { flag: "🇸🇪", short: "SWE" },
  Scotland: { flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", short: "SCO" },
  Austria: { flag: "🇦🇹", short: "AUT" },
  Iran: { flag: "🇮🇷", short: "IRN" },
  Turkey: { flag: "🇹🇷", short: "TUR" },
  "Ivory Coast": { flag: "🇨🇮", short: "CIV" },
  Ghana: { flag: "🇬🇭", short: "GHA" },
  Australia: { flag: "🇦🇺", short: "AUS" },
  Iraq: { flag: "🇮🇶", short: "IRQ" },
  "Czech Republic": { flag: "🇨🇿", short: "CZE" },
  Uzbekistan: { flag: "🇺🇿", short: "UZB" },
  "Bosnia and Herzegovina": { flag: "🇧🇦", short: "BIH" },
  "New Zealand": { flag: "🇳🇿", short: "NZL" },
  "Saudi Arabia": { flag: "🇸🇦", short: "KSA" },
  Haiti: { flag: "🇭🇹", short: "HAI" },
  Jordan: { flag: "🇯🇴", short: "JOR" },
  Qatar: { flag: "🇶🇦", short: "QAT" },
  Tunisia: { flag: "🇹🇳", short: "TUN" },
  Curaçao: { flag: "🇨🇼", short: "CUW" },
  "Democratic Republic of the Congo": { flag: "🇨🇩", short: "COD" },
  "South Africa": { flag: "🇿🇦", short: "RSA" },
  "Cape Verde": { flag: "🇨🇻", short: "CPV" },
};

export const DRAFT_PICKS: Record<TeamName, Bab> = {
  Spain: "Julius",
  France: "Rob",
  Portugal: "Omar",
  Argentina: "Eugene",
  England: "Chad",
  Brazil: "Potocki",
  Germany: "Ross",
  Netherlands: "Twomey",
  Senegal: "Julius",
  Colombia: "Rob",
  Morocco: "Omar",
  Norway: "Eugene",
  Japan: "Chad",
  "United States": "Potocki",
  Mexico: "Ross",
  Belgium: "Twomey",
  Croatia: "Julius",
  Uruguay: "Rob",
  Ecuador: "Omar",
  Switzerland: "Eugene",
  "South Korea": "Chad",
  Canada: "Potocki",
  Panama: "Ross",
  Algeria: "Twomey",
  Egypt: "Julius",
  Paraguay: "Rob",
  Sweden: "Omar",
  Scotland: "Eugene",
  Austria: "Chad",
  Iran: "Potocki",
  Turkey: "Ross",
  "Ivory Coast": "Twomey",
  Ghana: "Julius",
  Australia: "Rob",
  Iraq: "Omar",
  "Czech Republic": "Eugene",
  Uzbekistan: "Chad",
  "Bosnia and Herzegovina": "Potocki",
  "New Zealand": "Ross",
  "Saudi Arabia": "Twomey",
  Haiti: "Julius",
  Jordan: "Rob",
  Qatar: "Omar",
  Tunisia: "Eugene",
  Curaçao: "Chad",
  "Democratic Republic of the Congo": "Potocki",
  "South Africa": "Ross",
  "Cape Verde": "Twomey",
};

// Sanity check that I didn't input this data wrong
BABS.forEach((bab) => {
  const numPicks = Object.values(DRAFT_PICKS).filter(
    (picker) => picker === bab,
  ).length;

  if (numPicks !== 6) {
    throw Error(`${bab} has more than 6 picks (${numPicks} picks found)`);
  }
});

export const GROUPS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
];
export const ROUNDS = [
  "GROUP",
  "R32",
  "R16",
  "QF",
  "SF",
  "3RD",
  "FINAL",
] as const;
export type Round = (typeof ROUNDS)[number];

export type Game = {
  homeTeam: TeamName;
  awayTeam: TeamName;
  homeScore: number;
  awayScore: number;
  homePkScore: number | null;
  awayPkScore: number | null;
  round: Round;
  status: "in-progress" | "finished" | "not-started" | "unknown";
  date: Date;
};

// 1 point for a tie
// 3 points for group play win
// 4 points for round of 32 win
// 5 points for round of 16 win
// 6 points for quarterfinal win
// 7 points for semifinal win
// 8 points for overall winner
// 5 points for 3rd place game winner

export const ROUND_WIN_POINTS: Record<Round, number> = {
  GROUP: 3,
  R32: 4,
  R16: 5,
  QF: 6,
  SF: 7,
  "3RD": 5,
  FINAL: 8,
};

export type Score = Record<Round, { scored: number; possible: number }> & {
  totalScored: number;
  totalPossible: number;
};

export function calculateScores(games: Game[]): Record<Bab, Score> {
  const scores = Object.fromEntries(
    BABS.map((bab) => {
      const roundScores = {
        ...Object.fromEntries(
          ROUNDS.map((r) => [
            r,
            {
              scored: 0,
              possible: 0,
            },
          ]),
        ),
        totalScored: 0,
        totalPossible: 0,
      };

      return [bab, roundScores];
    }),
  ) as Record<Bab, Score>;

  for (const game of games) {
    if (game.status !== "finished") {
      continue;
    }

    const { homeTeam, awayTeam, homeScore, awayScore, round } = game;
    const homeBab = DRAFT_PICKS[homeTeam];
    const awayBab = DRAFT_PICKS[awayTeam];

    const pts = ROUND_WIN_POINTS[round];

    const babHasBothTeams = homeBab === awayBab;
    // If the BAB has both teams then home/away will both point to their
    // scores, so only update one of them or else we'll double-count.
    // Since only one team can win, the max possible in a game where they
    // own both teams is 3; they could also both tie and get 1 point for
    // each draw.
    if (babHasBothTeams) {
      scores[homeBab][round].possible += pts;
      scores[homeBab].totalPossible += pts;
    } else {
      scores[homeBab][round].possible += pts;
      scores[homeBab].totalPossible += pts;
      scores[awayBab][round].possible += pts;
      scores[awayBab].totalPossible += pts;
    }

    if (homeScore === awayScore && round === "GROUP") {
      scores[homeBab][round].scored += 1;
      scores[homeBab].totalScored += 1;
      scores[awayBab][round].scored += 1;
      scores[awayBab].totalScored += 1;
    } else {
      const winningTeam: TeamName = determineWinner(game);
      const winnerBab: Bab = DRAFT_PICKS[winningTeam];

      scores[winnerBab][round].scored += pts;
      scores[winnerBab].totalScored += pts;
    }
  }

  return scores;
}

export const determineWinner = (game: Game): TeamName => {
  const { homeTeam, awayTeam, homeScore, awayScore, homePkScore, awayPkScore } =
    game;
  const homeBab = DRAFT_PICKS[homeTeam];
  const awayBab = DRAFT_PICKS[awayTeam];

  if (homeScore === awayScore && homePkScore && awayPkScore) {
    return homePkScore > awayPkScore ? homeTeam : awayTeam;
  } else {
    return homeScore > awayScore ? homeTeam : awayTeam;
  }
};

export const numPossibleInRound = (
  games: Game[],
  bab: Bab,
  round: Round,
): number => {
  let num = 0;

  for (const game of games) {
    if (game.round !== round) {
      continue;
    }

    const hasHomeTeam = DRAFT_PICKS[game.homeTeam] === bab;
    const hasAwayTeam = DRAFT_PICKS[game.awayTeam] === bab;

    if (hasHomeTeam || hasAwayTeam) {
      num++;
    }
  }

  return num * ROUND_WIN_POINTS[round];
};

export const CURRENT_ROUND: Round = "QF";

export const isTeamEliminated = (games: Game[], team: TeamName): boolean => {
  for (const game of games) {
    if (game.round !== CURRENT_ROUND) {
      continue;
    }

    const isTeamPlayingInRound = [game.homeTeam, game.awayTeam].includes(team);
    if (isTeamPlayingInRound && game.status === "finished") {
      const winner = determineWinner(game);
      return winner !== team;
    } else if (isTeamPlayingInRound) {
      return false;
    }
  }

  return true;
};
