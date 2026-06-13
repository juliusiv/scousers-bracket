import {
  createResource,
  Match,
  Suspense,
  Switch,
  type Component,
} from "solid-js";
import ScoresTable from "./ScoresTable";
import cachedGamesJson from "./games.json";
import { fetchGames, parseGames } from "./api";
import { calculateScores } from "./tournament";

const App: Component = () => {
  const cachedGames = parseGames(cachedGamesJson);
  const [gamesFromApi] = createResource(fetchGames);
  console.log("cachedGamesJson", cachedGamesJson);
  console.log("gamesFromApi", gamesFromApi);

  console.log(calculateScores(cachedGames));

  return (
    <div class="p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Match when={gamesFromApi.error}>
            <span>Error: {gamesFromApi.error.message}</span>
          </Match>
          <Match when={gamesFromApi()}>
            <div>Loaded {gamesFromApi()?.length} games</div>
          </Match>
        </Switch>
      </Suspense>

      <ScoresTable />
    </div>
  );
};

export default App;
