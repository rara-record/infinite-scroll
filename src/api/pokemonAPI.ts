export const getPokemon = async ({
  pageParam = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12",
}) => {
  const request = await fetch(pageParam);
  const { results, next } = await request.json();
  return { response: results, nextPage: next };
};

export const getPokemonById = async (name: string) => {
  {
  }
  const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const results = await request.json();
  return results;
};
