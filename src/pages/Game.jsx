import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Card from "@/components/Card";
import HUD from "@/components/HUD";
import PauseMenu from "@/components/PauseMenu";
import GameOver from "@/components/GameOver";
import Toast from "@/components/Toast";
import { buildDeck, LEVELS, calcStars } from "@/utils/deck";

const MATCH_MSGS = [
  "match ok. block restored",
  "pair aligned :: +1",
  "checksum passed",
  "memory recovered",
  "sync :: locked",
];
const MISS_MSGS = [
  "memory leak detected",
  "checksum failed",
  "misaligned block",
  "nope. reroute",
  "segfault avoided",
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function Game({ levelId, best, onWin, onHome, onLevelChange }) {
  const level = useMemo(
    () => LEVELS.find((l) => l.id === levelId) || LEVELS[0],
    [levelId],
  );

  const [deck, setDeck] = useState(() => buildDeck(level.pairs));
  const [selected, setSelected] = useState([]); // ids of currently flipped-not-matched
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [won, setWon] = useState(false);
  const [toast, setToast] = useState(null);
  const [locking, setLocking] = useState(false); // brief lock during 2-card compare

  const toastTimer = useRef(null);
  const compareTimer = useRef(null);

  // Reset when level changes
  useEffect(() => {
    setDeck(buildDeck(level.pairs));
    setSelected([]);
    setMoves(0);
    setMatchedCount(0);
    setSeconds(0);
    setPaused(false);
    setWon(false);
    setToast(null);
    setLocking(false);
  }, [level]);

  // Timer
  useEffect(() => {
    if (paused || won) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [paused, won]);

  // Cleanup timers on unmount
  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    if (compareTimer.current) clearTimeout(compareTimer.current);
  }, []);

  // ESC to toggle pause (ignored once the game is won)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !won) {
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [won]);

  const showToast = useCallback((kind) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    const msg = kind === "match" ? pick(MATCH_MSGS) : pick(MISS_MSGS);
    setToast({ id: Date.now(), kind, msg });
    toastTimer.current = setTimeout(() => setToast(null), 1200);
  }, []);

  const handleFlip = useCallback(
    (id) => {
      if (paused || won || locking) return;
      // Prevent flipping a card that's already flipped/matched or a 3rd card
      const card = deck.find((c) => c.id === id);
      if (!card || card.isFlipped || card.isMatched) return;
      if (selected.length >= 2) return;

      const nextDeck = deck.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
      const nextSelected = [...selected, id];
      setDeck(nextDeck);
      setSelected(nextSelected);

      if (nextSelected.length === 2) {
        setMoves((m) => m + 1);
        const [aId, bId] = nextSelected;
        const a = nextDeck.find((c) => c.id === aId);
        const b = nextDeck.find((c) => c.id === bId);
        const isMatch = a.pairKey === b.pairKey;

        if (isMatch) {
          // brief delay so player sees both, then mark matched
          setLocking(true);
          compareTimer.current = setTimeout(() => {
            setDeck((d) =>
              d.map((c) =>
                c.id === aId || c.id === bId
                  ? { ...c, isMatched: true, isFlipped: true }
                  : c,
              ),
            );
            setMatchedCount((n) => n + 1);
            setSelected([]);
            setLocking(false);
            showToast("match");
          }, 380);
        } else {
          setLocking(true);
          compareTimer.current = setTimeout(() => {
            setDeck((d) =>
              d.map((c) =>
                c.id === aId || c.id === bId ? { ...c, isFlipped: false } : c,
              ),
            );
            setSelected([]);
            setLocking(false);
            showToast("miss");
          }, 780);
        }
      }
    },
    [deck, selected, paused, won, locking, showToast],
  );

  // Win detection
  useEffect(() => {
    if (matchedCount === level.pairs && !won) {
      setWon(true);
      const stars = calcStars(level.pairs, moves);
      // Give parent a chance to persist best time
      onWin({
        levelId: level.id,
        seconds,
        moves,
        stars,
      });
    }
  }, [matchedCount, level.pairs, level.id, moves, seconds, won, onWin]);

  const restart = () => {
    setDeck(buildDeck(level.pairs));
    setSelected([]);
    setMoves(0);
    setMatchedCount(0);
    setSeconds(0);
    setPaused(false);
    setWon(false);
    setToast(null);
    setLocking(false);
  };

  const goNextLevel = () => {
    const nextId = level.id + 1;
    if (nextId <= LEVELS.length) onLevelChange(nextId);
  };

  const stars = calcStars(level.pairs, moves);
  const isNewBest = won && (!best || seconds < best);
  const hasNext = level.id < LEVELS.length;

  // Show all cards face-up during pause? No — hide them (keep UX clear).
  const boardHidden = paused && !won;

  return (
    <div className="ml-game" data-testid="game-screen">
      <HUD
        levelName={level.name}
        moves={moves}
        seconds={seconds}
        matched={matchedCount}
        totalPairs={level.pairs}
        best={best}
        paused={paused}
        onPauseToggle={() => setPaused((p) => !p)}
        onRestart={restart}
        onHome={onHome}
      />

      <div
        className={`ml-board ${boardHidden ? "ml-board--hidden" : ""}`}
        style={{ "--cols": level.cols }}
        data-testid="board"
      >
        {deck.map((card, i) => (
          <Card
            key={card.id}
            card={card}
            index={i}
            disabled={paused || won || locking}
            onFlip={handleFlip}
          />
        ))}
      </div>

      <Toast toast={toast} />

      {paused && !won && (
        <PauseMenu
          onResume={() => setPaused(false)}
          onRestart={restart}
          onHome={onHome}
        />
      )}

      {won && (
        <GameOver
          levelName={level.name}
          moves={moves}
          seconds={seconds}
          stars={stars}
          isNewBest={isNewBest}
          hasNextLevel={hasNext}
          onNext={goNextLevel}
          onReplay={restart}
          onHome={onHome}
        />
      )}
    </div>
  );
}
