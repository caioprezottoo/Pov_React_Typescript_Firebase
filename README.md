# Pov. - Movie Review Platform

A modern, interactive web application for discovering, reviewing, and managing your movie watchlist. Built with React, TypeScript, and Firebase.

## ✨ Features

- **User Authentication**: Secure signup and login with Firebase Authentication
- **Movie Discovery**: Search and explore movies using the OMDB API
- **Personal Reviews**: Rate and review movies (1-10 scale)
- **Watchlist Management**: Add movies to your personal watchlist
- **User Profile**: Manage your account and preferences
- **Responsive Design**: Beautiful UI that works on all devices

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: GSAP, Framer Motion
- **Backend**: Firebase (Auth + Firestore)
- **Routing**: React Router 7
- **API**: OMDB API for movie data
- **Build Tool**: Vite
- **UI Components**: Custom component library with shadcn/ui patterns


## 🗂️ Project Structure

```
src/
├── assets/              # SVG icons and images
├── components/          # Reusable UI components
│   ├── AnimatedContent.tsx
│   ├── BlurText.tsx
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Input.tsx
│   ├── ReviewModal.tsx
│   └── ...
├── context/            # React Context providers
│   └── AuthContext.tsx
├── core-components/    # Layout components
│   ├── AppLayout.tsx
│   ├── AuthLayout.tsx
│   └── InitialPage/
├── pages/              # Route pages
│   ├── ExplorePage.tsx
│   ├── MoviePage.tsx
│   ├── ReviewedPage.tsx
│   ├── WatchListPage.tsx
│   ├── ProfilePage.tsx
│   └── ...
├── services/           # API and Firebase services
│   ├── omdbApi.ts
│   ├── reviewService.ts
│   └── watchlistService.ts
├── variants/           # Component style variants
└── App.tsx            # Main app component
```

## 🔑 Key Features Explained

### Authentication
- Firebase Authentication for secure user management
- Protected routes with `AuthContext`
- Account deletion functionality

### Movie Features
- Search movies by title
- View detailed movie information
- Rate movies (1-10 stars)
- Write and edit reviews
- Add/remove movies from watchlist