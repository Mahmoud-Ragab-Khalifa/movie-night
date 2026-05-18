import { getMoviesGenres, getTrendingMovies } from "@/services/api";
import Hero from "./_components/Hero";
import Trending from "./_components/Trending";
import Popular from "./_components/Popular";
import TopRated from "./_components/TopRated";
import BrowseByGenre from "./_components/BrowseByGenre";
import { Genre } from "@/types/tmdb";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    genreId?: string;
  }>;
}) => {
  const trendingMovies = await getTrendingMovies();

  const moviesGenres: Genre[] = await getMoviesGenres();

  const { genreId } = await searchParams;

  return (
    <main className="bg-linear-to-b from-black via-black/30 to-black/90 relative">
      <Hero trendingMovies={trendingMovies} />

      <Trending movies={trendingMovies} />

      <Popular />

      <BrowseByGenre
        genreId={genreId ?? moviesGenres[0].id.toString()}
        moviesGenres={moviesGenres}
      />

      <TopRated />
    </main>
  );
};

export default HomePage;
