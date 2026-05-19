import MainHeader from "@/components/MainHeader";
import MovieCard from "@/components/MovieCard";
import MoviesSlider from "@/components/MoviesSlider";
import { getMovieRecommendations } from "@/services/api";
import { Movie } from "@/types/tmdb";

const MovieRecommendations = async () => {
  const MovieRecommendations: Movie[] = await getMovieRecommendations(120);
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
    </div>
  );
};

export default MovieRecommendations;
