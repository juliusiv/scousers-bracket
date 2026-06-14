import { createResource, type Component, Show } from "solid-js";
import ScoresTable from "./ScoresTable";
import PicksDetails from "./PicksDetails";
import cachedGamesJson from "./games.json";
import { fetchGames, parseGames } from "./api";
import { calculateScores } from "./tournament";

const App: Component = () => {
  const cachedGames = parseGames(cachedGamesJson);
  const [gamesFromApi] = createResource(fetchGames);

  const games = gamesFromApi() ?? cachedGames;

  return (
    <div class="p-8">
      <h1 class="pb-4 text-4xl sm:text-2xl">World Cup 2026</h1>
      <PicksDetails />

      <Show when={gamesFromApi.error}>
        <div class="bg-red-100 w-fit px-2 py-1 mb-4 text-base sm:text-sm text-red-900">
          Error loading fresh games data: {gamesFromApi.error.message}
        </div>
      </Show>

      <ScoresTable games={games} />
    </div>
  );
};

export default App;
