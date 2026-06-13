import {
  createResource,
  Match,
  Suspense,
  Switch,
  type Component,
} from "solid-js";
import ScoresTable from "./ScoresTable";
import cachedGamesJson from "./games.json";
import { fetchGames } from "./api";

const App: Component = () => {
  const [gamesFromApi] = createResource(fetchGames);
  console.log("cachedGamesJson", cachedGamesJson);
  console.log("gamesFromApi", gamesFromApi);

  return (
    <div class="p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Match when={gamesFromApi.error}>
            <span>Error: {gamesFromApi.error.message}</span>
          </Match>
          <Match when={gamesFromApi()}>
            <div>Loaded {gamesFromApi().length} games</div>
          </Match>
        </Switch>
      </Suspense>

      <ScoresTable />
    </div>
  );
};

export default App;
