import { createResource, type Component, Show, Switch, Match } from "solid-js";
import ScoresTable from "./ScoresTable";
import PicksDetails from "./PicksDetails";
import cachedGamesJson from "./games.json";
import { fetchGames, parseGames } from "./api";
import Icon from "./Icons";

const App: Component = () => {
  const cachedGames = parseGames(cachedGamesJson);
  const [gamesFromApi] = createResource(fetchGames);

  const games = () => gamesFromApi() ?? cachedGames;

  return (
    <div class="p-4 sm:p-8">
      <h1 class="pb-4 text-4xl sm:text-2xl">World Cup 2026</h1>
      <div class="w-full">
        <PicksDetails />
      </div>

      <div class="w-full overflow-scroll mb-4">
        <ScoresTable games={games()} />
      </div>

      <Switch>
        <Match when={gamesFromApi.error}>
          <FetchStatus
            state="error"
            text="There was an issue fetching fresh match data"
          />
        </Match>
        <Match when={gamesFromApi()}>
          <FetchStatus state="success" text="Loaded most recent match data" />
        </Match>
        <Match when={gamesFromApi.state !== "ready"}>
          <FetchStatus state="fetching" text="Fetching latest match data" />
        </Match>
      </Switch>
    </div>
  );
};

const FetchStatus = (props: {
  state: "error" | "fetching" | "success";
  text: string;
}) => {
  const { state, text } = props;

  const icon =
    state === "error" ? "warning" : state === "fetching" ? "soccer" : "check";
  const fontColor =
    state === "error"
      ? "text-red-900"
      : state === "fetching"
        ? "text-gray-600"
        : "text-greem-800";

  return (
    <div class={`${fontColor} flex items-center`}>
      <Icon
        variant={icon}
        class={`size-5 mr-1 ${state === "fetching" ? "animate-spin [animation-duration:2s]" : ""}`}
      />
      {text}
    </div>
  );
};

export default App;
