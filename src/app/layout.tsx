import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Genijalci Boravak",
  description: "Frontend MVP za produženi boravak djece"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bs">
      <body>{children}</body>
    </html>
  );
}
