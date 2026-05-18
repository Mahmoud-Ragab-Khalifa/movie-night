import { Genre, Movie } from "@/types/tmdb";
import MoviesGenres from "./MoviesGenres";
import MoviesSlider from "@/components/MoviesSlider";
import { getMoviesByGenre } from "@/services/api";

const BrowseByGenre = async ({
  moviesGenres,
  genreId,
}: {
  moviesGenres: Genre[];
  genreId: string;
}) => {
  const moviesByGenre: Movie[] = await getMoviesByGenre(+genreId);

  return (
    <section className="section-gap relative">
      <div className="container relative z-50">
        <h2 className="font-semibold md:font-bold text-xl md:text-2xl pt-2.5">
          Browse By Genre
        </h2>

        <MoviesGenres genres={moviesGenres} />

        <MoviesSlider movies={moviesByGenre} />
      </div>
    </section>
  );
};

export default BrowseByGenre;
