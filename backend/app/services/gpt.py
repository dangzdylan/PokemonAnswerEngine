import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize conversation history
conversation_history = [
    {"role": "system", "content": "You are a helpful expert Pokémon professor."}
]

def generate_response(context: str, query: str):
    """
    Generate a detailed response using OpenAI GPT, with memory of previous queries.

    Args:
        context (str): Retrieved Pokémon data.
        query (str): The user's query.

    Returns:
        str: Generated response from GPT.
    """
    global conversation_history  # To update the history globally

    # Add the context and query to the conversation
    conversation_history.append({"role": "user", "content": f"Context: {context}\nQuery: {query}"})

    # Generate a response
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use "gpt-4" for more advanced responses if available
        messages=conversation_history,
        temperature=0.7
    )

    # Extract the assistant's reply
    assistant_reply = response['choices'][0]['message']['content'].strip()

    # Add the assistant's reply to the conversation history
    conversation_history.append({"role": "assistant", "content": assistant_reply})

    return assistant_reply
