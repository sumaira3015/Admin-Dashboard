"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";

interface Suggestion {
  title: string;
  image: { asset: { url: string } };
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      const params: Record<string, string> = { query: `${query}*` };

      client
        .fetch(
          `*[_type == "products" && title match $query]{
            title,
            image {
              asset-> {
                url
              }
            }
          }`,
          params
        )
        .then((results) => {
          setSuggestions(results);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/filter?query=${searchQuery.trim()}`);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSearchQuery(suggestion.title);
    setSuggestions([]);
    router.push(`/filter?query=${suggestion.title}`);
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="relative flex-1 mx-4 flex sm:max-w-[400px] w-full"
    >
      <input
        type="text"
        placeholder="Search for products, categories..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#029FAE] pr-12 text-lg"
      />
      
      <Link href={`/filter`}>
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#029FAE] font-semibold py-3 px-6 rounded-full hover:bg-[#029FAE] hover:text-white transition-all duration-300"
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </Link>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-10">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-3 text-sm text-[#272343] hover:bg-[#029FAE] hover:text-white cursor-pointer flex items-center space-x-3"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Image
                  src={suggestion.image?.asset?.url || "/images/placeholder.png"}
                  alt={suggestion.title}
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
                <span>{suggestion.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
