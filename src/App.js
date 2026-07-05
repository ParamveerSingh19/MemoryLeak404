import React, { useEffect, useState, useCallback } from "react";
import "@/App.css";
import Welcome from "@/pages/Welcome";
import Game from "@/pages/Game";

const BEST_KEY = "memoryleak404::best-times::v1";

function loadBest() {
  try {
    const raw = localStorage.getItem(BEST_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveBest(map) {
  try {
    localStorage.setItem(BEST_KEY, JSON.stringify(map));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

function App() {
  const [screen, setScreen] = useState("welcome"); // "welcome" | "game"
  const [levelId, setLevelId] = useState(1);
  const [bestTimes, setBestTimes] = useState(() => loadBest());

  // Persist best times whenever they change
  useEffect(() => {
    saveBest(bestTimes);
  }, [bestTimes]);

  const handleStart = useCallback((id) => {
    setLevelId(id);
    setScreen("game");
  }, []);

  const handleHome = useCallback(() => setScreen("welcome"), []);

  const handleWin = useCallback(({ levelId: lid, seconds }) => {
    setBestTimes((prev) => {
      const current = prev[lid];
      if (!current || seconds < current) {
        return { ...prev, [lid]: seconds };
      }
      return prev;
    });
  }, []);

  const handleLevelChange = useCallback((id) => setLevelId(id), []);

  const handleClearBest = useCallback(() => {
    if (typeof window !== "undefined") {
      const ok = window.confirm(
        "Reset all best times on this device? This cannot be undone.",
      );
      if (!ok) return;
    }
    setBestTimes({});
  }, []);

  return (
    <div className="ml-app" data-testid="ml-app">
      {/* Layered atmospheric background */}
      <div className="ml-bg-grid" aria-hidden="true" />
      <div className="ml-bg-scan" aria-hidden="true" />
      <div className="ml-bg-noise" aria-hidden="true" />
      <div className="ml-bg-glow ml-bg-glow--cyan" aria-hidden="true" />
      <div className="ml-bg-glow ml-bg-glow--magenta" aria-hidden="true" />

      <main className="ml-main">
        {screen === "welcome" && (
          <Welcome
            bestTimes={bestTimes}
            onStart={handleStart}
            onClearBest={handleClearBest}
          />
        )}
        {screen === "game" && (
          <Game
            key={levelId}
            levelId={levelId}
            best={bestTimes[levelId]}
            onHome={handleHome}
            onWin={handleWin}
            onLevelChange={handleLevelChange}
          />
        )}
      </main>

      <footer className="ml-footer" aria-hidden="true">
        <span>
          &gt; memoryleak404.sys · handcrafted with react · run local · press
          ESC for pause
        </span>
      </footer>
    </div>
  );
}

export default App;
