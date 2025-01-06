import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_response(context: str, query: str):
    """
    Generate a detailed response using OpenAI GPT.

    Args:
        context (str): Retrieved Pokémon data.
        query (str): The user's query.

    Returns:
        str: Generated response from GPT.
    """
    prompt = (
        f"Use the following Pokémon data to answer the query:\n\n"
        f"{context}\n\n"
        f"Query: {query}\n\n"g Pokémon professor with detailed insights."
    )
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use "gpt-4" for more advanced responses if available
        messages=[
            {"role": "system", "content": "You are a helpful expert Pokémon professor."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )
    return response['choices'][0]['message']['content'].strip()
