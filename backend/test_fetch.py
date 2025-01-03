from app.utils.fetch_data import fetch_pokemon_data
from app.services.embeddings import store_embeddings
from app.services.search import search_embedding
import requests

if __name__ == "__main__":
    # Define the API endpoint
    endpoint = "http://127.0.0.1:8000/query/"

    # Define the user query
    payload = {"user_query": "Tell me about Pikachu."}

    # Make a POST request to the /query endpoint
    response = requests.post(endpoint, json=payload)

    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        print("Query:", data["query"])
        print("GPT Response:", data["response"])
        print("Retrieved Data:", data["retrieved_data"])
    else:
        print("Error:", response.status_code, response.text)



# if __name__ == "__main__":
#     # Example query
#     query = "What's that pokemon look like a Whale"

#     # Perform the search
#     results = search_embedding(query)

#     # Print the top results
#     print("Top Results:")
#     for result in results:
#         print(f"Name: {result['name']}")
#         print(f"Details: {result['details']}")
#         print()

# if __name__ == "__main__":
#     # Fetch Pokémon data
#     data = fetch_pokemon_data(limit=100)  # Fetch 10 Pokémon for testing

#     # Store embeddings for the fetched data
#     store_embeddings(data)


# if __name__ == "__main__":
#     # Fetch 10 Pokémon for testing
#     data = fetch_pokemon_data(limit=3)
#     for pokemon in data:
#         print(pokemon)
#         print('\n\n')