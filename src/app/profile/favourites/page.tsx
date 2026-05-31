import { getImageUrl } from "@/lib/getImageUrl";
import { ImageSizes, ImageTypes } from "@/types/imageSizes";
import { WatchListMovie as FavouritesMovie } from "@/types/watchListMovie";
import { StarIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getFavouritesMovies } from "@/server/db/getFavouritesMovies";

const FavouritesPage = async () => {
  const watchListMovies: FavouritesMovie[] | undefined =
    await getFavouritesMovies();

  return (
    <section className="flex-1 w-full space-y-5">
      {watchListMovies && watchListMovies.length > 0 ? (
        watchListMovies.map((movie, idx) => (
          <div
            key={idx}
            className={`glass-strong rounded-lg transition-all duration-500 active:scale-110 hover:ring-2 hover:ring-primary/60 flex items-center justify-between p-4 animate-fade-in-lg ${idx < 10 && idx !== 0 && `animation-delay-${idx}00`}`}
          >
            <Link
              href={`/movie/${movie.movie_id}/details`}
              className="flex-1 w-full flex items-center gap-5"
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

              <div>
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

            <button className="fully-rounded-btn bg-red-500 transition-all duration-300 ring-2 ring-red-600 hover:ring-red-700">
              <Trash2 size={18} />
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-muted-foreground text-sm italic">
          No Movies Found In Your Favourites{" "}
          <Link href={"/"} className="text-primary font-bold animate-pulse">
            Start Browse Movies
          </Link>
        </p>
      )}
    </section>
  );
};

export default FavouritesPage;
