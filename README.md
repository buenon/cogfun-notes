# CogFun - Digital Success Box

A playful productivity app for kids and parents to track daily "successes" based on the CogFun methodology.

## 🚀 Features

- **Parent Dashboard**: Quick logging of successes using agent-specific presets or custom notes.
- **Kid Dashboard**: Visual dashboard with gem rewards, agent stats, and unread note stacks.
- **Gem Road**: Interactive achievement road tracking lifetime successes.
- **Real-time Updates**: Powered by Firebase Firestore for instant synchronization across devices.
- **RTL Support**: Full Hebrew localization and layout.

## 🛠️ Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Icons**: Lucide-React
- **Database**: Firebase Firestore

## 📦 Getting Started

1. **Clone the repo**
2. **Install dependencies**:
   ```bash
   yarn install
   ```
3. **Configure Environment**:
   Create a `.env` file in the root with your Firebase configuration.
4. **Run development server**:
   ```bash
   yarn dev
   ```

## 🛠️ Dev Tools

When running in development mode, you can use the following commands in the browser console:
- `generateNotes(count)`: Generate mock success notes.
- `clearNotes()`: Clear all notes from the current collection.

## 📁 Project Structure

- `src/components`: Reusable UI components.
- `src/pages`: Main application screens.
- `src/hooks`: Custom React hooks (e.g., `useNotes`).
- `src/lib`: Utilities, constants, and Firebase configuration.
- `src/assets`: Images and icons.
