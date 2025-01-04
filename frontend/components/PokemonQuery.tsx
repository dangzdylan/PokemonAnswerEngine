"use client";

import React, { useState } from "react";
import { fetchPokemonData, RetrievedData } from "@/utils/api";
import { HiMiniChatBubbleBottomCenterText } from "react-icons/hi2";

const PokemonQuery: React.FC = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string>("");
  const [retrievedData, setRetrievedData] = useState<RetrievedData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleQuery = async () => {
    try {
      const data = await fetchPokemonData(query);
      setResponse(data.response);
      setRetrievedData(data.retrieved_data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <div>
          <h2 className="font-bold">Pokémon Professor :</h2>
          <p>{response}</p>
        </div>
      )}

      {retrievedData.length > 0 && (
        <div>
          <h2 className="font-bold mt-5">Pokémon that may be relevant to your query :</h2>
          {retrievedData.map((pokemon) => (
            <div key={pokemon.id}>
              <h3>{pokemon.details.name}</h3>
              <p>
                <strong>Height:</strong> {pokemon.details.height} |{" "}
                <strong>Weight:</strong> {pokemon.details.weight}
              </p>
              <p>
                <strong>Abilities:</strong> {pokemon.details.abilities.join(", ")}
              </p>
              <p>
                <strong>Flavor Text:</strong> {pokemon.details.flavor_text}
              </p>
            </div>
          ))}
        </div>
      )}

    <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your question"
        className="py-4 px-4 w-3/4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={1}
        style={{ overflow: "hidden" }}
        onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto"; // Reset height
            target.style.height = `${target.scrollHeight}px`; // Adjust height to content
        }}
        ></textarea>

      <button onClick={handleQuery} className="ml-2 py-2 px-4 border-black border-2 rounded-2xl hover:bg-slate-200">
         <HiMiniChatBubbleBottomCenterText/>
      </button>
    </div>
  );
};

export default PokemonQuery;
