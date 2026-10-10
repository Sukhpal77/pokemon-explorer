import PokemonList from "@/components/pokemon-list";
import { getPokemonList, getPokemon } from "@/services/pokemon";

export default async function HomePage() {
  const pokemonList = await getPokemonList();
  const results = await Promise.all(
    pokemonList.slice(0, 24).map((pokemon) => getPokemon(pokemon.name)),
  );
  const initialPokemon = results.filter((pokemon) => pokemon !== null);

  return (
    <main className="px-4 py-6 sm:px-8">
      <h1 className="mb-2 text-2xl font-bold text-heading">Pokémon Explorer</h1>
      <p className="mb-6 text-muted">
        Search Pokémon and click a card to view its details.
      </p>
      <PokemonList pokemonList={pokemonList} initialPokemon={initialPokemon} />
    </main>
  );
}
