import MainHeader from "@/components/MainHeader";
import MoviesSlider from "@/components/MoviesSlider";
import { getPopularMovies } from "@/services/api";
import { Movie } from "@/types/tmdb";

const Popular = async () => {
  const popularMovies: Movie[] = await getPopularMovies();

  return (
    <section className="section-gap relative" id="popular">
      <div className="container relative z-50">
        <MainHeader
          title="Popular Movies"
          description="Most Watched Movies Right Now"
        />

        <MoviesSlider movies={popularMovies} />
      </div>
    </section>
  );
};

export default Popular;
