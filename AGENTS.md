# Project: CogFun Digital Success Box

## UX & Design Language

- **Vibe:** "Playful Productivity." Clean, rounded-2xl corners, soft pastel backgrounds, and large touch targets for ease of use.
- **Parent Experience:** "Zero-Friction." Log a success in < 3 seconds using agent presets or custom text.
- **Kid Experience:** "Achievement Unlocked." Visual-first dashboard featuring character avatars, total success counts, and unread note stacks.
- **Color Palette:**
  - **Mr. Stop:** Indigo/Blue (Calming/Thinking).
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
    - Access full history view for all notes (read/unread).

## Technical Implementation

- **Frontend:** React + Vite + TypeScript.
- **Database:** Firebase Firestore (Real-time updates).
- **Styling:** Tailwind CSS + Framer Motion (Transitions).
- **Icons:** Lucide-React.
- **Architecture:** Feature-based modular structure with path aliases (@lib, @components).
- **Localization:** Full RTL/Hebrew support.
