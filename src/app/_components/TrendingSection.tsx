import MainHeader from "@/components/MainHeader";
import MoviesSlider from "@/components/MoviesSlider";
import { Movie } from "@/types/tmdb";

const TrendingSection = ({ movies }: { movies: Movie[] }) => {
  return (
    <section className="section-gap relative" id="trending">
      <div className="container relative z-50">
        <MainHeader
          title="Trending This Week"
          description="Stay Updated With What Everyone's Watching"
        />

        <MoviesSlider movies={movies} imageSize="w342" />
      </div>
    </section>
  );
};

export default TrendingSection;
