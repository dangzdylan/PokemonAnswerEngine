"use client";

import React, { useState } from "react";
import { fetchPokemonData, RetrievedData } from "@/utils/api";

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
      <h1>Pokémon Query</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query"
      />
      <button onClick={handleQuery}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <div>
          <h2>GPT Response</h2>
          <p>{response}</p>
        </div>
      )}

      {retrievedData.length > 0 && (
        <div>
          <h2>Retrieved Pokémon</h2>
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
    </div>
  );
};

export default PokemonQuery;
