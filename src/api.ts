export const fetchGames = async () => {
  const response = await fetch(`https://worldcup26.ir/get/games`);
  const responseJson = await response.json();

  const games = responseJson.games;
  return games;
};
