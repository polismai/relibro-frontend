import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "ReLibro",
  description: "Compra y venta de libros usados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={quicksand.className}>
        {children}
      </body>
    </html>
  );
}
