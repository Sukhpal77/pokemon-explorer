"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="status-page">
      <div className="status">
        <h1 className="status-title">Unable to load Pokémon</h1>
        <p className="status-text">
          We couldn’t reach PokéAPI. Check your connection and try again.
        </p>
        <button className="status-button" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
