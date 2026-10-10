import Image from "next/image";

export default function LoadingIndicator() {
  return (
    <div className="status" role="status">
      <Image
        src="/icon.svg"
        alt=""
        width={48}
        height={48}
        className="mx-auto mb-4 motion-safe:animate-spin"
      />
      <p className="status-title">Loading Pokémon…</p>
    </div>
  );
}
