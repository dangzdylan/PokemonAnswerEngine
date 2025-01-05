import Head from "next/head";
import PokemonQuery from "@/components/PokemonQuery";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Pokémon Answer Engine</title>
        <meta name="description" content="Search for Pokémon information using AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-black text-white py-4 shadow-md text-center">
        <h1 className="text-3xl font-bold">AI Pokémon Professor</h1>
        <p className="text-sm mt-1">Ask me anything about Pokémon!</p>
      </header>

      <main className="container mx-auto p-6 text-black text-center">
        <div className="px-20">
          <PokemonQuery />
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-auto text-center">
        <p className="text-sm">Created by Dylan Dang - Pokémon Professor © 2025</p>
      </footer>
    </div>
  );
};

export default Home;
