import { createResource, type Component, Show, Switch, Match } from "solid-js";
import ScoresTable from "./ScoresTable";
import PicksDetails from "./PicksDetails";
import cachedGamesJson from "./games.json";
import { fetchGames, parseGames } from "./api";
import Icon from "./Icons";

const App: Component = () => {
  const cachedGames = parseGames(cachedGamesJson);

  const [gamesFromApi] = createResource(fetchGames);

  // We have to do this funkiness to ensure we're handling errors correctly
  // because `createResource` doesn't actually catch errors; the errors get
  // thrown when trying to access the value. If there is an error, the resource
  // state will represent that though, and we leverage that below, but we still
  // need to catch the error here before we fall back to the cached games.
  // See https://github.com/solidjs/solid/discussions/1888#discussioncomment-7060132
  // for more insight.
  const games = () => {
    try {
      const apiGames = gamesFromApi();
      if (apiGames === undefined) {
        return cachedGames;
      }

      return apiGames;
    } catch (e) {
      return cachedGames;
    }
  };

  return (
    <div class="p-4 sm:p-8">
      <h1 class="pb-4 text-4xl sm:text-2xl">World Cup 2026</h1>
      <div class="w-full">
        <PicksDetails games={games()} />
      </div>

      <div class="w-full overflow-scroll mb-4">
        <ScoresTable games={games()} />
      </div>

      <Switch>
        <Match when={gamesFromApi.error}>
          <FetchStatus
            state="error"
            text="There was an issue fetching fresh match data. Showing latest manually synced data."
          />
        </Match>
        <Match when={gamesFromApi()}>
          <FetchStatus state="success" text="Loaded most recent match data." />
        </Match>
        <Match when={gamesFromApi.state !== "ready"}>
          <FetchStatus state="fetching" text="Fetching latest match data." />
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
        : "text-green-900";

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
