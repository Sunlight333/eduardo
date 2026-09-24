import { HeartHandshake, MicVocal, Podium, Presentation, Tv } from "lucide-react";

import type { ServiceIcon as ServiceIconName } from "@/content/services";

const icons: Record<ServiceIconName, typeof MicVocal> = {
  mic: MicVocal,
  stage: Podium,
  tv: Tv,
  rings: HeartHandshake,
  presentation: Presentation,
};

export function ServiceIcon({ icon, className }: { icon: ServiceIconName; className?: string }) {
  const Icon = icons[icon];
  return <Icon className={className} aria-hidden="true" />;
}
