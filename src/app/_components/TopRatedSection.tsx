import MainHeader from "@/components/MainHeader";
import MoviesSlider from "@/components/MoviesSlider";
import { Movie } from "@/types/tmdb";

const TopRatedSection = async ({
  topRatedMovies,
}: {
  topRatedMovies: Movie[];
}) => {
  return (
    <section className="section-gap pb-8 md:pb-16 relative" id="top-rated">
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

export default TopRatedSection;
