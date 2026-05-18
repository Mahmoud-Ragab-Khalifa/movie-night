import HeroSection from "./_components/HeroSection";
import TrendingSection from "./_components/TrendingSection";
import PopularSection from "./_components/PopularSection";
import BrowseByGenreSection from "./_components/BrowseByGenreSection";
import TopRatedSection from "./_components/TopRatedSection";
import { getMoviesGenres, getTrendingMovies } from "@/services/api";
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
      <HeroSection trendingMovies={trendingMovies} />

      <TrendingSection movies={trendingMovies} />

      <PopularSection />

      <BrowseByGenreSection
        genreId={genreId ?? moviesGenres[0].id.toString()}
        moviesGenres={moviesGenres}
      />

      <TopRatedSection />
    </main>
  );
};

export default HomePage;
