import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Monograma "ER" provisório (favicon/ícone) até a entrega do logo vetorial. */
export async function monogram(px: number) {
  const serif = await readFile(join(process.cwd(), "src/assets/fonts/InstrumentSerif-Regular.ttf"));
  const dot = Math.max(3, Math.round(px * 0.12));
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0d0c0b",
          borderRadius: px * 0.22,
          position: "relative",
        }}
      >
        <div style={{ fontFamily: "Instrument Serif", fontSize: px * 0.62, color: "#f5b85a", lineHeight: 1, marginTop: px * 0.04 }}>
          ER
        </div>
        <div
          style={{
            position: "absolute",
            top: px * 0.14,
            right: px * 0.14,
            width: dot,
            height: dot,
            borderRadius: dot,
            background: "#e5484d",
          }}
        />
      </div>
    ),
    { width: px, height: px, fonts: [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }] },
  );
}
