import type { Component } from "solid-js";
import { For } from "solid-js";
import { BABS, DRAFT_PICKS, Game, isTeamEliminated, TEAMS } from "./tournament";

const picksByBab = BABS.map((bab) =>
  Object.entries(DRAFT_PICKS)
    .filter(([, owner]) => owner === bab)
    .map(([team]) => team),
);

const PicksDetails: Component<{ games: Game[] }> = (props) => {
  const games = () => props.games;

  return (
    <details class="mb-4">
      <summary class="cursor-pointer text-xl sm:text-sm font-semibold">
        Picks
      </summary>
      <div class="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-6 mt-2 text-xl sm:text-sm">
        <For each={BABS}>
          {(bab, i) => {
            return (
              <div class="min-w-0">
                <div class="font-semibold mb-1 truncate">{bab}</div>
                <For each={picksByBab[i()]}>
                  {(team) => {
                    const flag = TEAMS[team].flag;
                    const isEliminated = () => isTeamEliminated(games(), team);
                    console.log(team, isEliminated());

                    return (
                      <div
                        class={`truncate ${isEliminated() ? "line-through" : ""}`}
                      >
                        {flag} {/* <span class="line-through"> */}
                        {team}
                      </div>
                    );
                  }}
                </For>
              </div>
            );
          }}
        </For>
      </div>
    </details>
  );
};

export default PicksDetails;
