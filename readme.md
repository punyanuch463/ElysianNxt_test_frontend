# URL Shortener (React + Vite + Firebase)

A simple and stylish URL shortener web application built with **React**, **Vite**, and **Firebase**.  
The application provides fast URL shortening, link caching, history tracking, and smooth animations — all packaged in a clean and responsive UI.

---

## Features

### Core Functions
- Shorten any URL using Firebase Firestore  
- Smart caching: avoid shortening the same URL repeatedly  
- Link history stored in Firestore or LocalStorage  
- One-click copy for shortened URLs  

### UI/UX Enhancements
- Smooth animations for:
  - Button click  
  - Showing results  
- Responsive and clean interface  
- Styled with **Emotion** for maintainable styling  

---

## Tech Stack

- React (Vite)  
- Firebase (Firestore)  
- Emotion Styled  
- LocalStorage (optional caching + history)  
- Vercel (deployment)  

---

## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

2. Install dependencies:

```
npm install

```

3. Set up Firebase:

Create a Firebase project at Firebase Console

Enable Firestore database

Copy your Firebase config to .env:

```
VITE_API_KEY=YOUR_API_KEY
VITE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_PROJECT_ID=YOUR_PROJECT
VITE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
VITE_MESSAGING_SENDER_ID=XXX
VITE_APP_ID=XXX

```
# Running the Project

Start the development server:

```
npm run dev
```

Build for production:
```
npm run build
```

Preview the production build:
```
npm run preview
```

# Project Structure

url-shortener/
├── src/
    ├── assets/
    │     └── react.svg
    ├── firebase.js
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── main.jsx
├── .env
├── .gitignore
├── package.json
├── vite.config.js


# Deployment

The project can be deployed on firebase or any static hosting platform.

Example firebase-hosting deployment:

firebase deploy


# License

MIT License