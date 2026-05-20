import { formatDate } from "@/lib/formatDate";
import { getImageUrl } from "@/lib/getImageUrl";
import { ImageSizes, ImageTypes } from "@/types/imageSizes";
import { MovieReview } from "@/types/tmdb";
import { Star } from "lucide-react";
import Image from "next/image";

const MovieReviews = ({
  movieTitle,
  movieReviews,
}: {
  movieTitle: string;
  movieReviews: MovieReview[];
}) => {
  return (
    <div className="mt-8 md:mt-16 relative">
      <h4 className="text-xl md:text-2xl font-semibold mb-8 relative w-fit pb-3">
        {movieTitle} Reviews
        <div className="absolute inset-x-0 h-1 bottom-0 left-0 bg-linear-to-r from-primary/10 via-primary to-primary/10 rounded-full shadow-2xl shadow-fuchsia-600" />
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {movieReviews.map((review) => (
          <div key={review.id}>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={getImageUrl(
                    ImageSizes.W154,
                    review.author_details.avatar_path,
                    ImageTypes.USER,
                  )}
                  alt={review.author_details.username}
                  fill
                  sizes="60px"
                  className="object-cover object-center"
                />
              </div>
              <div>
                <h5>{review.author}</h5>
                <span className="text-xs text-muted-foreground font-medium">
                  {formatDate(review.created_at)}
                </span>
                {review.author_details.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />

                    <span className="text-xs font-bold">
                      {review.author_details.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-neutral-300 line-clamp-3 mt-4 px-1">
              {review.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieReviews;
