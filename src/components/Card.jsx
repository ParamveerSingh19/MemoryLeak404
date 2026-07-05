import React from "react";
export default function Card({ card, onFlip, disabled, index }) {
  const { isFlipped, isMatched, emoji, id } = card;
  const flipped = isFlipped || isMatched;

  return (
    <button
      data-testid={`card-${index}`}
      onClick={() => !disabled && !flipped && onFlip(id)}
      disabled={disabled || flipped}
      className={`ml-card group relative aspect-square w-full select-none rounded-md
        ${isMatched ? "ml-card--matched" : ""}
      `}
      aria-label={flipped ? `card ${index + 1} showing ${emoji}` : `card ${index + 1} face down`}
    >
      <span className="ml-card__inner" data-flipped={flipped}>
        {/* Back of the card — the "encrypted" side */}
        <span className="ml-card__face ml-card__back">
          <span className="ml-card__back-grid" aria-hidden="true" />
          <span className="ml-card__back-label">404</span>
          <span className="ml-card__back-sub" aria-hidden="true">MEM_?</span>
        </span>
        {/* Front of the card — the emoji */}
        <span className="ml-card__face ml-card__front">
          <span className="ml-card__emoji" role="img">{emoji}</span>
        </span>
      </span>
    </button>
  );
}
