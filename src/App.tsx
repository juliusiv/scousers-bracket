import { createResource, Match, Switch, type Component } from "solid-js";
import ScoresTable from "./ScoresTable";
import PicksDetails from "./PicksDetails";
import cachedGamesJson from "./games.json";
import { fetchGames, parseGames } from "./api";
import { calculateScores } from "./tournament";

const App: Component = () => {
  const [gamesFromApi] = createResource(fetchGames, {
    initialValue: parseGames(cachedGamesJson),
  });

  return (
    <div class="p-8">
      <h1 class="pb-4 text-2xl">World Cup 2026</h1>
      <PicksDetails />

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
