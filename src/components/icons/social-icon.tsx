import type { SocialNetwork } from "@/content/site";
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./brand-icons";

const icons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
} satisfies Record<SocialNetwork, unknown>;

export function SocialIcon({ network, className }: { network: SocialNetwork; className?: string }) {
  const Icon = icons[network];
  return <Icon className={className} />;
}
