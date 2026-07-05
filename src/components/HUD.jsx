import React from "react";
import { Pause, Play, RotateCcw, Home, Timer, MousePointerClick, Trophy } from "lucide-react";

// Format seconds as MM:SS
function fmt(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function HUD({
  levelName,
  moves,
  seconds,
  matched,
  totalPairs,
  best,
  paused,
  onPauseToggle,
  onRestart,
  onHome,
}) {
  const pct = totalPairs === 0 ? 0 : Math.round((matched / totalPairs) * 100);

  return (
    <div className="ml-hud" data-testid="hud">
      <div className="ml-hud__row">
        <div className="ml-hud__level">
          <span className="ml-hud__level-tag">LVL</span>
          <span className="ml-hud__level-name" data-testid="hud-level">{levelName}</span>
        </div>

        <div className="ml-hud__stats">
          <span className="ml-hud__stat" title="Elapsed time" data-testid="hud-timer">
            <Timer size={14} className="opacity-70" />
            <span className="ml-hud__stat-num">{fmt(seconds)}</span>
          </span>
          <span className="ml-hud__stat" title="Moves" data-testid="hud-moves">
            <MousePointerClick size={14} className="opacity-70" />
            <span className="ml-hud__stat-num">{moves.toString().padStart(3, "0")}</span>
          </span>
          <span className="ml-hud__stat ml-hud__stat--best" title="Best time" data-testid="hud-best">
            <Trophy size={14} className="opacity-70" />
            <span className="ml-hud__stat-num">{best ? fmt(best) : "--:--"}</span>
          </span>
        </div>

        <div className="ml-hud__actions">
          <button
            data-testid="hud-pause-btn"
            onClick={onPauseToggle}
            className="ml-btn ml-btn--ghost"
            aria-label={paused ? "resume" : "pause"}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button
            data-testid="hud-restart-btn"
            onClick={onRestart}
            className="ml-btn ml-btn--ghost"
            aria-label="restart level"
          >
            <RotateCcw size={16} />
          </button>
          <button
            data-testid="hud-home-btn"
            onClick={onHome}
            className="ml-btn ml-btn--ghost"
            aria-label="go home"
          >
            <Home size={16} />
          </button>
        </div>
      </div>

      <div className="ml-hud__bar" aria-hidden="true">
        <div className="ml-hud__bar-fill" style={{ width: `${pct}%` }} />
        <span className="ml-hud__bar-label">
          {matched}/{totalPairs} PAIRS RESTORED · {pct}%
        </span>
      </div>
    </div>
  );
}
