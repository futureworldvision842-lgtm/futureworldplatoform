import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "G.A.I.G.S. - Global AI-Powered Governance System",
  description:
    "A revolutionary decentralized governance platform combining blockchain technology, artificial intelligence, and democratic principles to create transparent, participatory, and just governance for the 21st century.",
  keywords: [
    "governance",
    "AI",
    "blockchain",
    "democracy",
    "transparency",
    "decentralized",
    "voting",
    "community",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
