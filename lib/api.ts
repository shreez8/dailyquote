import { Quote } from "../types/quote";

export async function fetchRandomQuote(): Promise<Quote> {
  const response = await fetch("https://api.quotable.io/random");

  if (!response.ok) {
    throw new Error("Failed to fetch quote");
  }

  const data = await response.json();
  return {
    content: data.content,
    author: data.author,
  };
}