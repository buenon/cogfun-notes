# Project Memory: CogFun App

## Current Status

- [x] Vite + TS Scaffolded.
- [x] Firebase Firestore Integrated (Real-time data persistence).
- [x] Path Aliases Configured (`@lib`, `@components`, `@hooks`, `@pages`).
- [x] Core UI Components Built (`BottomSheet`, `AgentGrid`, `SuccessOverlay`).
- [x] Parent Dashboard (Zero-Friction logging).
- [x] Kid Dashboard (Success viewing & Stats).
- [x] RTL Support (Hebrew localization).

## Functional Requirements

- **Profiles:** Mock profile for "Bar" is active. Multi-profile support is in the roadmap.
- **Presets:** CogFun preset lists for Mr. Stop, Mr. Check, and Mr. Effort are fully implemented.
- **The "Box":** Kid dashboard displays "new" notes and lifetime counts.
- **Real-time:** Updates reflect instantly across devices via Firestore `onSnapshot`.

## Next Steps

- [x] Kid Dashboard: Unread count, agent stats, and unread notes list.
- [x] Kid Dashboard: "Mark as Read" functionality.
- [x] Kid Dashboard: Full history view (All Notes page).

## Functional Requirements

- **Profiles:** Mock profile for "Bar" is active. Multi-profile support is in the roadmap.
- **Presets:** CogFun preset lists for Mr. Stop, Mr. Check, and Mr. Effort are fully implemented.
- **The "Box":** Kid dashboard displays "new" notes and lifetime counts. "Mark as Read" removes notes from the primary list.
- **History:** Full list of all historical successes available in a dedicated view.
- **Real-time:** Updates reflect instantly across devices via Firestore `onSnapshot`.

## Next Steps

- [ ] Add "Custom Note" entry in Parent Dashboard.
- [ ] Implement Multi-Kid profile selection.
- [ ] Performance optimization: Memoize components and optimize Firestore queries.
- [ ] Polish animations: Enhancing the "sliding into the box" experience with Framer Motion.
