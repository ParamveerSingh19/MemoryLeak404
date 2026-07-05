import React from "react";
import { RotateCcw, Home, ArrowRight, Star } from "lucide-react";

function fmt(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function GameOver({
  levelName,
  moves,
  seconds,
  stars,
  isNewBest,
  hasNextLevel,
  onNext,
  onReplay,
  onHome,
}) {
  return (
    <div className="ml-overlay" data-testid="game-over" role="dialog" aria-modal="true">
      <div className="ml-overlay__panel">
        <p className="ml-overlay__eyebrow">// leak patched</p>
        <h2 className="ml-overlay__title" data-glitch="SYSTEM_RESTORED">SYSTEM_RESTORED</h2>
        <p className="ml-overlay__body">
          You reassembled all pairs in <span className="ml-hi">{levelName}</span>.
          {isNewBest && <span className="ml-hi ml-hi--pink"> · NEW BEST TIME ★</span>}
        </p>

        <div className="ml-stars" data-testid="game-over-stars" aria-label={`${stars} out of 3 stars`}>
          {[1, 2, 3].map((n) => (
            <Star
              key={n}
              size={40}
              strokeWidth={1.5}
              className={`ml-star ${n <= stars ? "ml-star--on" : ""}`}
              fill={n <= stars ? "currentColor" : "none"}
            />
          ))}
        </div>

        <dl className="ml-stat-grid">
          <div>
            <dt>time</dt>
            <dd data-testid="game-over-time">{fmt(seconds)}</dd>
          </div>
          <div>
            <dt>moves</dt>
            <dd data-testid="game-over-moves">{moves}</dd>
          </div>
          <div>
            <dt>rank</dt>
            <dd>{stars === 3 ? "S" : stars === 2 ? "A" : "B"}</dd>
          </div>
        </dl>

        <div className="ml-overlay__actions">
          {hasNextLevel && (
            <button data-testid="gameover-next-btn" onClick={onNext} className="ml-btn ml-btn--primary">
              next level <ArrowRight size={16} />
            </button>
          )}
          <button data-testid="gameover-replay-btn" onClick={onReplay} className="ml-btn ml-btn--ghost">
            <RotateCcw size={16} /> replay
          </button>
          <button data-testid="gameover-home-btn" onClick={onHome} className="ml-btn ml-btn--ghost">
            <Home size={16} /> home
          </button>
        </div>
      </div>
    </div>
  );
}
