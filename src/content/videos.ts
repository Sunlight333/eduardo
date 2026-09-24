import type { StaticImageData } from "next/image";
import thumbDiskBiju from "@/assets/video-thumbs/Y4i-tsEbEfs.jpg";
import thumbSpfc from "@/assets/video-thumbs/9ik7DlqQRGk.jpg";
import thumbPrefeitoEducador from "@/assets/video-thumbs/r3-w5sm4uTI.jpg";
import thumbMestre from "@/assets/video-thumbs/Ws7-vCyzTBw.jpg";
import thumbAduaneiras from "@/assets/video-thumbs/TS9bvyK6mPQ.jpg";
import thumbHelcla from "@/assets/video-thumbs/dUQGWjzQr6E.jpg";
import thumbGonzalez from "@/assets/video-thumbs/owamRudMUUo.jpg";
import thumbEduvoice from "@/assets/video-thumbs/IiOpIanpKWM.jpg";
import thumbUnifaj from "@/assets/video-thumbs/edItHVMONso.jpg";
import thumbMagistral from "@/assets/video-thumbs/etDKyop-d_E.jpg";
import thumbCefet from "@/assets/video-thumbs/BoiphAT3epM.jpg";
import thumbBierTrunk from "@/assets/video-thumbs/KRjqN13hrAM.jpg";
import thumbBrastemp from "@/assets/video-thumbs/krMKClQyl8w.jpg";

export type VideoCategory = "Publicidade" | "Institucional" | "Eventos" | "Apresentação";

export type Video = {
  id: string;
  title: string;
  category: VideoCategory;
  thumb: StaticImageData;
};

// Todos hospedados no YouTube (canais @eduvoiceestudio e @eduvoice7370).
export const videos: Video[] = [
  { id: "Ws7-vCyzTBw", title: "Eduardo Rodrigues — Mestre de Cerimônias", category: "Eventos", thumb: thumbMestre },
  { id: "r3-w5sm4uTI", title: "Prêmio Prefeito Educador 2017", category: "Eventos", thumb: thumbPrefeitoEducador },
  { id: "edItHVMONso", title: "Formatura online — Unifaj (2020)", category: "Eventos", thumb: thumbUnifaj },
  { id: "krMKClQyl8w", title: "Compra Certa Brastemp", category: "Publicidade", thumb: thumbBrastemp },
  { id: "Y4i-tsEbEfs", title: "Disk Biju", category: "Publicidade", thumb: thumbDiskBiju },
  { id: "TS9bvyK6mPQ", title: "Aduaneiras — Institucional", category: "Institucional", thumb: thumbAduaneiras },
  { id: "owamRudMUUo", title: "Gonzalez Componentes — Institucional", category: "Institucional", thumb: thumbGonzalez },
  { id: "BoiphAT3epM", title: "CEFET-SP — Institucional", category: "Institucional", thumb: thumbCefet },
  { id: "dUQGWjzQr6E", title: "Helcla Multi Ação", category: "Institucional", thumb: thumbHelcla },
  { id: "IiOpIanpKWM", title: "Eduvoice Produções — Institucional", category: "Institucional", thumb: thumbEduvoice },
  { id: "etDKyop-d_E", title: "Canal Magistral", category: "Apresentação", thumb: thumbMagistral },
  { id: "9ik7DlqQRGk", title: "Reportagem São Paulo Futebol Clube", category: "Apresentação", thumb: thumbSpfc },
  // REVISAR: confirmar se este vídeo ainda combina com o posicionamento.
  { id: "KRjqN13hrAM", title: "Bier Trunk — Tributo às Divas do Pop (2017)", category: "Apresentação", thumb: thumbBierTrunk },
];

export const featuredVideo = videos[0];

export function videosById(ids: string[]): Video[] {
  return ids.map((id) => videos.find((v) => v.id === id)).filter((v): v is Video => Boolean(v));
}
