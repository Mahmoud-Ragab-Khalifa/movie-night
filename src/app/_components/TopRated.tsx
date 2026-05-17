import MainHeader from "@/components/MainHeader";
import MoviesSlider from "@/components/MoviesSlider";
import { getTopRatedMovies } from "@/services/api";
import { Movie } from "@/types/tmdb";

const TopRated = async () => {
  const topRatedMovies: Movie[] = await getTopRatedMovies();

  return (
    <section className="section-gap relative" id="top-rated">
      <div className="container relative z-50">
        <MainHeader
          title="Top Rated Movies"
          description="Highest Rated Movies Of All Time"
        />

        <MoviesSlider movies={topRatedMovies} />
      </div>
    </section>
  );
};

export default TopRated;
