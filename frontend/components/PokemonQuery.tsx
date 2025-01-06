"use client";

import React, { useState, useEffect, useRef } from "react";
import { fetchPokemonData, RetrievedData } from "@/utils/api";
import { HiMiniChatBubbleBottomCenterText } from "react-icons/hi2";
import "./PokemonQuery.css";
import Image from "next/image";

interface ChatMessage {
  query: string;
  response: string;
  retrievedData: RetrievedData[];
  showCards: boolean;
}

const PokemonQuery: React.FC = () => {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleQuery = async (customQuery?: string) => {
    const activeQuery = customQuery || query;
    try {
      setLoading(true);
      const data = await fetchPokemonData(activeQuery);

      // Add query and response to history
      setHistory((prev) => [
        ...prev,
        { query: activeQuery, response: data.response, retrievedData: data.retrieved_data, showCards: false},
      ]);

      setQuery(""); // Clear the input box
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  function capitalize(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  function properSentenceCapitalization(sentence: string) {
    return sentence
      .split(" ")
      .map((word) => word[0] + word.slice(1).toLowerCase())
      .join(" ");
  }

  const toggleShowCards = (index: number) => {
    setHistory((prev) =>
      prev.map((message, i) =>
        i === index ? { ...message, showCards: !message.showCards } : message
      )
    );
  };

  // Scroll to the bottom of the chat when history updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history.length, loading]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4"
      >
        {/* Starting text */}
        <div className="text-left mt-2 flex flex-row">
              <div 
                className="mr-5 flex-shrink-0" 
                style={{ width: '40px', height: '40px' }}
              >
                <Image 
                  src="/poke-professor-pfp.png"
                  width={100}
                  height={100}
                  alt=""
                />
              </div>
              <div>
                <h2 className="font-bold text-red-500">Pokémon Professor:</h2>
                <p>Greetings, I am the Pokémon Professor! Feel free to inquire about anything related to Pokémon—I am here to share my expertise and guide you on your journey!</p>
              </div>
            </div>
          
        {history.map((message, index) => (
          <div key={index} className="mb-6">
            <div className="text-left mt-2 flex flex-row">
              <div 
                className="mr-5 flex-shrink-0" 
                style={{ width: '40px', height: '40px' }}
              >
                <Image 
                  src="/poke-trainer-pfp.png"
                  width={100}
                  height={100}
                  alt=""
                />
              </div>
              <div>
                <h2 className="font-bold text-black">You:</h2>
                <p>{message.query}</p>
              </div>
            </div>
  
            <div className="text-left mt-2 flex flex-row">
              <div 
                className="mr-5 flex-shrink-0" 
                style={{ width: '40px', height: '40px' }}
              >
                <Image 
                  src="/poke-professor-pfp.png"
                  width={100}
                  height={100}
                  alt=""
                />
              </div>
              <div>
                <h2 className="font-bold text-red-500">Pokémon Professor:</h2>
                <p>{message.response}</p>
              </div>
            </div>
  
            {message.retrievedData.length > 0 && (
              <div className="mt-4">
                <button
                  className="font-bold py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-400 transition ease-in-out duration-300"
                  onClick={() => toggleShowCards(index)}
                >
                  {message.showCards ? "Hide Pokémon Data" : "Show Pokémon Data"}
                </button>
                {message.showCards && (
                  <div className="flex flex-wrap mt-2">
                    {message.retrievedData.map((pokemon) => (
                      <div
                        key={pokemon.id}
                        className={`flex-1 m-2 pokemon-card p-4 rounded-lg shadow-md pokemon-card-${pokemon.details.types[0]}`}
                      >
                        <div className="flex justify-center">
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                            alt={pokemon.details.name}
                          />
                        </div>
                        <h3 className="font-bold my-1">
                          {capitalize(pokemon.details.name)}
                        </h3>
                        <p>
                          <strong>Height:</strong> {`${pokemon.details.height / 10} m`} |{" "}
                          <strong>Weight:</strong> {`${pokemon.details.weight / 10} kg`}
                        </p>
                        <p>
                          <strong>Abilities:</strong>{" "}
                          {pokemon.details.abilities.map(capitalize).join(", ")}
                        </p>
                        <p>
                          <strong>Description:</strong>{" "}
                          {properSentenceCapitalization(
                            pokemon.details.flavor_text
                          )}
                        </p>
                        <button
                          className="my-2 bg-white/30 backdrop-blur-md text-white font-semibold py-1 px-2 rounded-lg border border-white/50 hover:bg-white/50 hover:text-black transition ease-in-out duration-300"
                          onClick={() => {
                            const newQuery = `Tell me everything you know about ${capitalize(
                              pokemon.details.name
                            )}!`;
                            setQuery(newQuery);
                            handleQuery(newQuery);
                          }}
                        >
                          Learn More!
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
  
        {loading && (
          <div className="flex justify-center items-center">
            <div className="loader animate-spin h-8 w-8 border-4 border-t-blue-500 border-gray-200 rounded-full"></div>
          </div>
        )}
      </div>
  
      {/* Input Section */}
      <div className="flex items-center p-4 border-t border-gray-300">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your questions here!"
          className="flex-grow py-4 px-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={1}
          style={{ overflow: "hidden" }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto"; // Reset height
            target.style.height = `${target.scrollHeight}px`; // Adjust height to content
          }}
        ></textarea>
        <button
          onClick={() => handleQuery()}
          className="ml-2 py-2 px-4 border-black border-2 rounded-2xl hover:bg-slate-200"
        >
          <HiMiniChatBubbleBottomCenterText />
        </button>
      </div>
    </div>
  );
  
};

export default PokemonQuery;
