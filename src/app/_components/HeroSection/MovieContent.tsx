import { Button } from "@/components/Button";
import { Movie } from "@/types/tmdb";
import { PlayCircle, Plus, Star } from "lucide-react";

const MovieContent = ({ movie }: { movie: Movie }) => {
  return (
    <>
      <div className="flex items-center gap-2.5 justify-center md:justify-start">
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

      <h1 className="text-4xl md:text-6xl font-bold my-4 md:max-w-3xl md:leading-18 text-center md:text-start">
        {movie?.title}
      </h1>

      <p className="text-base md:text-lg md:max-w-2xl line-clamp-3 md:line-clamp-4 mb-8 text-neutral-300 text-center md:text-start">
        {movie?.overview}
      </p>

      <div className="flex items-center gap-4 justify-center md:justify-start">
        <Button size="sm">
          <PlayCircle size={18} />
          <span>Watch Now</span>
        </Button>

        <Button
          size="sm"
          className="bg-secondary shadow-none ring-neutral-600! hover:bg-muted!"
        >
          <Plus size={18} />
          <span>Show More Info</span>
        </Button>
      </div>
    </>
  );
};

export default MovieContent;
