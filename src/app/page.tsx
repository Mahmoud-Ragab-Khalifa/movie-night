import HeroSection from "./_components/HeroSection";
import TrendingSection from "./_components/TrendingSection";
import PopularSection from "./_components/PopularSection";
import BrowseByGenreSection from "./_components/BrowseByGenreSection";
import TopRatedSection from "./_components/TopRatedSection";
import {
  getMoviesGenres,
  getMovieVideos,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "@/services/api";
import { Genre, Movie, MovieVideo } from "@/types/tmdb";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    genreId?: string;
    movie_id?: string;
  }>;
}) => {
  const { genreId, movie_id } = await searchParams;

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

  const movieVideos: MovieVideo[] = await getMovieVideos(
    movie_id ? +movie_id : trendingMovies[0].id,
  );

  const movieTrailer: MovieVideo =
    movieVideos.find(
      (movie) => movie.site === "YouTube" && movie.type === "Trailer",
    ) ??
    movieVideos[0] ??
    {};

  return (
    <main className="bg-linear-to-b from-black via-black/30 to-black/90 relative">
      <HeroSection
        trendingMovies={trendingMovies}
        movieTrailer={movieTrailer}
      />

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
