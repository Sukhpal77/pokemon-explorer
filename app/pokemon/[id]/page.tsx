import { Suspense } from "react";
import { notFound } from "next/navigation";
import PokemonDetails from "@/components/pokemon-details";
import LoadingIndicator from "@/components/loading-indicator";
import { getPokemon, getPokemonDescription } from "@/services/pokemon";

export default function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="status-page">
          <LoadingIndicator />
        </main>
      }
    >
      <Details params={params} />
    </Suspense>
  );
}

async function Details({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemon = await getPokemon(id);

  if (!pokemon) {
    notFound();
  }

  const description = await getPokemonDescription(pokemon.species.name);

  return <PokemonDetails pokemon={pokemon} description={description} />;
}
