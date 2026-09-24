import { GalleryPage, galleryMetadata } from "@/components/sections/gallery-page";

export const metadata = galleryMetadata("estudio");

export default function Page() {
  return <GalleryPage slug="estudio" />;
}
