import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Welcome</h1>
      <Link href="/notes" className="underline">Go to Notes</Link>
    </div>
  );
}
