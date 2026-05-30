"use client";

import { Button } from "@/components/Button";
import { formatRuntime } from "@/lib/formatRuntime";
import { MovieDetails as MovieDetailsType, MovieVideo } from "@/types/tmdb";
import { BadgePlus, StarIcon } from "lucide-react";
import Image from "next/image";
import DetailsBlock from "./DetailsBlock";
import { formatMoney } from "@/lib/formatMoney";
import { getImageUrl } from "@/lib/getImageUrl";
import { ImageSizes, ImageTypes } from "@/types/imageSizes";
import MovieTrailerModal from "@/components/MovieTrailerModal";
import { addToWatchList } from "@/app/movie/_actions/addToWatchList";
import toast from "react-hot-toast";

const MovieDetails = ({
  movie,
  movieTrailer,
}: {
  movie: MovieDetailsType;
  movieTrailer: MovieVideo;
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="relative rounded-lg overflow-hidden min-w-70 w-70 xl:w-80 aspect-2/3 mx-auto md:mx-0 animate-fade-in-lg">
          <Image
            src={getImageUrl(
              ImageSizes.W342,
              movie.poster_path,
              ImageTypes.MOVIE_CARD,
            )}
            alt={movie.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 200px, 240px"
            priority={false}
          />

          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/70 to-black/90" />
        </div>

        <div>
          <h1 className="font-bold text-xl md:text-2xl xl:text-3xl animate-fade-in-lg animation-delay-100">
            {movie.title}
          </h1>
          <div className="flex gap-3 items-center py-2.5 tex-sm text-neutral-300 animate-fade-in-lg animation-delay-200">
            <div className="flex items-center gap-1.5">
              <StarIcon className="text-yellow-500 fill-yellow-500" size={17} />
              <span className="mt-0.5 block">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <span>{formatRuntime(movie.runtime)}</span>
            <span>{movie.release_date}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap animate-fade-in-lg animation-delay-300">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="py-1 px-2.5 bg-secondary text-neutral-300 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="text-neutral-300 italic text-sm py-3 md:py-4 w-full md:max-w-2xl animate-fade-in-lg animation-delay-400">
            {`"${movie.tagline || movie.original_title}"`}
          </p>
          <h3 className="text-lg font-semibold animate-fade-in-lg animation-delay-500">
            OverView
          </h3>
          <p className="text-neutral-300 text-sm py-2.5 w-full md:max-w-2xl animate-fade-in-lg animation-delay-600">
            {movie.overview}
          </p>
          <div className="flex items-center gap-4 pt-5">
            <div className="animate-fade-in-lg animation-delay-700">
              <MovieTrailerModal movieTrailer={movieTrailer} />
            </div>

            <Button
              size="sm"
              className="bg-secondary! ring-neutral-700! shadow-neutral-950! hover:bg-secondary/80! animate-fade-in-lg animation-delay-800"
              onClick={async () => {
                const result = await addToWatchList(movie);

                if (result.status && result.message) {
                  if (result.status === 200) {
                    toast.success(result.message);
                  } else {
                    toast.error(result.message);
                  }
                }
              }}
            >
              <BadgePlus size={18} className="text-blue-500" />
              <span>Add To Watchlist</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="animate-fade-in-lg animation-delay-900">
          <h4 className="text-lg font-semibold mb-4">Details</h4>
          <DetailsBlock
            title={"Production Companies"}
            subTitle={movie.production_companies
              .map((item) => item.name)
              .join(" | ")}
          />
          <DetailsBlock
            title={"Production Countries"}
            subTitle={movie.production_countries
              .map((item) => item.name)
              .join(" | ")}
          />
          <DetailsBlock title={"Budget"} subTitle={formatMoney(movie.budget)} />
          <DetailsBlock
            title={"Revenue"}
            subTitle={formatMoney(movie.revenue)}
          />
          <DetailsBlock title={"Status"} subTitle={movie.status} />
          <DetailsBlock
            title={"Original Language"}
            subTitle={movie.original_language.toUpperCase()}
          />
        </div>
        <div className="animate-fade-in-lg animation-delay-1000">
          <h4 className="text-lg font-semibold mb-4">Rating</h4>
          <div className="flex items-center gap-7 py-5">
            <div className="w-20 h-20 ring-3 ring-primary flex items-center justify-center rounded-full">
              {movie.vote_average.toFixed(1)}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-neutral-300">
                From {movie.vote_count.toLocaleString()} Votes
              </span>
              <span className="relative w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                <span
                  className="absolute inset-y-0 left-0 bg-primary rounded-full"
                  style={{ width: `${movie.vote_average * 10}%` }}
                />
              </span>
            </div>
          </div>
          <DetailsBlock
            title={"Is Suitable For Adults"}
            subTitle={movie.adult ? "No It Is +18" : "Yes, Happy In Watching"}
          />
          <DetailsBlock
            title={"Popularity Avg"}
            subTitle={movie.popularity.toString()}
          />
          <DetailsBlock
            title={"Original Title"}
            subTitle={movie.original_title}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
