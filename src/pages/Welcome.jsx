import React, { useState } from "react";
import { Play, HelpCircle, Trophy, Cpu, Trash2 } from "lucide-react";
import { LEVELS } from "@/utils/deck";
import HowToPlay from "@/components/HowToPlay";

function fmt(sec) {
  if (!sec) return "--:--";
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Welcome({ bestTimes, onStart, onClearBest }) {
  const [howToOpen, setHowToOpen] = useState(false);
  const [selected, setSelected] = useState(1);

  return (
    <div className="ml-welcome" data-testid="welcome-screen">
      {/* HERO */}
      <header className="ml-hero">
        <div className="ml-hero__meta">
          <span className="ml-tag">v1.0 · offline · react</span>
          <span className="ml-tag ml-tag--live">
            <span className="ml-tag__dot" /> online
          </span>
        </div>

        <h1 className="ml-title" data-glitch="MemoryLeak">
          <span className="ml-title__lead">Memory</span>
          <span className="ml-title__leak">Leak</span>
          <span className="ml-title__404">404</span>
        </h1>

        <p className="ml-tagline">
          A memory game where your brain is the garbage collector.
          Match the corrupted <span className="ml-hi">emoji</span> pairs before the
          system <span className="ml-hi ml-hi--pink">leaks</span>.
        </p>

        <div className="ml-hero__cta">
          <button
            data-testid="welcome-start-btn"
            onClick={() => onStart(selected)}
            className="ml-btn ml-btn--primary ml-btn--lg"
          >
            <Play size={18} /> start · {LEVELS.find((l) => l.id === selected)?.name}
          </button>
          <button
            data-testid="welcome-howto-btn"
            onClick={() => setHowToOpen(true)}
            className="ml-btn ml-btn--ghost ml-btn--lg"
          >
            <HelpCircle size={18} /> how to play
          </button>
        </div>
      </header>

      {/* LEVEL SELECT */}
      <section className="ml-section" aria-labelledby="lvl-heading">
        <div className="ml-section__head">
          <h2 id="lvl-heading" className="ml-section__title">
            <Cpu size={16} /> select difficulty
          </h2>
          <p className="ml-section__sub">
            5 stages of increasing chaos. Your best time is stored locally.
          </p>
        </div>

        <div className="ml-levels" data-testid="level-grid">
          {LEVELS.map((lvl) => {
            const active = selected === lvl.id;
            const best = bestTimes[lvl.id];
            return (
              <button
                key={lvl.id}
                data-testid={`level-card-${lvl.id}`}
                onClick={() => setSelected(lvl.id)}
                className={`ml-lvl ${active ? "ml-lvl--active" : ""}`}
                aria-pressed={active}
              >
                <div className="ml-lvl__top">
                  <span className="ml-lvl__id">0{lvl.id}</span>
                  <span className="ml-lvl__pairs">{lvl.pairs} pairs</span>
                </div>
                <div className="ml-lvl__name">{lvl.name}</div>
                <div className="ml-lvl__desc">{lvl.desc}</div>
                <div className="ml-lvl__best">
                  <Trophy size={12} className="opacity-70" />
                  <span data-testid={`level-best-${lvl.id}`}>{fmt(best)}</span>
                </div>
                {active && <span className="ml-lvl__marker" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        <div className="ml-welcome__foot">
          <button
            data-testid="welcome-clear-btn"
            onClick={onClearBest}
            className="ml-btn ml-btn--muted ml-btn--sm"
            title="reset all local best times"
          >
            <Trash2 size={13} /> reset best times
          </button>
          <span className="ml-foot-note">
            built with react · no accounts · no tracking of scores
          </span>
        </div>
      </section>

      {howToOpen && <HowToPlay onClose={() => setHowToOpen(false)} />}
    </div>
  );
}
