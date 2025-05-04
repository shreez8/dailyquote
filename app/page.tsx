import { fetchRandomQuote } from "../lib/api";
import QuoteDisplay from "../components/QuoteDisplay";

export default async function Home() {
  let initialQuote;
  try {
    initialQuote = await fetchRandomQuote();
  } catch {
    initialQuote = { content: "Unable to fetch quote.", author: "Unknown" };
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Daily Quote</h1>
      <QuoteDisplay initialQuote={initialQuote} />
    </main>
  );
}
