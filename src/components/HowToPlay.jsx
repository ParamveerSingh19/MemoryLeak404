import React from "react";
import { X } from "lucide-react";

export default function HowToPlay({ onClose }) {
  return (
    <div className="ml-overlay" data-testid="how-to-play" role="dialog" aria-modal="true">
      <div className="ml-overlay__panel">
        <button
          data-testid="howto-close-btn"
          onClick={onClose}
          className="ml-overlay__close"
          aria-label="close"
        >
          <X size={18} />
        </button>
        <h2 className="ml-overlay__title" data-glitch="HOW_TO_PLAY">HOW_TO_PLAY</h2>

        <ol className="ml-howto">
          <li>
            <span className="ml-howto__num">01</span>
            <div>
              <b>Flip two cards</b> at a time. Behind each 404 hides a corrupted emoji.
            </div>
          </li>
          <li>
            <span className="ml-howto__num">02</span>
            <div>
              <b>Match the pair</b> to restore that memory block. A green pulse confirms
              a match — a magenta glitch means a miss.
            </div>
          </li>
          <li>
            <span className="ml-howto__num">03</span>
            <div>
              <b>Clear the board</b> before your patience leaks. Fewer moves and less
              time = more stars.
            </div>
          </li>
          <li>
            <span className="ml-howto__num">04</span>
            <div>
              <b>5 levels</b> await, from BYTE to TERA_404. Your best times are saved
              locally on this device.
            </div>
          </li>
        </ol>

        <div className="ml-overlay__actions">
          <button data-testid="howto-got-it-btn" onClick={onClose} className="ml-btn ml-btn--primary">
            got it
          </button>
        </div>
      </div>
    </div>
  );
}
