# NovaChat — Setup Guide

This adds the actual application on top of the original scaffold: authentication,
real-time 1:1 chat, typing indicators, and online presence, wired to Supabase.

## 1. Create a Supabase project

Go to https://supabase.com, create a project, then grab your **Project URL** and
**anon public key** from Project Settings → API.

## 2. Run the database schema

Open the Supabase SQL editor and run `supabase/schema.sql`. It creates:

- `profiles` — one row per user (auto-created via trigger on signup)
- `conversations` / `conversation_participants` — 1:1 and group chat membership
- `messages` — chat messages, with RLS so only participants can read/write
- a `get_direct_conversation` RPC used to find-or-create a 1:1 chat
- an `avatars` storage bucket + policies for profile pictures
- enables the `messages` table for Realtime (Database → Replication if it's
  not already enabled for `supabase_realtime`)

## 3. Configure environment variables

```bash
cd client/frontend
cp .env.example .env
```

Fill in:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 4. Install & run

```bash
npm install
npm run dev
```

## What's implemented

| Feature                     | Where                                                        |
| ---------------------------- | ------------------------------------------------------------- |
| Register / Login / Logout    | `pages/Register.jsx`, `pages/Login.jsx`, `services/authService.js` |
| Password reset                | `pages/ForgotPassword.jsx`, `pages/ResetPassword.jsx`         |
| Auth state / session          | `context/AuthContext.jsx`, `hooks/useAuth.js`                 |
| Protected routes               | `routes/ProtectedRoute.jsx`, `routes/AppRoutes.jsx`           |
| Conversation list              | `components/chat/Sidebar.jsx`, `services/chatService.js`      |
| Real-time messages             | `hooks/useMessages.js` (Supabase `postgres_changes`)          |
| Typing indicator + presence    | `hooks/usePresence.js`, `services/presenceService.js` (Supabase Presence/Broadcast) |
| Message read status            | `markMessagesRead` in `services/chatService.js`               |
| Avatar upload                  | `uploadAvatar` in `services/profileService.js` (Supabase Storage) |
| Emoji picker                   | `components/chat/MessageInput.jsx` (`emoji-picker-react`)     |

## Not yet wired (left as TODOs, per the README roadmap)

- File/image attachment upload in the message composer (the file button is present but not connected to Storage yet)
- Group chat creation UI (the `createGroupConversation` service function exists, no UI yet)
- Push notifications, voice/video, message reactions, block users, admin dashboard

## Notes

- Styling follows the dark slate + indigo theme already set in `index.css`.
- `emoji-picker-react`, `date-fns`, `react-hot-toast`, `react-icons`, `clsx`, and
  `@supabase/supabase-js` were already in `package.json` — no new dependencies were added.
