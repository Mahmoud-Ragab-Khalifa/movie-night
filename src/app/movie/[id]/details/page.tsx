import {
  getMovieCast,
  getMovieDetails,
  getMovieRecommendations,
  getMovieReviews,
  getMovieVideos,
} from "@/services/api";
import MovieDetails from "./_components/MovieDetails";
import Image from "next/image";
import MovieCast from "./_components/MovieCast";
import {
  MovieCastPerson,
  MovieDetails as MovieDetailsItem,
  MovieReview,
  MovieVideo,
  TmdbResponse,
} from "@/types/tmdb";
import MovieReviews from "./_components/MovieReviews";
import MovieRecommendations from "./_components/MovieRecommendations";
import { getImageUrl } from "@/lib/getImageUrl";
import { ImageSizes, ImageTypes } from "@/types/imageSizes";

const MovieDetailsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: number }>;
  searchParams: Promise<{ page: number }>;
}) => {
  const { id } = await params;

  const searchParamsPage = await searchParams;

  const page = searchParamsPage.page ?? 1;

  const [
    movie,
    movieCast,
    movieReviews,
    MovieRecommendationsResponse,
    movieVideos,
  ]: [
    MovieDetailsItem,
    MovieCastPerson[],
    MovieReview[],
    TmdbResponse,
    MovieVideo[],
  ] = await Promise.all([
    getMovieDetails(id),
    getMovieCast(id),
    getMovieReviews(id),
    getMovieRecommendations(id, page),
    getMovieVideos(id),
  ]);

  const movieTrailer: MovieVideo =
    movieVideos.find(
      (movie) => movie.site === "YouTube" && movie.type === "Trailer",
    ) ??
    movieVideos[0] ??
    {};

  return (
    <main className="bg-linear-to-b from-black/20 via-black/90 to-black">
      <section className="section-gap pb-8 md:pb-16">
        {/* Hero Image */}
        <div className="absolute inset-0 h-[50vh] -z-10">
          <Image
            src={getImageUrl(
              ImageSizes.W1280,
              movie.backdrop_path,
              ImageTypes.DESKTOP_HERO,
            )}
            alt={movie.title}
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority={false}
          />

          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/60 to-black" />
        </div>

        <div className="container pt-50 md:pt-70 relative">
          <MovieDetails movie={movie} movieTrailer={movieTrailer} />

          <MovieCast cast={movieCast} movieTitle={movie.title} />

          <MovieReviews movieTitle={movie.title} movieReviews={movieReviews} />

          <MovieRecommendations
            movieId={id}
            page={page}
            MovieRecommendationsResponse={MovieRecommendationsResponse}
          />
        </div>
      </section>
    </main>
  );
};

export default MovieDetailsPage;
