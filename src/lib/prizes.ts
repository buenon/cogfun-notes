import type { Prize } from "./types";

export const PRIZES: Record<number, Prize> = {
  20: {
    checkpoint: 20,
    title: "30 דקות זמן מסך",
    description: "זמן מסך מיוחד למשחק או צפייה בתוכנית אהובה",
    emoji: "📱",
  },
  40: {
    checkpoint: 40,
    title: "לבחור סרט משפחתי",
    description: "אתה בוחר במה כולם יצפו בערב הסרטים המשפחתי הבא!",
    emoji: "🎬",
  },
  60: {
    checkpoint: 60,
    title: "קינוח מיוחד או גלידה",
    description: "יוצאים לגלידריה או מכינים קינוח מיוחד בבית!",
    emoji: "🍦",
  },
  80: {
    checkpoint: 80,
    title: "פטור ממטלה יומית",
    description: "פטור אחד מסידור השולחן או פינוי המדיח",
    emoji: "🎫",
  },
  100: {
    checkpoint: 100,
    title: "חפיסת קלפים או צעצוע קטן",
    description: "חפיסת קלפי פוקימון או הפתעה קטנה אחרת!",
    emoji: "🧸",
  },
  120: {
    checkpoint: 120,
    title: "לישון מאוחר בחצי שעה",
    description: "נשארים ערים עוד 30 דקות לקריאה, משחק או שיחה",
    emoji: "⏰",
  },
  140: {
    checkpoint: 140,
    title: "מחנה ולינה בסלון",
    description: "בונים מבצר שמיכות וישנים יחד בסלון!",
    emoji: "⛺",
  },
  160: {
    checkpoint: 160,
    title: "מילקשייק או פחית שתייה לבחירה",
    description: "פחית משקה קל או מילקשייק טעים במיוחד",
    emoji: "🥤",
  },
  180: {
    checkpoint: 180,
    title: "השכרת סרט או משחק דיגיטלי",
    description: "בחירת סרט להשכרה או משחק קטן לנייד",
    emoji: "🎮",
  },
  200: {
    checkpoint: 200,
    title: "בילוי 1-על-1 עם אמא או אבא",
    description: "באולינג, קיר טיפוס, או פעילות כיפית אחרת לבחירתך!",
    emoji: "🎡",
  },
};
