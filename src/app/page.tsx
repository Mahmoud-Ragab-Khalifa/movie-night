import { getTrendingMovies } from "@/services/api";
import Hero from "./_components/Hero";
import Trending from "./_components/Trending";

const HomePage = async () => {
  const trendingMovies = await getTrendingMovies();

  return (
    <main>
      <Hero trendingMovies={trendingMovies} />

      <Trending />
    </main>
  );
};

export default HomePage;
