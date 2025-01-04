import requests

def fetch_pokemon_data(limit=100):
    """
    Fetch comprehensive Pokémon data from the PokéAPI.

    Args:
        limit (int): Number of Pokémon to fetch.

    Returns:
        list: List of Pokémon data dictionaries.
    """
    base_url = "https://pokeapi.co/api/v2/pokemon"
    species_url = "https://pokeapi.co/api/v2/pokemon-species"
    response = requests.get(f"{base_url}?limit={limit}")
    response.raise_for_status()

    data = []

    for pokemon in response.json()["results"]:

        try :
            # Fetch basic Pokémon details
            details = requests.get(pokemon["url"]).json()

            # Fetch species-specific details
            species_details = requests.get(f"{species_url}/{details['id']}").json()
        except Exception as e :
            print('Species not found')
            continue

        # Extract relevant data
        data.append({
            "id": details["id"],
            "name": details["name"],
            "height": details["height"],
            "weight": details["weight"],
            "base_experience": details["base_experience"],
            "stats": {stat["stat"]["name"]: stat["base_stat"] for stat in details["stats"]},
            "abilities": [ability["ability"]["name"] for ability in details["abilities"]],
            "types": [ptype["type"]["name"] for ptype in details["types"]],
            "moves": [move["move"]["name"] for move in details["moves"][:10]],
            "flavor_text": next(
                entry["flavor_text"] for entry in species_details["flavor_text_entries"] 
                if entry["language"]["name"] == "en"
            ),
            "habitat": species_details["habitat"]["name"] if species_details["habitat"] else None,
            "color": species_details["color"]["name"],
            "shape": species_details["shape"]["name"] if species_details["shape"] else None,
            "generation": species_details["generation"]["name"]
        })

    return data
