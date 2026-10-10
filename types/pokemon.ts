export interface PokemonSummary {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  species: { name: string; url: string };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": { front_default: string | null };
    };
  };
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
}
