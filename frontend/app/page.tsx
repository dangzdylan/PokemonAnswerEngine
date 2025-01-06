import Head from "next/head";
import PokemonQuery from "@/components/PokemonQuery";
import Image from "next/image";

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
      <header className="bg-red-500 text-white py-2 shadow-md text-left">
        <div style={{ width: '20vw', height: '5vh', position: 'relative' }}>
          <Image 
          src="/ai_pokemon_professor_title.png"
          fill
          style={{ objectFit: 'contain' }}
           alt="AI Pokémon Professor"/>
        </div>
        <p className="text-sm mt-1 ml-2 font-bold">Your questions about Pokémon, answered!</p>
      </header>

      {/* Main Content */}
      <main className=" flex-grow flex flex-col overflow-y-auto px-20 py-10 text-black">
        <PokemonQuery />
      </main>
    </div>
  );
};

export default Home;
