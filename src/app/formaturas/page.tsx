import { GalleryPage, galleryMetadata } from "@/components/sections/gallery-page";

export const metadata = galleryMetadata("formaturas");

export default function Page() {
  return <GalleryPage slug="formaturas" />;
}
