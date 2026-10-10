import type { Metadata } from "next";
import Header from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Pokémon Explorer", template: "%s | Pokémon Explorer" },
  description:
    "Search Pokémon and explore their types, abilities, stats, and moves.",
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="m-0 bg-background font-sans text-sm text-text">
        <Header />
        {children}
      </body>
    </html>
  );
}
