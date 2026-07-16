# 💬 MessagingSystem

A modern real-time one-to-one messaging application built with **React**, **Tailwind CSS**, and **Supabase**.

The goal of this project is to provide a clean, secure, and scalable messaging platform with real-time communication, authentication, file sharing, and user profile management.

---

## 🚀 Features

### ✅ Authentication
- Email & Password Sign Up
- Email & Password Login
- Logout
- Password Reset
- Session Persistence

### 👤 User Profiles
- Username
- Display Name
- Avatar
- Bio
- Online Status
- Last Seen

### 💬 Messaging
- One-to-One Chat
- Real-Time Messaging
- Read Receipts
- Conversation History
- Message Timestamps

### 📎 File Sharing
- Image Upload
- Documents
- Audio Files
- Video Files
- Secure Storage

### 🔒 Security
- Supabase Authentication
- Row Level Security (RLS)
- Protected API Calls
- Secure Storage Policies
- User-Based Access Control

### ⚡ Performance
- Optimized Database Indexes
- Realtime Updates
- Fast Message Loading
- Efficient Queries

---

# 🛠 Tech Stack

## Frontend

- React
- JavaScript (ES6+)
- Vite
- Tailwind CSS
- React Router
- React Icons

## Backend

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Realtime
- Supabase Storage

---

# 📂 Project Structure

```
MessagingSystem
│
├── client
│   ├── public
│   │
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── common
│   │   │   ├── chat
│   │   │   ├── layout
│   │   │   └── ui
│   │   │
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   │   ├── Landing
│   │   │   ├── Login
│   │   │   ├── Register
│   │   │   ├── Dashboard
│   │   │   ├── Profile
│   │   │   └── Settings
│   │   │
│   │   ├── services
│   │   ├── utils
│   │   ├── lib
│   │   ├── routes
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── supabase
│   ├── config.toml
│   ├── seed.sql
│   └── migrations
│       ├── 001_initial_schema.sql
│       ├── 002_indexes.sql
│       ├── 003_functions.sql
│       ├── 004_storage.sql
│       ├── 005_rls.sql
│       └── 006_realtime.sql
│
├── .gitignore
├── LICENSE
└── README.md
```

---

# 🗄 Database Schema

```
auth.users
      │
      ▼
profiles
      │
      ▼
conversations
      │
      ▼
messages
      │
      ▼
attachments
```

---

# 📦 Installation

Clone the repository.

```bash
git clone https://github.com/devkotakalyan/MessagingSystem.git
```

Open the project.

```bash
cd MessagingSystem
```

Install dependencies.

```bash
cd client
npm install
```

Run the development server.

```bash
npm run dev
```

---

# ⚙ Environment Variables

Create a `.env` file inside the `client` directory.

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_ANON_KEY
```

---

# 🛢 Database Setup

Initialize Supabase.

```bash
supabase init
```

Link your project.

```bash
supabase link --project-ref YOUR_PROJECT_ID
```

Push the database migrations.

```bash
supabase db push
```

---

# 🔄 Realtime

Realtime is powered by **Supabase Realtime**.

Updates include:

- New Messages
- Online Status
- Read Receipts
- Profile Updates

without refreshing the page.

---

# 🔐 Security

This project uses:

- Supabase Authentication
- PostgreSQL Row Level Security
- Secure Storage Policies
- User-Based Permissions

Every database request is protected using Row Level Security (RLS).

---

# 📸 Planned Features

- Emoji Support
- Typing Indicator
- Voice Messages
- Video Messages
- Message Search
- Pinned Chats
- Notifications
- Dark Mode
- Group Chats
- Message Reactions
- Reply to Messages
- Forward Messages
- Message Editing
- Message Deletion
- Media Gallery
- User Blocking

---

# 🧪 Development Status

| Feature | Status |
|----------|--------|
| Landing Page | ✅ |
| Authentication | 🚧 |
| Database Schema | 🚧 |
| Real-Time Chat | ⏳ |
| Profile System | ⏳ |
| File Upload | ⏳ |
| Notifications | ⏳ |
| Deployment | ⏳ |

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Kalyan Devkota**

- GitHub: https://github.com/devkotakalyan
- Project: MessagingSystem

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps the project reach more developers and supports future improvements.
