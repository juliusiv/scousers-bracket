import type { Component } from "solid-js";
import { createSignal, For, Show } from "solid-js";
import {
  BABS,
  DRAFT_PICKS,
  TEAMS,
  ROUND_WIN_POINTS,
  type Bab,
  type Game,
  type Score,
  calculateScores,
  Round,
  numPossibleInRound,
  determineWinner,
  CURRENT_ROUND,
} from "./tournament";

const ROUND_COLUMNS: { label: string; key: Round | "total" }[] = [
  { label: "Total", key: "total" },
  { label: "Group", key: "GROUP" },
  { label: "R32", key: "R32" },
  { label: "R16", key: "R16" },
  { label: "QF", key: "QF" },
  { label: "SF", key: "SF" },
  { label: "3RD", key: "3RD" },
  { label: "Final", key: "FINAL" },
];

const ROUND_LABELS: Record<string, string> = {
  GROUP: "Group",
  R32: "R32",
  R16: "R16",
  QF: "QF",
  SF: "SF",
  "3RD": "3rd",
  FINAL: "Final",
};

type GameResult = {
  game: Game;
  homeIsBab: boolean;
  awayIsBab: boolean;
  points: number;
};

function getBabGames(games: Game[], bab: Bab): GameResult[] {
  return games
    .filter(
      (g) =>
        g.status === "finished" &&
        (DRAFT_PICKS[g.homeTeam] === bab || DRAFT_PICKS[g.awayTeam] === bab),
    )
    .map((game) => {
      const homeIsBab = DRAFT_PICKS[game.homeTeam] === bab;
      const awayIsBab = DRAFT_PICKS[game.awayTeam] === bab;
      let points = 0;
      if (game.homeScore === game.awayScore && game.round === "GROUP") {
        points = (homeIsBab ? 1 : 0) + (awayIsBab ? 1 : 0);
      } else {
        const homeWon = determineWinner(game) === game.homeTeam;
        if (homeWon && homeIsBab) points = ROUND_WIN_POINTS[game.round];
        if (!homeWon && awayIsBab) points = ROUND_WIN_POINTS[game.round];
      }
      return { game, homeIsBab, awayIsBab, points };
    });
}

const Th = (props: { title: string }) => {
  const { title } = props;

  return (
    <th class="border border-gray-300 pl-2 pr-4 py-2 font-semibold text-left">
      {title}
    </th>
  );
};

const ScoresTable: Component<{ games: Game[] }> = (props) => {
  const games = () => props.games;

  const scores = () => calculateScores(games());
  const sortedScores = () =>
    Object.entries(scores()).toSorted((a, b) => {
      const [, score1] = a;
      const [, score2] = b;

      return score2.totalScored - score1.totalScored;
    });

  const [expanded, setExpanded] = createSignal<Bab | null>(null);

  const toggle = (bab: Bab) =>
    setExpanded((prev) => (prev === bab ? null : bab));

  const colSpan = 1 + ROUND_COLUMNS.length;

  return (
    <table class="border-collapse text-xl sm:text-base">
      <thead>
        <tr>
          <Th title="BAB" />
          <For each={ROUND_COLUMNS}>{(col) => <Th title={col.label} />}</For>
        </tr>
      </thead>

      <tbody>
        <For each={sortedScores()}>
          {([bab, score]) => (
            <>
              <tr
                class="cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => toggle(bab)}
              >
                <td class="border border-gray-300 pl-2 pr-4 py-1">
                  <span class="mr-1 text-gray-400">
                    {expanded() === bab ? "▾" : "▸"}
                  </span>
                  {bab}
                </td>
                <For each={ROUND_COLUMNS}>
                  {(col) => {
                    const { scored, possible } =
                      col.key === "total"
                        ? {
                            scored: score.totalScored,
                            possible: score.totalPossible,
                          }
                        : score[col.key];

                    const formattedPct = ((scored / possible) * 100).toFixed(0);
                    let possibleInRound = null;
                    if (col.key === CURRENT_ROUND) {
                      possibleInRound = numPossibleInRound(
                        games(),
                        bab,
                        col.key,
                      );
                    }

                    return (
                      <td class="border border-gray-300 px-2 py-1">
                        <span class="mr-1">{scored}</span>
                        <span class="text-sm sm:text-xs text-nowrap">
                          /{possible}{" "}
                          {possibleInRound !== null
                            ? `(${possibleInRound})`
                            : ""}
                          {col.key === "total" ? `(${formattedPct}%)` : ""}
                        </span>
                      </td>
                    );
                  }}
                </For>
              </tr>

              <Show when={expanded() === bab}>
                <tr>
                  <td
                    colspan={colSpan}
                    class="border border-gray-300 bg-gray-50 px-4 py-2"
                  >
                    <ExpandedResults gameResults={getBabGames(games(), bab)} />
                  </td>
                </tr>
              </Show>
            </>
          )}
        </For>
      </tbody>
    </table>
  );
};

