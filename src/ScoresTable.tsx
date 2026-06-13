import type { Component } from "solid-js";
import { For } from "solid-js";
import { BABS, type Bab, type Score } from "./tournament";

const ROUND_COLUMNS: { label: string; key: keyof Score }[] = [
  { label: "Total", key: "total" },
  { label: "Group", key: "GROUP" },
  { label: "R32", key: "R32" },
  { label: "R16", key: "R16" },
  { label: "QF", key: "QF" },
  { label: "SF", key: "SF" },
  { label: "3RD", key: "3RD" },
  { label: "Final", key: "FINAL" },
];

const ScoresTable: Component<{ scores: Record<Bab, Score> }> = (props) => {
  return (
    <table class="border-collapse text-sm">
      <thead>
        <tr>
          <th class="border border-gray-300 px-4 py-2 font-semibold text-left">
            BAB
          </th>
          <For each={ROUND_COLUMNS}>
            {(col) => (
              <th class="border border-gray-300 px-4 py-2 font-semibold text-left">
                {col.label}
              </th>
            )}
          </For>
        </tr>
      </thead>
      <tbody>
        <For each={BABS}>
          {(bab) => (
            <tr>
              <td class="border border-gray-300 px-4 py-2">{bab}</td>
              <For each={ROUND_COLUMNS}>
                {(col) => (
                  <td class="border border-gray-300 px-4 py-2">
                    {props.scores[bab][col.key]}
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};

export default ScoresTable;
