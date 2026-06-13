import { createResource, Match, Switch, type Component } from "solid-js";
import ScoresTable from "./ScoresTable";
import cachedGamesJson from "./games.json";
import { fetchGames, parseGames } from "./api";
import { calculateScores } from "./tournament";

const App: Component = () => {
  const [gamesFromApi] = createResource(fetchGames, {
    initialValue: parseGames(cachedGamesJson),
  });

  return (
    <div class="p-8">
      <Switch>
        <Match when={gamesFromApi.error}>
          <span>Error loading games data: {gamesFromApi.error.message}</span>
        </Match>
        <Match when={gamesFromApi()}>
          <ScoresTable scores={calculateScores(gamesFromApi())} />
        </Match>
      </Switch>
    </div>
  );
};

export default App;
