import { ImageSizes } from "@/types/imageSizes";

export function getImageUrl(size: ImageSizes, url: string) {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${size}/${url}`;
}
