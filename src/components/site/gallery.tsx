"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Shuffle } from "lucide-react";

/**
 * Shuffling gallery.
 *
 * Six official Smart H₂O photos rotate through a fixed grid of frames.
 * Frames stay put; each photo slides from its previous frame to the next
 * one (FLIP: cell positions are measured once, figures animate with the
 * Web Animations API). No animation library, no layout thrash.
 *
 * - Auto-shuffles every 2.6s, pauses while hovered, focused or hidden.
 * - prefers-reduced-motion: no auto-shuffle, no slide; the Shuffle button
 *   still swaps frames instantly.
 * - Keyed figures move between cells as the same DOM node, so images
 *   never reload or flash.
 */

type Shot = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

const SHOTS: Shot[] = [
  {
    src: "/images/smart-h2o-scene.webp",
    alt: "Smart H₂O refill machine with a branded bottle, a water splash and a Namibian river scene",
    label: "Machine, bottle, splash",
    width: 1451,
    height: 810,
  },
  {
    src: "/images/machine-factory.webp",
    alt: "Smart H₂O machine standing on the factory floor before delivery",
    label: "Machine, factory floor",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/machine-detail.webp",
    alt: "Close-up of the Smart H₂O dispense point",
    label: "Dispense point",
    width: 690,
    height: 550,
  },
  {
    src: "/images/refill-nozzle.webp",
    alt: "Nozzle refilling a bottle at a Smart H₂O machine",
    label: "Refill in action",
    width: 560,
    height: 699,
  },
  {
    src: "/images/student-refill.webp",
    alt: "Student refilling a bottle at a Smart H₂O machine",
    label: "Student refill",
    width: 468,
    height: 623,
  },
  {
    src: "/images/bottles-pair.webp",
    alt: "Two Smart H₂O branded bottles",
    label: "Own bottle, refilled",
    width: 540,
    height: 710,
  },
];

const SHUFFLE_MS = 2600;
const MOVE_MS = 640;
const INITIAL = SHOTS.map((_, i) => i);

export function Gallery() {
  const [order, setOrder] = useState<number[]>(INITIAL);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const prevOrderRef = useRef<number[]>(INITIAL);
  const cellRectsRef = useRef<Array<{ left: number; top: number }>>([]);
  const figureRefs = useRef<Array<HTMLElement | null>>([]);
  const gridRef = useRef<HTMLUListElement>(null);
  const firstRunRef = useRef(true);

  // Reduced-motion users get an instant swap instead of a slide.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Cell frames never move within a layout; re-measure on resize only.
  const measureCells = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    cellRectsRef.current = Array.from(grid.children).map((cell) => {
      const r = cell.getBoundingClientRect();
      return { left: r.left + window.scrollX, top: r.top + window.scrollY };
    });
  }, []);

  useEffect(() => {
    measureCells();
    window.addEventListener("resize", measureCells);
    return () => window.removeEventListener("resize", measureCells);
  }, [measureCells]);

  // FLIP: after each order commit, slide every mover from its previous
  // frame to the current one. Page coordinates keep deltas correct
  // even if the page scrolled between shuffles.
  useLayoutEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false;
      prevOrderRef.current = order;
      return;
    }
    const prev = prevOrderRef.current;
    const rects = cellRectsRef.current;
    if (!reduced && rects.length === SHOTS.length) {
      order.forEach((shotIdx, cellIdx) => {
        const prevCell = prev.indexOf(shotIdx);
        if (prevCell === cellIdx || prevCell === -1) return;
        const el = figureRefs.current[shotIdx];
        const from = rects[prevCell];
        const to = rects[cellIdx];
        if (!el || !from || !to) return;
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
        el.animate(
          [
            { transform: `translate(${dx}px, ${dy}px)` },
            { transform: "translate(0, 0)" },
          ],
          { duration: MOVE_MS, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
        );
      });
    }
    prevOrderRef.current = order;
  }, [order, reduced]);

  const rotate = useCallback(() => {
    setOrder((o) => [...o.slice(1), o[0]]);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => {
      if (!document.hidden) rotate();
    }, SHUFFLE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, rotate]);

  return (
    <section aria-labelledby="gallery-title" className="bg-mist">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-label text-steel">Machines, bottles, refills</p>
            <h2
              id="gallery-title"
              className="mt-3 text-3xl md:text-[2.4rem] leading-[1.1] font-bold tracking-[-0.015em] text-primary"
            >
              The machines at&nbsp;work.
            </h2>
          </div>
          <div className="flex items-end justify-between gap-4 md:justify-end">
            <p className="max-w-[38ch] text-[0.8125rem] leading-relaxed text-foreground/70">
              Six frames from the Smart H₂O kit. They keep moving, like the
              refills.
            </p>
            <button
              type="button"
              onClick={rotate}
              className="mono-label inline-flex flex-none items-center gap-2 rounded-full border border-primary px-4 py-2.5 text-primary transition-colors hover:bg-primary hover:text-white"
              aria-label="Shuffle the gallery"
            >
              Shuffle
              <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          ref={gridRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-3 md:gap-4"
        >
          {order.map((shotIdx, cellIdx) => {
            const shot = SHOTS[shotIdx];
            return (
              <li
                key={`cell-${cellIdx}`}
                className="overflow-hidden rounded-lg border border-rule bg-paper"
              >
                <figure
                  key={shot.src}
                  ref={(el) => {
                    figureRefs.current[shotIdx] = el;
                  }}
                  className="m-0 flex h-full flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="mono-label border-t border-rule px-3 py-2.5 text-steel">
                    {String(shotIdx + 1).padStart(2, "0")} · {shot.label}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
