import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Dnyx Notes",
  description: "Simple Notes App"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b p-4 bg-white">
          <Link href="/notes" className="font-semibold">Dnyx Notes</Link>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
