import Link from "next/link";
export default function NotFound() {
  return (
    <main className="status-page">
      <div className="status">
        <h1 className="status-title">Pokémon not found</h1>
        <p className="status-text">We couldn’t find that Pokédex entry.</p>
        <Link className="status-button" href="/">
          Back to the Pokédex
        </Link>
      </div>
    </main>
  );
}
