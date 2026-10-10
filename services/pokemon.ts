import type { Pokemon, PokemonSpecies, PokemonSummary } from "@/types/pokemon";

const API_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(): Promise<PokemonSummary[]> {
  const response = await fetch(API_URL + "/pokemon?limit=100000", {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error("Unable to load Pokémon.");
  }

  const data: { results: PokemonSummary[] } = await response.json();
  return data.results;
}

export async function getPokemon(
  name: string,
  signal?: AbortSignal,
): Promise<Pokemon | null> {
  const response = await fetch(
    API_URL + "/pokemon/" + encodeURIComponent(name),
    {
      next: { revalidate: 86400 },
      signal,
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to load Pokémon.");
  }

  return response.json();
}

export async function getPokemonDescription(speciesName: string): Promise<string> {
  const response = await fetch(
    API_URL + "/pokemon-species/" + encodeURIComponent(speciesName),
    { next: { revalidate: 86400 } },
  );

  if (!response.ok) {
    throw new Error("Unable to load the description.");
  }

  const species: PokemonSpecies = await response.json();
  const entry = species.flavor_text_entries.find(
    (item) => item.language.name === "en",
  );

  return entry?.flavor_text.replace(/\s+/g, " ").trim() ?? "No description available.";
}
