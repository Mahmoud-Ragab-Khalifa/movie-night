import { getTrendingMovies } from "@/services/api";
import Hero from "./_components/Hero";

const HomePage = async () => {
  const trendingMovies = await getTrendingMovies();

  return (
    <main>
      <Hero trendingMovies={trendingMovies} />
    </main>
  );
};

export default HomePage;
