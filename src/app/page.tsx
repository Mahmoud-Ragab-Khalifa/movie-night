import { getTrendingMovies } from "@/services/api";
import Hero from "./_components/Hero";
import Trending from "./_components/Trending";
import Popular from "./_components/Popular";
import TopRated from "./_components/TopRated";

const HomePage = async () => {
  const trendingMovies = await getTrendingMovies();

  return (
    <main className="bg-linear-to-b from-black via-black/30 to-black/90 relative">
      <Hero trendingMovies={trendingMovies} />

      <Trending movies={trendingMovies} />

      <Popular />

      <TopRated />
    </main>
  );
};

export default HomePage;
