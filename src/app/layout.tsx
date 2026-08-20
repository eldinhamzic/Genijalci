import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Genijalac",
  description: "Edukativni centar za produženi boravak djece"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bs">
      <body>{children}</body>
    </html>
  );
}
