import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type Row = { key: string; value: string };

/** Fetches a subsetted TTF from Google Fonts. Returns null on any failure,
 *  so the build never depends on it (satori falls back to its default font). */
async function loadFont(family: string, weight: number, text: string) {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

/**
 * Social card in the site's palette: a paper page, a mounted sheet with the
 * name in Petrona, and a specimen-label block.
 */
export async function ogImage({
  title,
  eyebrow,
  rows,
}: {
  title: string;
  eyebrow?: string;
  rows: Row[];
}) {
  const text = `${title}${eyebrow ?? ""}${rows.map((r) => r.key + r.value).join("")}`;
  const [petrona, schibsted] = await Promise.all([
    loadFont("Petrona", 600, text),
    loadFont("Schibsted Grotesk", 400, text),
  ]);
  const fonts = [
    petrona && { name: "Petrona", data: petrona, weight: 600 as const, style: "normal" as const },
    schibsted && { name: "Schibsted Grotesk", data: schibsted, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 56,
          background: "#EEF0E5",
          fontFamily: "Schibsted Grotesk",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: 48,
            background: "#F7F8F2",
            border: "1px solid #C8CDBB",
            borderRadius: 2,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {eyebrow ? (
              <div style={{ display: "flex", fontSize: 30, color: "#56614F", marginBottom: 16 }}>
                {eyebrow}
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                fontFamily: "Petrona",
                fontWeight: 600,
                fontSize: 92,
                lineHeight: 1,
                letterSpacing: -1.4,
                color: "#1E2A22",
              }}
            >
              {title}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "flex-start",
              maxWidth: 760,
              padding: "20px 24px",
              border: "1px solid #56614F",
              gap: 8,
            }}
          >
            {rows.map((r) => (
              <div key={r.key} style={{ display: "flex", fontSize: 26, lineHeight: 1.35 }}>
                <div style={{ display: "flex", width: 160, color: "#56614F" }}>{r.key}</div>
                <div style={{ display: "flex", flex: 1, color: "#1E2A22" }}>{r.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts }
  );
}
