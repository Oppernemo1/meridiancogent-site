"use client";

import { useEffect } from "react";

/**
 * Marks the current page `noindex` from the browser.
 *
 * A render error that happens client-side can't change the HTTP status —
 * the server already sent a complete 200 before any JavaScript ran — so a
 * crawler that renders JavaScript would otherwise index the error screen as
 * a normal page. Google's documented remedy for errors in JavaScript-rendered
 * pages is to set robots `noindex` from JavaScript. The root layout already
 * emits `robots` and `googlebot` tags set to index, so those are rewritten
 * rather than joined by a second, conflicting tag.
 */
export function useNoindex() {
  useEffect(() => {
    for (const name of ["robots", "googlebot"]) {
      let tag = document.head.querySelector<HTMLMetaElement>(
        `meta[name="${name}"]`,
      );
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = "noindex, nofollow";
    }
  }, []);
}
