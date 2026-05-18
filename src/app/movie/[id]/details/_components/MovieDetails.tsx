import { Button } from "@/components/Button";
import { formatRuntime } from "@/lib/formatRuntime";
import { MovieDetails as MovieDetailsType } from "@/types/tmdb";
import { PlayCircle, Plus, StarIcon } from "lucide-react";
import Image from "next/image";

const MovieDetails = ({ movie }: { movie: MovieDetailsType }) => {
  console.log(movie);
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="relative min-w-70 w-70 xl:w-80 aspect-2/3 mx-auto md:mx-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/original/${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover object-center rounded-lg"
            sizes="(max-width: 768px) 200px, 240px"
            priority={false}
          />

          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/70 to-black/90" />
        </div>

        <div>
          <h1 className="font-bold text-xl md:text-2xl xl:text-3xl">
            {movie.title}
          </h1>
          <div className="flex gap-3 items-center py-2.5 tex-sm text-neutral-300">
            <div className="flex items-center gap-1.5">
              <StarIcon className="text-yellow-500 fill-yellow-500" size={17} />
              <span className="mt-0.5 block">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <span>{formatRuntime(movie.runtime)}</span>
            <span>{movie.release_date}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="py-1 px-2.5 bg-secondary text-neutral-300 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="text-neutral-300 italic text-sm py-3 md:py-4 w-full md:max-w-2xl">{`"${movie.tagline}"`}</p>
          <h3 className="text-lg font-semibold">OverView</h3>
          <p className="text-neutral-300 text-sm py-2.5 w-full md:max-w-2xl">
            {movie.overview}
          </p>
          <div className="flex items-center gap-4 animate-fade-in-lg animation-delay-800 pt-5">
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
        </div>
      </div>

      <div className="mt-8 md:mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <h4>Details</h4>
        </div>
        <div>
          <h4>Rating</h4>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
