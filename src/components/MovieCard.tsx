import { CircleFadingPlus, Star } from "lucide-react";
import { baseClasses, sizeClasses } from "./Button";
import Image from "next/image";
import { Movie } from "@/types/tmdb";
import Link from "next/link";
import { ImageSizes, ImageTypes } from "@/types/imageSizes";
import { getImageUrl } from "@/lib/getImageUrl";

const MovieCard = ({
  movie,
  isPaginatedCard = false,
  imageSize = ImageSizes.ORIGINAL,
}: {
  movie: Movie;
  isPaginatedCard?: boolean;
  imageSize?: ImageSizes;
}) => {
  return (
    <div className="grid gap-2.5 animate-fade-in-lg">
      <div
        className={`${isPaginatedCard ? "w-full" : "w-60 xl:w-70"} overflow-hidden rounded-lg snap-start relative group`}
      >
        {/* Image */}
        <div className="relative aspect-2/3">
          <Image
            src={getImageUrl(
              imageSize,
              movie.poster_path,
              ImageTypes.MOVIE_CARD,
            )}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 200px, 240px"
            className="object-cover transition-all duration-300 group-hover:scale-110 rounded-lg"
          />
        </div>

        {/* OverLay With Watching Button */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 md:opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="transform md:translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Star className="text-yellow-500 fill-yellow-500" size={17} />

                <span className="text-yellow-500 font-medium text-sm pt-1">
                  {movie?.vote_average.toFixed(1)}
                </span>
              </div>

              <span className="hidden md:block text-sm text-neutral-300">
                {movie?.release_date.split("-", 2).join("-")}
              </span>

              <Link
                href={`/movie/${movie.id}/details`}
                className="fully-rounded-btn bg-primary animate-pulse shadow-2xl shadow-primary md:hidden"
              >
                <CircleFadingPlus size={18} />
              </Link>
            </div>

            <Link
              href={`/movie/${movie.id}/details`}
              className={`${baseClasses} ${sizeClasses.sm} hidden md:flex w-full mt-2.5`}
            >
              <CircleFadingPlus size={18} />
              <span>{isPaginatedCard ? "View" : "View Details"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      {!isPaginatedCard && (
        <div className="hidden md:block px-1.5">
          <p className="mb-0.5 text-sm font-medium overflow-hidden max-w-55 xl:max-w-65 truncate">
            {movie?.title}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Star className="text-yellow-500 fill-yellow-500" size={17} />

              <span className="text-neutral-300 font-medium text-sm pt-1">
                {movie?.vote_average.toFixed(1)}
              </span>
            </div>

            <span className="hidden md:block text-sm text-neutral-300">
              {movie?.release_date.split("-", 1).join("-")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
