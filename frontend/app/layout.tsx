import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UniChat - Anonymous Video Chat for Students",
  description: "Connect with university students worldwide through anonymous video chat",
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
