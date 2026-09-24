import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Ícone "ER" nas cores do logo (amarelo #F7C500 e preto #211919). */
export async function monogram(px: number) {
  const font = await readFile(join(process.cwd(), "src/assets/fonts/montserrat-latin-800-normal.woff"));
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#211919",
          borderRadius: px * 0.2,
        }}
      >
        <div style={{ fontFamily: "Montserrat", fontWeight: 800, fontSize: px * 0.5, color: "#F7C500", letterSpacing: -px * 0.02 }}>
          ER
        </div>
      </div>
    ),
    { width: px, height: px, fonts: [{ name: "Montserrat", data: font, style: "normal", weight: 800 }] },
  );
}