const ExpandedResults = (props: { gameResults: GameResult[] }) => {
  const { gameResults } = props;
  const orderedResults = gameResults.toSorted((gr1, gr2) => {
    return gr2.game.date.valueOf() - gr1.game.date.valueOf();
  });

  return (
    <table class="text-lg sm:text-xs border-collapse">
      <thead>
        <tr class="text-gray-500">
          <th class="text-left pr-4 pb-1 font-medium">Round</th>
          <th class="text-left pr-4 pb-1 font-medium">Match</th>
          <th class="text-left pr-4 pb-1 font-medium">Score</th>
          <th class="text-left pb-1 font-medium">Pts</th>
        </tr>
      </thead>

      <tbody>
        <For each={orderedResults}>
          {({ game, homeIsBab, awayIsBab, points }) => {
            const isDraw =
              game.homeScore === game.awayScore && game.round === "GROUP";
            const homeWon = determineWinner(game) === game.homeTeam;

            const babWon =
              (homeWon && homeIsBab) || (!homeWon && !isDraw && awayIsBab);
            const result = isDraw ? "Draw" : babWon ? "Win" : "Loss";
            const resultColor = isDraw
              ? "text-gray-500"
              : babWon
                ? "text-green-700 font-semibold"
                : "text-red-700";

            const homeNameShort = TEAMS[game.homeTeam].short;
            const homeNameLong = game.homeTeam;
            const awayNameShort = TEAMS[game.awayTeam].short;
            const awayNameLong = game.awayTeam;

            const TeamName = (props: { short: string; long: string }) => {
              const { short, long } = props;

              return (
                <>
                  <span class="inline sm:hidden">{short}</span>
                  <span class="hidden sm:inline">{long}</span>
                </>
              );
            };

            return (
              <tr class="border-t border-gray-200">
                <td class="pr-4 py-1 text-gray-500">
                  {ROUND_LABELS[game.round]}
                </td>
                <td class="pr-4 py-1">
                  <span class={homeIsBab ? "underline" : ""}>
                    {TEAMS[game.homeTeam].flag}{" "}
                    <TeamName short={homeNameShort} long={homeNameLong} />
                  </span>{" "}
                  vs{" "}
                  <span class={awayIsBab ? "underline" : ""}>
                    {TEAMS[game.awayTeam].flag}{" "}
                    <TeamName short={awayNameShort} long={awayNameLong} />
                  </span>
                </td>
                <td class="pr-4 py-1 font-mono">
                  {game.homeScore}-{game.awayScore}
                </td>
                <td class={`py-1 ${resultColor}`}>
                  {points > 0
                    ? `+${points}`
                    : result === "Loss"
                      ? "0"
                      : `+${points}`}{" "}
                </td>
              </tr>
            );
          }}
        </For>
      </tbody>
    </table>
  );
};

export default ScoresTable;
