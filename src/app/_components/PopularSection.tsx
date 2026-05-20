import MainHeader from "@/components/MainHeader";
import MoviesSlider from "@/components/MoviesSlider";
import { ImageSizes } from "@/types/imageSizes";
import { Movie } from "@/types/tmdb";

const PopularSection = async ({
  popularMovies,
}: {
  popularMovies: Movie[];
}) => {
  return (
    <section className="section-gap relative" id="popular">
      <div className="container relative z-50">
        <MainHeader
          title="Popular Movies"
          description="Most Watched Movies Right Now"
        />

        <MoviesSlider movies={popularMovies} imageSize={ImageSizes.W342} />
      </div>
    </section>
  );
};

export default PopularSection;
