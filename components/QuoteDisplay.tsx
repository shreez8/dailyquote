'use client';

import { useState, useEffect } from 'react';
import { Quote } from '../types/quote';
import { fetchRandomQuote } from '../lib/api';

interface QuoteDisplayProps {
  initialQuote: Quote;
}

export default function QuoteDisplay({ initialQuote }: QuoteDisplayProps) {
  const [quote, setQuote] = useState<Quote>(initialQuote);
  const [favorites, setFavorites] = useState<Quote[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const fetchNewQuote = async () => {
    try {
      const newQuote = await fetchRandomQuote();
      setQuote(newQuote);
    } catch {
      setQuote({ content: 'Unable to fetch quote.', author: 'Unknown' });
    }
  };

  const addToFavorites = () => {
    if (!favorites.some((fav) => fav.content === quote.content)) {
      const updatedFavorites = [...favorites, quote];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (content: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.content !== content);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const shareOnX = () => {
    const url = `https://x.com/intent/post?text=${encodeURIComponent(
      `"${quote.content}" - ${quote.author}`
    )}`;
    window.open(url, '_blank');
  };

  const shareViaEmail = () => {
    const mailto = `mailto:?subject=Inspirational Quote&body=${encodeURIComponent(
      `"${quote.content}" - ${quote.author}`
    )}`;
    window.location.href = mailto;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
      <p className="text-lg italic mb-4 text-black">&quot;{quote.content}&quot;</p>
      <p className="text-right font-bold mb-4">- {quote.author}</p>
      <div className="flex justify-between mb-4">
        <button onClick={fetchNewQuote}>New Quote</button>
        <button onClick={addToFavorites}>Save to Favorites</button>
      </div>
      <div className="flex justify-between mb-4">
        <button onClick={shareOnX}>Share on X</button>
        <button onClick={shareViaEmail}>Share via Email</button>
      </div>
      <h2 className="text-xl font-bold mb-2">Favorites</h2>
      <ul className="list-disc pl-5">
        {favorites.map((fav) => (
          <li key={fav.content} className="mb-2">
            <p className="italic text-black">&quot;{fav.content}&quot;</p>
            <p className="text-right font-bold">- {fav.author}</p>
            <button
              onClick={() => removeFromFavorites(fav.content)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}