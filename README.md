# Abhishek Sonar - Premium Portfolio Website

A modern, high-performance developer portfolio website built using **Angular 22** (Zoneless + OnPush), **Tailwind CSS v4**, **ng-motion** (physics-based animations), and **Firebase Firestore** (real-time data synchronization).

## Tech Stack Overview

- **Frontend**: Angular 22 (Standalone & Selectorless components, `@if`/`@for`/`@switch` control flow, Signal Forms, and Zoneless change detection).
- **Animations**: `@scripttype/ng-motion` (Framer Motion API wrapper using spring physics, gesture support, viewport entry reveals, and `layoutId` shared transitions).
- **Database**: Firebase Firestore via `@angular/fire` (observables converted to Signals, updating real-time).
- **Styling**: Tailwind CSS v4 with glassmorphism and custom dark/neon accent themes.

---

## Getting Started

### 1. Installation

Since this project leverages Angular 22 and requires a modern Node.js runtime, it has been pre-configured with a local Node.js binary wrapper to guarantee compatibility.

Install the project dependencies (using `--legacy-peer-deps` to bypass strict Angular 22 peer checks for database drivers):

```bash
npm install --legacy-peer-deps
```

### 2. Configure Firebase Environment

Open `src/environments/environment.ts` and `src/environments/environment.prod.ts`, and replace the placeholders with your Firebase project credentials:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

---

## Seeding Initial Resume Data to Firestore

You can instantly seed Abhishek's detailed work history, projects, and skills to your Firebase database using the included Node.js script.

1. Go to your **Firebase Console**.
2. Navigate to **Project Settings > Service Accounts**.
3. Click **Generate new private key** and download the JSON file.
4. Save the downloaded JSON file as **`serviceAccountKey.json`** in the root directory of this project.
5. Run the seeding command:

```bash
node seed-firestore.js
```

This will clear old entries and populate the collections: `profile`, `skills`, `experience`, `education`, and `projects`.
*(Note: If you run the web app before seeding or configuring Firebase, it will gracefully fall back to local mock data so the site is functional immediately.)*

---

## Local Development Server

Run the development server locally:

```bash
npm run start
```

Navigate to `http://localhost:4200/` in your browser. The app runs in Zoneless Change Detection mode for ultra-fast, smooth 60fps animations.

---

## Building and Deployment

### 1. Build for Production

Compile the application assets into the production bundle:

```bash
npm run build
```

The compiled assets will be written to `dist/portfolio/browser`.

### 2. Deploy to Firebase Hosting

To initialize and deploy the compiled folder to Firebase Hosting:

1. Install Firebase CLI globally (if you haven't already):
   ```bash
   npm install -g firebase-tools
   ```
2. Log in to Firebase:
   ```bash
   firebase login
   ```
3. Initialize the project in your directory:
   ```bash
   firebase init hosting
   ```
   - Select your project.
   - Choose `dist/portfolio/browser` as your public directory.
   - Configure as a single-page app (write `y` to rewrite all URLs to `index.html`).
   - Do **not** overwrite `index.html`.
4. Deploy the build:
   ```bash
   firebase deploy --only hosting
   ```
