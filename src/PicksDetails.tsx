import type { Component } from "solid-js";
import { For } from "solid-js";
import { BABS, DRAFT_PICKS, TEAM_FLAGS } from "./tournament";

const picksByBab = BABS.map((bab) =>
  Object.entries(DRAFT_PICKS)
    .filter(([, owner]) => owner === bab)
    .map(([team]) => team),
);

const PicksDetails: Component = () => {
  return (
    <details class="mb-4">
      <summary class="cursor-pointer text-sm font-semibold">Picks</summary>
      <div class="flex gap-6 mt-2 text-sm">
        <For each={BABS}>
          {(bab, i) => (
            <div>
              <div class="font-semibold mb-1">{bab}</div>
              <For each={picksByBab[i()]}>
                {(team) => (
                  <div>
                    {TEAM_FLAGS[team]} {team}
                  </div>
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </details>
  );
};

export default PicksDetails;
