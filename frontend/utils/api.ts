type PokemonDetails = {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    stats: Record<string, number>;
    abilities: string[];
    types: string[];
    moves: string[];
    flavor_text: string;
    habitat: string;
    color: string;
    shape: string;
    generation: string;
  };
  
  export type RetrievedData = {
    id: number;
    name: string;
    details: PokemonDetails;
  };
  
  type PokemonResponse = {
    query: string;
    response: string; // GPT response
    retrieved_data: RetrievedData[];
  };
  
  export const fetchPokemonData = async (query: string): Promise<PokemonResponse> => {
    const API_URL = "https://pokemonanswerengine-production.up.railway.app/query/"; // Replace with your backend URL
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_query: query }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const data: PokemonResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      throw error;
    }
  };
  