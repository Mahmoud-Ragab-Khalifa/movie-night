import { getMovieCast, getMovieDetails } from "@/services/api";
import MovieDetails from "./_components/MovieDetails";
import Image from "next/image";
import MovieCast from "./_components/MovieCast";
import { MovieCastPerson } from "@/types/tmdb";
import MovieReviews from "./_components/MovieReviews";
import MovieRecommendations from "./_components/MovieRecommendations";

const MovieDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;

  const movie = await getMovieDetails(id);

  const movieCast: MovieCastPerson[] = await getMovieCast(id);

  return (
    <main className="bg-linear-to-b from-black/20 via-black/90 to-black">
      <section className="section-gap pb-8 md:pb-16">
        {/* Hero Image */}
        <div className="absolute inset-0 h-[50vh] -z-10">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/original/${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority={false}
          />

          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/60 to-black" />
        </div>

        <div className="container pt-50 md:pt-70 relative">
          <MovieDetails movie={movie} />

          <MovieCast cast={movieCast} movieTitle={movie.title} />

          <MovieReviews movieId={id} movieTitle={movie.title} />

          <MovieRecommendations />
        </div>
      </section>
    </main>
  );
};

export default MovieDetailsPage;
