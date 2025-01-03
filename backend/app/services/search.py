import faiss
import numpy as np
import openai
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

def search_embedding(query: str, index_path="pokemon_index.faiss", metadata_path="metadata.npy", k=5):
    """
    Search the FAISS index for the most relevant Pokémon based on a query.

    Args:
        query (str): The user query to search for.
        index_path (str): Path to the FAISS index file.
        metadata_path (str): Path to the metadata file.
        k (int): Number of top results to retrieve.

    Returns:
        list: List of metadata for the top-k Pokémon.
    """
    # Load the FAISS index
    index = faiss.read_index(index_path)

    # Load the metadata
    metadata = np.load(metadata_path, allow_pickle=True).tolist()

    # Generate an embedding for the query
    query_embedding = np.array(create_embedding(query), dtype=np.float32).reshape(1, -1)

    # Search the index
    distances, indices = index.search(query_embedding, k)

    # Retrieve the metadata for the top-k results
    results = [metadata[idx] for idx in indices[0]]

    return results
