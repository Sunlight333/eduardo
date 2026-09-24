import { GalleryPage, galleryMetadata } from "@/components/sections/gallery-page";

export const metadata = galleryMetadata("festas");

export default function Page() {
  return <GalleryPage slug="festas" />;
}
