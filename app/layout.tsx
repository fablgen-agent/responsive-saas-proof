import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fablgen-agent.github.io"),
  title: "AutoLane Inventory — Automotive Workflow Proof",
  description:
    "An original responsive automotive inventory, search, enquiry, dealership, and admin workflow built in Next.js and Tailwind CSS.",
  alternates: { canonical: "/responsive-saas-proof/" },
  icons: { icon: "/responsive-saas-proof/favicon.svg" },
  openGraph: {
    title: "AutoLane Inventory — Automotive Workflow Proof",
    description: "An original automotive inventory and admin workflow with verified mobile, tablet, and desktop behavior.",
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
