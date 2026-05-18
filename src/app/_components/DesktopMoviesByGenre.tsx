import MovieCard from "@/components/MovieCard";
import { getMoviesByGenre } from "@/services/api";
import { Movie } from "@/types/tmdb";

const DesktopMoviesByGenre = async ({ genreId }: { genreId: string }) => {
  const moviesByGenre: Movie[] = await getMoviesByGenre(+genreId);

  return (
    <div className="grid gap-4 grid-cols-4">
      {moviesByGenre.map((movie, idx) => (
        <MovieCard key={idx} movie={movie} />
      ))}
    </div>
  );
};

export default DesktopMoviesByGenre;
