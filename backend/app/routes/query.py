from fastapi import APIRouter
from app.services.search import search_embedding
from app.services.gpt import generate_response
from pydantic import BaseModel

router = APIRouter()

# Define the Pydantic model
class QueryRequest(BaseModel):
    user_query: str

@router.post("/")
async def query_pokemon(request: QueryRequest):
    """
    Query the Pokémon database and return a detailed response.

    Args:
        user_query (str): The query from the user.

    Returns:
        dict: Detailed GPT-generated response.
    """
    user_query = request.user_query

    # Step 1: Retrieve Pokémon data from FAISS
    results = search_embedding(user_query)

    # Step 2: Combine retrieved data into a single context string
    context = "\n".join(
        f"Pokémon Name: {result['name']}\nDetails: {result['details']}"
        for result in results
    )

    # Step 3: Generate a detailed response using GPT
    gpt_response = generate_response(context, user_query)

    # Return the detailed response and raw data
    return {
        "query": user_query,
        "response": gpt_response,
        "retrieved_data": results
    }
