# CogFun - App Flow & State

## 1. Home Page (Mode Selection)
- Entry point for the application.
- Two primary routes: **Parent Mode** and **Kid Mode**.
- Clean, focused layout to start the experience.

## 2. Parent Dashboard (Logging)
- **Goal**: Zero-friction logging of successes.
- **Header**: Features the child's profile badge (Bar). Clicking it navigates to the Kid Dashboard.
- **Agent Grid**: Tap on Mr. Stop (Blue), Mr. Check (Orange), or Mr. Effort (Green) to log a success.
- **Preset Drawer**: Slide-up sheet with agent-specific phrases and a "Custom Note" input field.
- **Success Overlay**: Instant visual feedback when a note is logged.

## 3. Kid Dashboard (Rewards)
- **Goal**: Visualizing achievements and motivation.
- **Header**: Standardized navigation bar with:
    - **Back Button**: Returns to Parent Dashboard (if navigated from there).
    - **Profile Badge**: Consistent child identity.
    - **Gem Road Button**: Shows current gem count and leads to the achievement road.
- **Unread Hero**: Large card showing the number of "New Notes" with a gem pack visual.
- **Notes Feed**: List of unread successes that can be tapped to acknowledge (mark as read).
- **Lifetime Stats**: Per-agent success counters with award icons.
- **History Link**: "View All" button at the bottom for full note history.

## 4. Gem Road (Achievements)
- **Goal**: Long-term progress tracking.
- **Vertical Road**: A scrolling path with milestone gift boxes (every 20 gems).
- **Progress Pointer**: Shows exactly where the child is on the road.
- **RTL Support**: Standard Hebrew navigation (Back button on the right).

## 5. All Notes History
- Full vertical list of all historical success notes.
- Includes status indicators for read/unread items.
- Unified header for consistent navigation back to the dashboard.
