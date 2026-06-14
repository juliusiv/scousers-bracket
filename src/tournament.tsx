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

export const TEAMS = [
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
type Team = (typeof TEAMS)[number];

export const TEAM_FLAGS: Record<Team, string> = {
  Spain: "🇪🇸",
  France: "🇫🇷",
  Portugal: "🇵🇹",
  Argentina: "🇦🇷",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Brazil: "🇧🇷",
  Germany: "🇩🇪",
  Netherlands: "🇳🇱",
  Senegal: "🇸🇳",
  Colombia: "🇨🇴",
  Morocco: "🇲🇦",
  Norway: "🇳🇴",
  Japan: "🇯🇵",
  "United States": "🇺🇸",
  Mexico: "🇲🇽",
  Belgium: "🇧🇪",
  Croatia: "🇭🇷",
  Uruguay: "🇺🇾",
  Ecuador: "🇪🇨",
  Switzerland: "🇨🇭",
  "South Korea": "🇰🇷",
  Canada: "🇨🇦",
  Panama: "🇵🇦",
  Algeria: "🇩🇿",
  Egypt: "🇪🇬",
  Paraguay: "🇵🇾",
  Sweden: "🇸🇪",
  Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  Austria: "🇦🇹",
  Iran: "🇮🇷",
  Turkey: "🇹🇷",
  "Ivory Coast": "🇨🇮",
  Ghana: "🇬🇭",
  Australia: "🇦🇺",
  Iraq: "🇮🇶",
  "Czech Republic": "🇨🇿",
  Uzbekistan: "🇺🇿",
  "Bosnia and Herzegovina": "🇧🇦",
  "New Zealand": "🇳🇿",
  "Saudi Arabia": "🇸🇦",
  Haiti: "🇭🇹",
  Jordan: "🇯🇴",
  Qatar: "🇶🇦",
  Tunisia: "🇹🇳",
  Curaçao: "🇨🇼",
  "Democratic Republic of the Congo": "🇨🇩",
  "South Africa": "🇿🇦",
  "Cape Verde": "🇨🇻",
};

export const DRAFT_PICKS: Record<Team, Bab> = {
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
export const ROUNDS = ["GROUP", "R32", "R16", "QF", "SF", "3RD", "FINAL"];
type Round = (typeof ROUNDS)[number];

export type Game = {
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  round: Round;
  isFinished: boolean;
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

export type Score = Record<Round, number> & { total: number };

export function calculateScores(games: Game[]): Record<Bab, Score> {
  const scores = Object.fromEntries(
    BABS.map((bab) => [
      bab,
      { ...Object.fromEntries(ROUNDS.map((r) => [r, 0])), total: 0 },
    ]),
  ) as Record<Bab, Score>;

  for (const game of games) {
    if (!game.isFinished) {
      continue;
    }

    const { homeTeam, awayTeam, homeScore, awayScore, round } = game;
    const homeBab = DRAFT_PICKS[homeTeam];
    const awayBab = DRAFT_PICKS[awayTeam];

    if (homeScore === awayScore) {
      scores[homeBab][round] += 1;
      scores[homeBab].total += 1;
      scores[awayBab][round] += 1;
      scores[awayBab].total += 1;
    } else {
      const winnerBab = homeScore > awayScore ? homeBab : awayBab;
      const pts = ROUND_WIN_POINTS[round];
      scores[winnerBab][round] += pts;
      scores[winnerBab].total += pts;
    }
  }

  return scores;
}
