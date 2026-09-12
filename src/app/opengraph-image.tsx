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
          background: colors.navy,
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
            stroke={colors.ice}
            strokeOpacity="0.28"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <svg width="56" height="56" viewBox="0 0 200 200">
            <rect width="200" height="200" rx="40" fill={colors.ice} />
            <path
              d="M40 140 L80 78 L100 118 L120 58 L160 140"
              fill="none"
              stroke={colors.navy}
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ color: colors.onNavy.primary, fontSize: 34, fontWeight: 600 }}>
            {SITE_NAME}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              color: colors.onNavy.primary,
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            M&A execution, without the spreadsheet chaos.
          </span>
          <span style={{ color: colors.ice, fontSize: 28 }}>
            A control environment for separation and integration teams.
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
