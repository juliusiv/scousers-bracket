import type { Component } from "solid-js";
import { For } from "solid-js";
import { BABS } from "./tournament";

const COLUMNS = [
  "BAB",
  "Total",
  "Group",
  "R32",
  "R16",
  "QF",
  "SF",
  "3RD",
  "Final",
];

const ScoresTable: Component = () => {
  return (
    <table class="border-collapse text-sm">
      <thead>
        <tr>
          <For each={COLUMNS}>
            {(col) => (
              <th class="border border-gray-300 px-4 py-2 font-semibold text-left">
                {col}
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
              <For each={COLUMNS.slice(1)}>
                {() => <td class="border border-gray-300 px-4 py-2"></td>}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};

export default ScoresTable;
