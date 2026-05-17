import { getMoviesGenres } from "@/services/api";
import { Genre } from "@/types/tmdb";
import MoviesGenres from "./MoviesGenres";

const BrowseByGenre = async () => {
  const moviesGenres: Genre[] = await getMoviesGenres();

  return (
    <section className="section-gap relative">
      <div className="container relative z-50">
        <h2 className="font-semibold md:font-bold text-xl md:text-2xl pt-2.5">
          Browse By Genre
        </h2>

        <MoviesGenres genres={moviesGenres} />
      </div>
    </section>
  );
};

export default BrowseByGenre;
