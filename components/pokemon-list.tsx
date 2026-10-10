"use client";

import { useEffect, useMemo, useState } from "react";
import { getPokemon } from "@/services/pokemon";
import type { Pokemon, PokemonSummary } from "@/types/pokemon";
import PokemonCard from "./pokemon-card";
import LoadingIndicator from "./loading-indicator";

const PAGE_SIZE = 24;

interface Props {
  pokemonList: PokemonSummary[];
  initialPokemon: Pokemon[];
}

export default function PokemonList({ pokemonList, initialPokemon }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<{
    page: PokemonSummary[];
    retry: number;
    pokemon: Pokemon[];
    error: string;
  } | null>(null);
  const [retry, setRetry] = useState(0);

  const filteredPokemon = useMemo(
    () =>
      pokemonList.filter((item) =>
        item.name.includes(search.trim().toLowerCase()),
      ),
    [pokemonList, search],
  );

  const currentPage = useMemo(
    () => filteredPokemon.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredPokemon, page],
  );

  const useInitialPokemon = !search && page === 1;
  const isCurrentResult = result?.page === currentPage && result.retry === retry;
  const loading = !useInitialPokemon && !isCurrentResult;
  const pokemon = useInitialPokemon
    ? initialPokemon
    : isCurrentResult ? result.pokemon : [];
  const error = !useInitialPokemon && isCurrentResult ? result.error : "";

  useEffect(() => {
    if (useInitialPokemon) return;

    const controller = new AbortController();

    Promise.all(
      currentPage.map((item) => getPokemon(item.name, controller.signal)),
    )
      .then((results) => {
        if (!controller.signal.aborted) {
          setResult({
            page: currentPage,
            retry,
            pokemon: results.filter((item) => item !== null),
            error: "",
          });
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setResult({
            page: currentPage,
            retry,
            pokemon: [],
            error: "Unable to load Pokémon. Please try again.",
          });
        }
      });

    return () => controller.abort();
  }, [currentPage, useInitialPokemon, retry]);

  const totalPages = Math.ceil(filteredPokemon.length / PAGE_SIZE);

  return (
    <section>
      <input
        type="search"
        aria-label="Search Pokémon by name"
        placeholder="Search Pokémon by name..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(1);
        }}
        className="mb-4 h-11 w-full rounded-lg border border-primary-border bg-primary-light px-3 focus:outline-2 focus:outline-primary"
      />
      <p className="mb-4 text-sm text-primary">
        {filteredPokemon.length} Pokémon
      </p>

      {error ? (
        <div className="status">
          <p className="status-text">{error}</p>
          <button onClick={() => setRetry(retry + 1)} className="status-button">
            Try again
          </button>
        </div>
      ) : loading ? (
        <LoadingIndicator />
      ) : filteredPokemon.length === 0 ? (
        <p className="status">No Pokémon found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {pokemon.map((item) => (
            <PokemonCard key={item.id} pokemon={item} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4 text-sm">
          <button
            disabled={page === 1 || loading}
            onClick={() => setPage(page - 1)}
            className="cursor-pointer rounded border border-secondary-border bg-secondary-light text-secondary hover:bg-secondary-hover px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages || loading}
            onClick={() => setPage(page + 1)}
            className="cursor-pointer rounded border border-secondary-border bg-secondary-light text-secondary hover:bg-secondary-hover px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
