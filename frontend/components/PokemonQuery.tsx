"use client";

import React, { useState } from "react";
import { fetchPokemonData, RetrievedData } from "@/utils/api";
import { HiMiniChatBubbleBottomCenterText } from "react-icons/hi2";
import "./PokemonQuery.css";

const PokemonQuery: React.FC = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");
  const [retrievedData, setRetrievedData] = useState<RetrievedData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showPokemonCards, setShowPokemonCards] = useState(false);

  const handleQuery = async (customQuery?: string) => {
    const activeQuery = customQuery || query;
    try {
      setSubmittedQuery(activeQuery);
      const data = await fetchPokemonData(activeQuery);
      setResponse(data.response);
      setRetrievedData(data.retrieved_data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error(err);
    }
  };

  function capitalize(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  function properSentenceCapitalization(sentence: string) {
    let newSentence = "";
    for (const word of sentence.split(" ")) {
      newSentence += word[0] + word.slice(1).toLowerCase() + " ";
    }
    return newSentence;
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {submittedQuery && (
        <div className="my-5">
          <h2 className="font-bold">User:</h2> 
          {`${submittedQuery}`}
        </div>
      )}

      {response && (
        <div>
          <h2 className="font-bold">Pokémon Professor :</h2>
          <p className="text-left">{response}</p>
        </div>
      )}

      {retrievedData.length > 0 && (
        <div>
          <button
            onClick={() => setShowPokemonCards(!showPokemonCards)}
            className="my-5 font-bold mt-5 py-2 px-4 bg-stone-900 text-white rounded-lg hover:bg-stone-700 transition ease-in-out duration-300"
          >
            {showPokemonCards
              ? "Hide Pokémon that may be relevant to your query"
              : "Show Pokémon that may be relevant to your query"}
          </button>
          {showPokemonCards &&
            <div className="flex flex-row">
              {retrievedData.map((pokemon) => (
                <div key={pokemon.id} className={`flex-1 m-2 pokemon-card p-4 rounded-lg shadow-md pokemon-card-${pokemon.details.types[0]}`}>
                  <div className="flex justify-center">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}/>
                  </div>
                  <h3 className="font-bold my-1">{capitalize(pokemon.details.name)}</h3>
                  <p>
                    <strong>Height:</strong> {pokemon.details.height} |{" "}
                    <strong>Weight:</strong> {pokemon.details.weight}
                  </p>
                  <p>
                    <strong>Abilities:</strong> {pokemon.details.abilities.map(capitalize).join(", ")}
                  </p>
                  <p>
                    <strong>Flavor Text:</strong> {properSentenceCapitalization(pokemon.details.flavor_text)}
                  </p>
                  <button 
                  className="my-2 bg-white/30 backdrop-blur-md text-white font-semibold py-1 px-2 rounded-lg border border-white/50 hover:bg-white/50 hover:text-black transition ease-in-out duration-300"
                  onClick={() => {
                    const newQuery = `Tell me everything you know about ${capitalize(pokemon.details.name)}!`;
                    setQuery(newQuery);
                    handleQuery(newQuery);
                  }}

                  >
                    Learn More!
                  </button>
                </div>
              ))}
            </div>
            }
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

      <button onClick={() => {handleQuery();}} className="ml-2 py-2 px-4 border-black border-2 rounded-2xl hover:bg-slate-200">
         <HiMiniChatBubbleBottomCenterText/>
      </button>
    </div>
  );
};

export default PokemonQuery;
