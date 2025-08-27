import { useState, useEffect } from "react";

export function useBlogScrollSpy(headings, contentRef) {
  const [activeHeading, setActiveHeading] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (headings && headings.length > 0) {
      setActiveHeading(headings[0].id);
    }
  }, [headings]);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    let ticking = false;

    const compute = () => {
      const contentEl = contentRef.current;
      if (!contentEl) {
        ticking = false;
        return;
      }

      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean);

      if (headingElements.length === 0) {
        ticking = false;
        return;
      }

      // Progress
      const rect = contentEl.getBoundingClientRect();
      const winHeight = window.innerHeight;
      const percent = Math.max(
        0,
        Math.min(1, (winHeight - rect.top) / (rect.height + winHeight - 120))
      );
      setProgress(percent);

      // Active heading
      let curr = headings[0].id;
      for (let h of headingElements) {
        const top = h.getBoundingClientRect().top;
        if (top - 110 < 0) {
          curr = h.id;
        } else {
          break;
        }
      }
      setActiveHeading(curr);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    compute();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings, contentRef]);

  return { activeHeading, progress };
}
