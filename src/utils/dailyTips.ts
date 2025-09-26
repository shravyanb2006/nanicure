// Daily wellness tips that rotate
const dailyTips = [
  "Breathe, smile, and let go 🌿",
  "Sip, stretch, and shine ☀️",
  "Herbal hugs for modern lives 🤗",
  "Start with gratitude, end with peace 🙏",
  "Listen to your body, it knows best 💚",
  "Small steps create big changes, beta 🚶‍♀️",
  "Warm water, warm heart, warm healing 💛",
  "Nature's wisdom flows through you 🌸",
  "Rest is productive, stress is not 😌",
  "Your health is your greatest wealth 💎",
  "Turmeric today keeps illness away 🧡",
  "Mindful moments make magical days ✨",
  "Nani's love heals from within 💕",
  "Kindness to yourself is the best medicine 🌺",
  "Traditional wisdom, modern wellness 🕉️",
  "Every sunrise brings new healing hope 🌅",
  "Gentle remedies for gentle souls 🦋",
  "You are worthy of wellness and joy 🌟",
  "Simple living, healthy loving 🏡",
  "Trust the process, embrace the journey 🛤️"
];

export function getDailyTip(): string {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return dailyTips[dayOfYear % dailyTips.length];
}

export function getRandomTip(): string {
  return dailyTips[Math.floor(Math.random() * dailyTips.length)];
}