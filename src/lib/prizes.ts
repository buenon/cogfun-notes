import type { Prize } from "./types";

export const PRIZES: Record<number, Prize> = {
  20: {
    checkpoint: 20,
    title: "מילקשייק",
    description: "מילקשייק טעים במיוחד",
    emoji: "🥤",
  },
  40: {
    checkpoint: 40,
    title: "30 דקות זמן מסך",
    description: "זמן מסך מיוחד למשחק או צפייה בתוכנית אהובה",
    emoji: "📱",
  },
  60: {
    checkpoint: 60,
    title: "לבחור סרט משפחתי",
    description: "אתה בוחר במה כולם יצפו בערב הסרטים המשפחתי הבא!",
    emoji: "🎬",
  },
  80: {
    checkpoint: 80,
    title: "משחק חיי שרה משפחתי",
    description: "בר, תום, אמא ואבא משחקים ביחד חיי שרה",
    emoji: "🏐",
  },
  100: {
    checkpoint: 100,
    title: "לישון מאוחר בחצי שעה",
    description: "נשארים ערים עוד 30 דקות לקריאה, משחק או שיחה",
    emoji: "⏰",
  },
  120: {
    checkpoint: 120,
    title: "קינוח מיוחד או גלידה",
    description: "יוצאים לגלידריה או מכינים קינוח מיוחד בבית!",
    emoji: "🍦",
  },
  140: {
    checkpoint: 140,
    title: "צעצוע קטן",
    description: "20 שקלים לקנות צעצוע בחנות ליד הבית",
    emoji: "🤖",
  },
  160: {
    checkpoint: 160,
    title: "חטיף פרימיום",
    description: "חטיף גדול או מיוחד שלא קונים כל יום",
    emoji: "🍩",
  },
  180: {
    checkpoint: 180,
    title: "לישון באוהל בגינה",
    description: "מקימים אוהל בחצר וישנים חוויה של קמפינג אמיתי!",
    emoji: "⛺",
  },
  200: {
    checkpoint: 200,
    title: "בילוי 1-על-1 עם אמא או אבא",
    description: "באולינג, קיר טיפוס, או פעילות כיפית אחרת לבחירתך!",
    emoji: "🎡",
  },
};