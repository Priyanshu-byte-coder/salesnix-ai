import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salesnix — AI Voice & Text Sales on WhatsApp",
  description: "Salesnix puts an AI sales agent inside WhatsApp — taking voice & text orders, following up on leads, and converting customers around the clock.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
