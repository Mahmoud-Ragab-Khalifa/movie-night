import MainHeader from "@/components/MainHeader";
import MoviesSlider from "@/components/MoviesSlider";
import { getTrendingMovies } from "@/services/api";

const Trending = async () => {
  const trendingMovies = await getTrendingMovies();

  return (
    <section className="section-gap relative">
      <div className="container relative z-50">
        <MainHeader
          title="Trending This Week"
          description="Stay Updated With What Everyone's Watching"
        />

        <MoviesSlider movies={trendingMovies} />
      </div>
    </section>
  );
};

export default Trending;
