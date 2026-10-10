import Link from "next/link";
import PokemonImage from "./pokemon-image";
import type { Pokemon } from "@/types/pokemon";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const image =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  return (
    <Link
      href={"/pokemon/" + pokemon.id}
      prefetch={false}
      className="rounded-lg border border-secondary-border bg-secondary-light p-4 text-center shadow-sm hover:border-primary"
    >
      <p className="text-left text-xs font-medium text-primary">
        #{pokemon.id}
      </p>
      <div className="my-3 flex h-36 items-center justify-center rounded-lg bg-primary-light">
        <PokemonImage src={image} name={pokemon.name} />
      </div>
      <h2 className="mb-3 font-bold text-heading capitalize">
        {pokemon.name.replaceAll("-", " ")}
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className="rounded bg-accent-soft px-2 py-1 text-xs text-accent capitalize"
          >
            {type.name}
          </span>
        ))}
      </div>
    </Link>
  );
}
