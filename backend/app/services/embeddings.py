import openai
import numpy as np
import faiss
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def create_embedding(text: str):
    """
    Generate an embedding for a given text using OpenAI's embedding model.

    Args:
        text (str): Text to generate embedding for.

    Returns:
        list: Embedding vector.
    """
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-ada-002"
    )
    return response['data'][0]['embedding']


def store_embeddings(data, index_path="pokemon_index.faiss"):
    """
    Generate and store embeddings for Pokémon data.

    Args:
        data (list): List of Pokémon dictionaries.
        index_path (str): Path to save the FAISS index.

    Returns:
        None
    """
    dimension = 1536  # Embedding size for OpenAI's text-embedding-ada-002
    index = faiss.IndexFlatL2(dimension)  # FAISS index for L2 (Euclidean) similarity
    metadata = []

    for i, pokemon in enumerate(data):
        # Prepare a comprehensive text description for the Pokémon
        text = (
            f"Pokémon Name: {pokemon['name']}. "
            f"ID: {pokemon['id']}. "
            f"Type(s): {', '.join(pokemon['types'])}. "
            f"Height: {pokemon['height']} decimeters. "
            f"Weight: {pokemon['weight']} hectograms. "
            f"Base Experience: {pokemon['base_experience']}. "
            f"Stats: {', '.join(f'{key}: {value}' for key, value in pokemon['stats'].items())}. "
            f"Abilities: {', '.join(pokemon['abilities'])}. "
            f"Moves: {', '.join(pokemon['moves'])}. "
            f"Flavor Text: {pokemon['flavor_text']}. "
            f"Habitat: {pokemon['habitat'] if pokemon['habitat'] else 'Unknown'}. "
            f"Primary Color: {pokemon['color']}. "
            f"Shape: {pokemon['shape'] if pokemon['shape'] else 'Unknown'}. "
            f"Generation: {pokemon['generation']}."
        )

        # Generate embedding for the text
        embedding = np.array(create_embedding(text), dtype=np.float32)

        # Add embedding to the FAISS index
        index.add(embedding.reshape(1, -1))

        # Store metadata for retrieval purposes
        metadata.append({
            "id": pokemon["id"],
            "name": pokemon["name"],
            "details": pokemon
        })

    # Save the FAISS index
    faiss.write_index(index, index_path)

    # Save metadata alongside the index
    with open("metadata.npy", "wb") as f:
        np.save(f, metadata)

    print(f"Embeddings and metadata stored successfully at {index_path}!")
