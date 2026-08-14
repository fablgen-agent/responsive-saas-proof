import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fablgen-agent.github.io"),
  title: "Orbit Ops — Responsive SaaS UI Proof",
  description:
    "An original responsive Next.js and Tailwind dashboard demonstrating mobile, tablet, and desktop interface behavior.",
  alternates: { canonical: "/responsive-saas-proof/" },
  openGraph: {
    title: "Orbit Ops — Responsive SaaS UI Proof",
    description: "An original responsive Next.js and Tailwind dashboard with verified mobile, tablet, and desktop behavior.",
    type: "website",
    url: "/responsive-saas-proof/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
