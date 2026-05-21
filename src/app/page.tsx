import HeroSection from "./_components/HeroSection";
import TrendingSection from "./_components/TrendingSection";
import PopularSection from "./_components/PopularSection";
import BrowseByGenreSection from "./_components/BrowseByGenreSection";
import TopRatedSection from "./_components/TopRatedSection";
import {
  getMoviesGenres,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "@/services/api";
import { Genre, Movie } from "@/types/tmdb";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    genreId?: string;
  }>;
}) => {
  const { genreId } = await searchParams;

  const [trendingMovies, popularMovies, moviesGenres, topRatedMovies]: [
    Movie[],
    Movie[],
    Genre[],
    Movie[],
  ] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getMoviesGenres(),
    getTopRatedMovies(),
  ]);

  return (
    <main className="bg-linear-to-b from-black via-black/30 to-black/90 relative">
      <HeroSection trendingMovies={trendingMovies} />

      <TrendingSection movies={trendingMovies} />

      <PopularSection popularMovies={popularMovies} />

      <BrowseByGenreSection
        genreId={genreId ? +genreId : moviesGenres[0].id}
        moviesGenres={moviesGenres}
      />

      <TopRatedSection topRatedMovies={topRatedMovies} />
    </main>
  );
};

export default HomePage;
