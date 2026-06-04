# Project Memory: CogFun App

## Current Status (May 2026)

- [x] **Core Architecture**: Vite + TypeScript + Path Aliases.
- [x] **Data Layer**: Firebase Firestore with real-time `onSnapshot` updates.
- [x] **UI Standardization**: Unified `NavigationHeader` and `ProfileBadge` components.
- [x] **Parent Flow**: Agent grid, preset drawer, and custom note entry.
- [x] **Kid Flow**: Unread counts, agent stats, and "Mark as Read" functionality.
- [x] **Gamification**: Interactive Gem Road with milestones and progress tracking.
- [x] **History**: Dedicated "All Notes" view with read/unread filtering and Gem Road integration.
- [x] **Localization**: Full Hebrew RTL support for all layouts, navigation, and dictionary-driven text. No hardcoded user-facing strings.
- [x] **Code Quality**: Passing `eslint` and `tsc` build with zero errors. Uses `verbatimModuleSyntax: true` for clean type-safe imports.

## Key Technical Decisions

- **NavigationHeader**: A flexible component handling leading (Back/Home), center (Identity), and trailing (Utility) slots, optimized for RTL.
- **ProfileBadge**: Interactive identity component that standardizes how the kid's name/avatar is displayed.
- **Gems System**: Dynamic gem pack images based on the number of unread/total notes.
- **Dev Tools**: Global `generateNotes` and `clearNotes` exposed in the console for testing.
- **Dictionary Centralization**: All user-facing UI strings in components and pages are defined in `src/lib/dictionary.ts` under a central exported object `D`. Import `D` via the `@lib` alias. Static data source files (like `src/lib/prizes.ts` or agent presets) keep their native strings directly in code.


## Recent UI Refinements

- **Standardized Back Buttons**: Unified sizing (`p-2.5`) and icons (`ArrowRight` for Hebrew).
- **Icon Polish**: Replaced generic "Drawer" icons with playful Gem assets.
- **Animation Tweak**: Removed excessive animations from the profile badge to keep the UI snappy.
- **Build Fix**: Standardized type-only imports (`import type`) to satisfy TypeScript's `verbatimModuleSyntax` rule.
- **Dead Code Cleanup**: Removed unused assets and generic boilerplate.

## Next Steps

- [ ] **Multi-Profile Support**: Allow switching between different children.
- [ ] **Parent Controls**: Ability to delete or edit logged notes.
- [ ] **Push Notifications**: Notify kid devices when a new success is logged.
- [ ] **PWA Refinement**: Ensure offline support and home-screen install experience is seamless.
- [ ] **Performance**: Memoize heavy list components for large success histories.
