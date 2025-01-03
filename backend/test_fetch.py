from app.utils.fetch_data import fetch_pokemon_data
from app.services.embeddings import store_embeddings
from app.services.search import search_embedding

if __name__ == "__main__":
    # Example query
    query = "What's that pokemon look like a Whale"

    # Perform the search
    results = search_embedding(query)

    # Print the top results
    print("Top Results:")
    for result in results:
        print(f"Name: {result['name']}")
        print(f"Details: {result['details']}")
        print()

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