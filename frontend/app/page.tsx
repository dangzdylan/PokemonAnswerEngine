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

      <header className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-3xl font-bold">Pokémon Answer Engine</h1>
        <p className="text-sm mt-1">Ask any question about Pokémon, and let AI provide the answers!</p>
      </header>

      <main className="container mx-auto p-6 text-black">
        <PokemonQuery />
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-auto text-center">
        <p className="text-sm">Powered by AI - Pokémon Answer Engine © 2025</p>
      </footer>
    </div>
  );
};

export default Home;
