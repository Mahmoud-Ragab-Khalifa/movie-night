import { ImageSizes, ImageType } from "@/types/imageSizes";

const fallbackImage: Record<ImageType, string> = {
  "Mobile-Hero":
    "https://res.cloudinary.com/djdhc5rlo/image/upload/v1779282696/movie-mobile-hero_vlhlm6.png",
  "Desktop-Hero":
    "https://res.cloudinary.com/djdhc5rlo/image/upload/v1779282710/movie-desktop-hero_c2gtnb.png",
  "Movie-Card":
    "https://res.cloudinary.com/djdhc5rlo/image/upload/v1779282653/movie-card_kkihae.png",
  Actor: "https://placehold.co/120x120/png?text=Actor",
  User: "https://placehold.co/80x80/png?text=User",
};

export function getImageUrl(
  size: ImageSizes,
  url: string | null,
  type: ImageType,
) {
  if (!url) return fallbackImage[type];

  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${size}/${url}`;
}
