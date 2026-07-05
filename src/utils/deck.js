export const EMOJI_POOL = [
  // fruits
  "🍎",
  "🍌",
  "🍇",
  "🍓",
  "🍒",
  "🍑",
  "🍍",
  "🥝",
  "🍉",
  "🥑",
  "🥕",
  "🌽",
  // smileys / faces
  "😀",
  "😎",
  "🤖",
  "👻",
  "👽",
  "🤡",
  "🥳",
  "🤯",
  "😻",
  "🫠",
  "🤠",
  "🥸",
  // animals
  "🐶",
  "🐱",
  "🦁",
  "🐼",
  "🦊",
  "🐸",
  "🐵",
  "🐧",
  "🐙",
  "🦄",
  "🐢",
  "🦉",
  // tech / space / misc
  "🚀",
  "👾",
  "💾",
  "💿",
  "🕹️",
  "⚡",
  "🔮",
  "🧠",
  "🌈",
  "🌸",
  "🍕",
  "🎧",
];

export const LEVELS = [
  {
    id: 1,
    name: "BYTE",
    pairs: 6,
    cols: 4,
    timeBonus: 60,
    desc: "warm-up subroutine",
  },
  {
    id: 2,
    name: "KILO",
    pairs: 8,
    cols: 4,
    timeBonus: 80,
    desc: "compile & recall",
  },
  {
    id: 3,
    name: "MEGA",
    pairs: 10,
    cols: 5,
    timeBonus: 110,
    desc: "stack overflow",
  },
  {
    id: 4,
    name: "GIGA",
    pairs: 12,
    cols: 6,
    timeBonus: 140,
    desc: "kernel panic",
  },
  {
    id: 5,
    name: "TERA_404",
    pairs: 15,
    cols: 6,
    timeBonus: 180,
    desc: "the memory leak",
  },
];

// Fisher–Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildDeck(pairs) {
  const chosen = shuffle(EMOJI_POOL).slice(0, pairs);
  const deck = [];
  chosen.forEach((emoji, i) => {
    deck.push({
      id: `${i}-a`,
      pairKey: i,
      emoji,
      isFlipped: false,
      isMatched: false,
    });
    deck.push({
      id: `${i}-b`,
      pairKey: i,
      emoji,
      isFlipped: false,
      isMatched: false,
    });
  });
  return shuffle(deck);
}

export function calcStars(pairs, moves) {
  if (moves <= Math.ceil(pairs * 1.5)) return 3;
  if (moves <= pairs * 2) return 2;
  return 1;
}
