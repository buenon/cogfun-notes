# Project: CogFun Digital Success Box

## UX & Design Language

- **Vibe:** "Playful Productivity." Clean, rounded-2xl corners, soft pastel backgrounds, and large touch targets for ease of use.
- **Parent Experience:** "Zero-Friction." Log a success in < 3 seconds using agent presets or custom text.
- **Kid Experience:** "Achievement Unlocked." Visual-first dashboard featuring character avatars, total success counts, and unread note stacks.
- **Color Palette:**
  - **Mr. Stop:** Rose/Red (Stopping/Thinking).
  - **Mr. Check:** Orange/Amber (Observant/Checking).
  - **Mr. Effort:** Emerald/Green (High-Energy/Persistence).
- **Character Assets:** Cute 2D character stickers (Mr. Stop, Mr. Check, Mr. Effort).

## Core User Flows

1. **Dashboard Entry:** Home page for mode selection (Parent/Kid).
2. **Parent Flow:** Select Agent -> Choose Preset -> Success Overlay.
3. **Kid Flow:**
    - View "New Notes" count and list of unread successes.
    - Mark notes as read (removes them from the immediate "New" list).
    - View total successes per agent (Stop, Check, Effort).
    - **Gem Road:** Track long-term progress on an interactive achievement path.
    - **History:** Access full history view for all notes from the dashboard or gem road.

## Technical Implementation

- **Frontend:** React + Vite + TypeScript.
- **Database:** Firebase Firestore (Real-time updates).
- **Styling:** Tailwind CSS + Framer Motion (Transitions).
- **Icons:** Lucide-React.
- **Architecture:** Feature-based modular structure with path aliases (@lib, @components). Standardized navigation via `NavigationHeader` and `ProfileBadge`.
- **Localization:** Full RTL/Hebrew support.
  - **Dictionary Rules:** All user-facing strings in component or page code (labels, button texts, page headers, etc.) must go in `src/lib/dictionary.ts` under the exported constant `D`. Do not hardcode user-facing strings in components or pages.
  - **Data Source Exception:** Static raw data files (such as `src/lib/prizes.ts` or agent definition presets) are kept with their native strings and do not need to go in the dictionary.
  - **Imports:** Import `D` using the `@lib` alias in components/pages.

