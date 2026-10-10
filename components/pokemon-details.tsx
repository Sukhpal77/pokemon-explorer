import Link from "next/link";
import PokemonImage from "./pokemon-image";
import type { Pokemon } from "@/types/pokemon";

export default function PokemonDetails({
  pokemon,
  description,
}: {
  pokemon: Pokemon;
  description: string;
}) {
  const image =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  return (
    <main className="w-full px-4 py-6 sm:px-8">
      <Link href="/" className="mb-5 inline-block text-primary hover:underline">
        ← Back to Pokémon list
      </Link>
      <section className="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-6">
        <div className="mb-6 flex flex-col items-center gap-6 rounded-lg bg-primary-light p-5 sm:flex-row">
          <PokemonImage
            src={image}
            name={pokemon.name}
            className="w-52 object-contain sm:w-60"
            eager
          />
          <div>
            <p className="mb-2 text-sm font-medium text-primary">
              #{pokemon.id}
            </p>
            <h1 className="mb-3 text-3xl font-bold text-heading capitalize">
              {pokemon.name.replaceAll("-", " ")}
            </h1>
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map(({ type }) => (
                <span
                  key={type.name}
                  className="rounded bg-accent-soft px-3 py-1 text-sm font-medium text-accent capitalize"
                >
                  {type.name}
                </span>
              ))}
            </div>
            <p className="mt-4 leading-relaxed text-text">{description}</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-secondary-border bg-secondary-light p-5">
            <h2 className="mb-3 text-xl font-bold text-secondary">Abilities</h2>
            <ul className="space-y-2">
              {pokemon.abilities.map(({ ability, is_hidden }) => (
                <li
                  key={ability.name}
                  className="rounded bg-surface px-3 py-2 capitalize"
                >
                  {ability.name.replaceAll("-", " ")}
                  {is_hidden && (
                    <span className="ml-2 text-xs text-muted">(hidden)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-accent-border bg-accent-light p-5">
            <h2 className="mb-3 text-xl font-bold text-accent">Stats</h2>
            <ul className="space-y-2">
              {pokemon.stats.map(({ stat, base_stat }) => (
                <li
                  key={stat.name}
                  className="flex justify-between gap-4 border-b border-accent-border pb-2"
                >
                  <span className="capitalize">
                    {stat.name === "hp" ? "HP" : stat.name.replaceAll("-", " ")}
                  </span>
                  <span className="font-semibold text-accent">{base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="mt-6 mb-3 border-t border-border pt-6 text-xl font-bold text-heading">
          Moves
        </h2>
        <ul className="flex flex-wrap gap-2">
          {pokemon.moves.map(({ move }) => (
            <li
              key={move.name}
              className="rounded border border-secondary-border bg-secondary-light px-3 py-1 text-sm text-secondary capitalize"
            >
              {move.name.replaceAll("-", " ")}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
