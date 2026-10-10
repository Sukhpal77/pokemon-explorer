import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-surface px-4 py-4 sm:px-8">
      <Link
        href="/"
        className="text-base font-bold text-heading sm:text-lg"
        aria-label="Pokémon Explorer home"
      >
        Pokémon Explorer
      </Link>
    </header>
  );
}
