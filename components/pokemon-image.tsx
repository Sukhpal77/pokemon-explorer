"use client";
import { useState } from "react";
import Image from "next/image";
export default function PokemonImage({
  src,
  name,
  eager = false,
  className = "size-28 object-contain sm:size-32",
}: {
  src: string | null;
  name: string;
  eager?: boolean;
  className?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  return src && src !== failedSrc ? (
    <Image
      className={className}
      src={src}
      alt={name}
      width={475}
      height={475}
      sizes={eager ? "(min-width: 640px) 240px, 208px" : "(min-width: 640px) 128px, 112px"}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailedSrc(src)}
    />
  ) : (
    <div
      className="grid size-28 place-items-center bg-border text-4xl text-muted"
      role="img"
      aria-label={name + " artwork unavailable"}
    >
      ?
    </div>
  );
}
