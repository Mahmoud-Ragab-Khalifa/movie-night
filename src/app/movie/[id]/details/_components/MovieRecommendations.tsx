import MainHeader from "@/components/MainHeader";
import MovieCard from "@/components/MovieCard";
import MoviesSlider from "@/components/MoviesSlider";
import { Movie, TmdbResponse } from "@/types/tmdb";
import PaginationButtons from "./PaginationButtons";

const MovieRecommendations = ({
  MovieRecommendationsResponse,
  movieId,
  page,
}: {
  movieId: number;
  page: number;
  MovieRecommendationsResponse: TmdbResponse;
}) => {
  const MovieRecommendations: Movie[] = MovieRecommendationsResponse.results;
  const MovieRecommendationsPages: number =
    MovieRecommendationsResponse.total_pages;

  return (
    <div className="mt-8 md:mt-16 relative">
      <MainHeader
        title="Movie Recommendations"
        description="Especially Recommended For You"
      />

      {/* Mobile Recommendations */}
      <div className="md:hidden">
        <MoviesSlider movies={MovieRecommendations} />
      </div>

      {/* Desktop Recommendations */}
      <div className="hidden md:grid grid-cols-4 lg:grid-cols-5 gap-4 mt-8 md:mt-10">
        {MovieRecommendations.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isPaginatedCard={true} />
        ))}
      </div>

      <PaginationButtons
        currentPage={page}
        totalPages={MovieRecommendationsPages}
        movieId={movieId}
      />
    </div>
  );
};

export default MovieRecommendations;
