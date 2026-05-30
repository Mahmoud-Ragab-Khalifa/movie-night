import { getImageUrl } from "@/lib/getImageUrl";
import { getWatchListMovies } from "@/server/db/getWatchListMovies";
import { ImageSizes, ImageTypes } from "@/types/imageSizes";
import { WatchListMovie } from "@/types/watchListMovie";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WatchListPage = async () => {
  const watchListMovies: WatchListMovie[] | undefined =
    await getWatchListMovies();

  return (
    <section className="flex-1 w-full space-y-5">
      {watchListMovies && watchListMovies.length > 0 ? (
        watchListMovies.map((movie, idx) => (
          <Link
            key={idx}
            href={`/movie/${movie.movie_id}/details`}
            className={`glass-strong rounded-lg transition-all duration-500 active:scale-110 hover:ring-2 hover:ring-primary/60 flex items-center gap-5 p-4 animate-fade-in-lg ${idx < 10 && idx !== 0 && `animation-delay-${idx}00`}`}
          >
            <div className="relative w-25 h-25 rounded-lg overflow-hidden">
              <Image
                src={getImageUrl(
                  ImageSizes.W154,
                  movie.image,
                  ImageTypes.MOVIE_CARD,
                )}
                alt={movie.title}
                fill
                sizes="100px"
                className="object-cover object-center"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h1>{movie.title}</h1>
              <span className="text-sm text-muted-foreground">
                Release Date: {movie.release_date}
              </span>
              <div className="flex items-center gap-1.5 text-sm">
                <StarIcon
                  className="text-yellow-500 fill-yellow-500"
                  size={17}
                />
                <span className="mt-0.5 block">{movie.rating}</span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-muted-foreground text-sm italic">
          No Movies Found In Your WatchList{" "}
          <Link href={"/"} className="text-primary font-bold animate-pulse">
            Start Browse Movies
          </Link>
        </p>
      )}
    </section>
  );
};

export default WatchListPage;
