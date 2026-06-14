import type { Component } from "solid-js";
import { For } from "solid-js";
import { BABS, DRAFT_PICKS, TEAMS } from "./tournament";

const picksByBab = BABS.map((bab) =>
  Object.entries(DRAFT_PICKS)
    .filter(([, owner]) => owner === bab)
    .map(([team]) => team),
);

const PicksDetails: Component = () => {
  return (
    <details class="mb-4">
      <summary class="cursor-pointer text-xl sm:text-sm font-semibold">
        Picks
      </summary>
      <div class="flex flex-wrap gap-6 mt-2 text-xl sm:text-sm">
        <For each={BABS}>
          {(bab, i) => {
            return (
              <div>
                <div class="font-semibold mb-1">{bab}</div>
                <For each={picksByBab[i()]}>
                  {(team) => {
                    const flag = TEAMS[team].flag;

                    return (
                      <div>
                        {flag} {team}
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
