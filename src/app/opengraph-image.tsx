import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";
import { colors } from "@/lib/tokens";

export const alt =
  "MeridianCogent — M&A execution, without the spreadsheet chaos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: colors.graphite,
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <svg
          width="1200"
          height="360"
          viewBox="0 0 1200 360"
          style={{ position: "absolute", left: 0, bottom: 0 }}
        >
          <path
            d="M-20 300 L200 150 L360 230 L560 70 L760 210 L960 90 L1220 200"
            fill="none"
            stroke={colors.accent}
            strokeOpacity="0.28"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <svg width="56" height="56" viewBox="0 10 120 120">
            <rect x="0" y="10" width="120" height="120" rx="24" fill={colors.accent} />
            <path
              d="M28 96 L47 58 L60 81 L73 49 L92 96"
              fill="none"
              stroke={colors.graphite}
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ color: colors.onDark.primary, fontSize: 34, fontWeight: 600 }}>
            {SITE_NAME}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              color: colors.onDark.primary,
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            M&A execution, without the spreadsheet chaos.
          </span>
          <span style={{ color: colors.onDark.secondary, fontSize: 28 }}>
            A control environment for separation and integration teams.
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
