import React from "react";
import { Play, RotateCcw, Home } from "lucide-react";

export default function PauseMenu({ onResume, onRestart, onHome }) {
  return (
    <div className="ml-overlay" data-testid="pause-menu" role="dialog" aria-modal="true">
      <div className="ml-overlay__panel ml-overlay__panel--sm">
        <p className="ml-overlay__eyebrow">// process suspended</p>
        <h2 className="ml-overlay__title" data-glitch="PAUSED">PAUSED</h2>
        <p className="ml-overlay__body">
          Timer halted. The 404s wait patiently. Take a breath.
        </p>
        <div className="ml-overlay__actions">
          <button data-testid="pause-resume-btn" onClick={onResume} className="ml-btn ml-btn--primary">
            <Play size={16} /> resume
          </button>
          <button data-testid="pause-restart-btn" onClick={onRestart} className="ml-btn ml-btn--ghost">
            <RotateCcw size={16} /> restart
          </button>
          <button data-testid="pause-home-btn" onClick={onHome} className="ml-btn ml-btn--ghost">
            <Home size={16} /> quit
          </button>
        </div>
      </div>
    </div>
  );
}
