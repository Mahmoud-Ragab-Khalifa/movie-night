import { baseClasses, Button, sizeClasses } from "@/components/Button";
import MovieTrailerModal from "@/components/MovieTrailerModal";
import { Movie } from "@/types/tmdb";
import { CircleFadingPlus, Star } from "lucide-react";
import Link from "next/link";

const MovieContent = ({ movie }: { movie: Movie }) => {
  return (
    <>
      <div className="flex items-center gap-2.5 justify-center md:justify-start animate-fade-in-lg">
        <Button
          size="sm"
          className="p-1! text-xs uppercase rounded-full! md:rounded-md!"
        >
          Trending
        </Button>

        <div className="flex items-center gap-1">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />

          <span className="text-xs font-bold">
            {movie?.vote_average.toFixed(1)}
          </span>
        </div>

        <span className="text-primary animate-pulse font-extrabold">.</span>

        <span className="text-xs font-bold">
          {movie?.release_date.split("-", 2).join("-")}
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold my-4 md:max-w-3xl md:leading-18 text-center md:text-start animate-fade-in-lg animation-delay-100">
        {movie?.title}
      </h1>

      <p className="text-base md:text-lg md:max-w-2xl line-clamp-3 md:line-clamp-4 mb-8 text-neutral-300 text-center md:text-start animate-fade-in-lg animation-delay-200">
        {movie?.overview}
      </p>

      <div className="flex items-center gap-4 justify-center md:justify-start relative">
        <div className="animate-fade-in-lg animation-delay-300">
          <MovieTrailerModal />
        </div>

        <Link
          href={`/movie/${movie.id}/details`}
          className={`${baseClasses} ${sizeClasses.sm} animate-fade-in-lg animation-delay-400 bg-secondary ring-neutral-700! shadow-surface hover:bg-secondary/80`}
        >
          <CircleFadingPlus size={18} />
          <span>View Movie Details</span>
        </Link>
      </div>
    </>
  );
};

export default MovieContent;
