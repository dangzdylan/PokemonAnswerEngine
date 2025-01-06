import Head from "next/head";
import PokemonQuery from "@/components/PokemonQuery";

const Home = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Head>
        <title>Pokémon Answer Engine</title>
        <meta name="description" content="Search for Pokémon information using AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-black text-white py-4 shadow-md text-center">
        <h1 className="text-3xl font-bold">AI Pokémon Professor</h1>
        <p className="text-sm mt-1">Ask me anything about Pokémon!</p>
      </header>

      {/* Main Content */}
      <main className=" flex-grow flex flex-col overflow-y-auto px-20 py-10 text-black">
        <PokemonQuery />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">Created by Dylan Dang - Pokémon Professor © 2025</p>
      </footer>
    </div>
  );
};

export default Home;
