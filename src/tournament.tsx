const BABS = [
  "Julius",
  "Rob",
  "Potocki",
  "Ross",
  "Eugene",
  "Omar",
  "Chad",
  "Twomey",
];
type Bab = (typeof BABS)[number];

const TEAMS = [
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
  "USA",
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
  "Czechia",
  "Uzbekistan",
  "Bosnia",
  "New Zealand",
  "Saudi Arabia",
  "Haiti",
  "Jordan",
  "Qatar",
  "Tunisia",
  "Curaçao",
  "Congo",
  "South Africa",
  "Cape Verde",
];
type Team = (typeof TEAMS)[number];

const DRAFT_PICKS: Record<Team, Bab> = {
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
  USA: "Potocki",
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
  Czechia: "Eugene",
  Uzbekistan: "Chad",
  Bosnia: "Potocki",
  "New Zealand": "Ross",
  "Saudi Arabia": "Twomey",
  Haiti: "Julius",
  Jordan: "Rob",
  Qatar: "Omar",
  Tunisia: "Eugene",
  Curaçao: "Chad",
  Congo: "Potocki",
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

const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
const ELIMINATION_ROUNDS = ["R32", "R16", "QF", "SF", "3RD", "FINAL"];
const ROUNDS = [...GROUPS, ...ELIMINATION_ROUNDS];

// 1 point for a tie
// 3 points for group play win
// 4 points for round of 32 win
// 5 points for round of 16 win
// 6 points for quarterfinal win
// 7 points for semifinal win
// 8 points for overall winner
// 5 points for 3rd place game winner
