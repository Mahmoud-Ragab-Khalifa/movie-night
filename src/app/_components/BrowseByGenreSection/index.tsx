import { Genre, Movie } from "@/types/tmdb";
import MoviesSlider from "@/components/MoviesSlider";
import { getMoviesByGenre } from "@/services/api";
import MoviesGenres from "./MoviesGenres";

const BrowseByGenreSection = async ({
  moviesGenres,
  genreId,
}: {
  moviesGenres: Genre[];
  genreId: string;
}) => {
  const moviesByGenre: Movie[] = await getMoviesByGenre(+genreId);

  return (
    <section className="section-gap relative" id="browse-by-genre">
      <div className="container relative z-50">
        <h2 className="font-semibold md:font-bold text-xl md:text-2xl pt-2.5">
          Browse By Genre
        </h2>

        <MoviesGenres
          genres={moviesGenres}
          activeGenre={
            moviesGenres.find((genre) => genre.id === +genreId) ??
            moviesGenres[0]
          }
        />

        <MoviesSlider movies={moviesByGenre} />
      </div>
    </section>
  );
};

export default BrowseByGenreSection;
