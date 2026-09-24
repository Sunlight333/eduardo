import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { whatsappUrl } from "@/lib/utils";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com Eduardo pelo WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
