import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { AuthProvider } from "../../context/AuthContext";

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
    <html lang="es" className={quicksand.className}>
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <header className="w-full">
            <Navbar />
          </header>
          <main className="flex-grow">
            {children}
          </main>
          {/* <Footer /> */}
        </AuthProvider>
      </body>
    </html>
  );
}


