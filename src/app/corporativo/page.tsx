import { GalleryPage, galleryMetadata } from "@/components/sections/gallery-page";

export const metadata = galleryMetadata("corporativo");

export default function Page() {
  return <GalleryPage slug="corporativo" />;
}
