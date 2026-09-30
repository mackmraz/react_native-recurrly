# Recurrly: Subscription Tracker (React Native + Expo)

Recurrly is a mobile app for keeping track of recurring subscriptions (streaming, software, and other services), what they cost, and when they renew. It is built with Expo and React Native, uses Clerk for authentication, and is styled with NativeWind (Tailwind CSS for React Native).

> **Status: work in progress.** I built this while following a React Native course. Authentication, the Home screen, and Settings work. The **Subscriptions** and **Insights** tabs are still placeholders, and subscription data currently comes from sample data in `constants/data.ts` rather than a backend.

## Features

### Implemented
- **Email/password authentication with Clerk**
  - Sign up with email verification by one-time code (with a resend option)
  - Sign in, plus the email-code check Clerk asks for when it doesn't yet trust a device
  - Client-side form validation
  - Session tokens stored securely with `expo-secure-store`
- **Protected routing.** Signed-out users are sent to sign-in, and signed-in users skip the auth screens.
- **Custom floating bottom tab bar** with Home, Subscriptions, Insights, and Settings tabs
- **Home screen**
  - Greeting with the signed-in user's name and avatar (from Clerk)
  - Balance card showing the next renewal date
  - Horizontally scrolling "Upcoming" renewals with the days remaining
  - "All Subscriptions" list with tap-to-expand cards that show payment method, category, start date, renewal date, and status
- **Settings screen** with profile details (name, email, account ID, join date) and sign out
- Currency and date formatting helpers (`Intl.NumberFormat`, dayjs)
- Custom Plus Jakarta Sans font family, with the splash screen held until fonts load

### Placeholders / not yet built
- **Subscriptions** tab (placeholder screen)
- **Insights** tab (placeholder screen)
- Onboarding screen and the subscription detail route (`/subscriptions/[id]`) are stubs
- Adding, editing, and saving subscriptions. The data shown is sample data.

## Tech stack

| Area | Tools |
|---|---|
| Framework | Expo SDK 54, React Native 0.81, React 19 |
| Language | TypeScript |
| Navigation | Expo Router 6 (file-based routing, typed routes) and React Navigation bottom tabs |
| Styling | NativeWind 5 (preview) with Tailwind CSS 4 |
| Auth | Clerk (`@clerk/expo`) with an `expo-secure-store` token cache |
| Utilities | dayjs, clsx, react-native-reanimated, react-native-safe-area-context |
| Tooling | ESLint (`eslint-config-expo`), Prettier Tailwind plugin |

The New Architecture and the React Compiler experiment are both enabled in `app.json`.

## Getting started

### Prerequisites
- Node.js (current LTS) and npm
- A free [Clerk](https://clerk.com) application with **Email + Password** sign-in enabled
- One of: the Expo Go app on a phone, an iOS simulator (macOS), or an Android emulator

### Run locally
```bash
git clone https://github.com/mackmraz/react_native-recurrly.git
cd react_native-recurrly
npm install
```

Create a `.env` file in the project root with your Clerk publishable key. The app throws an error on startup if it's missing:

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxx
```

Start the dev server:

```bash
npm start          # expo start: scan the QR code with Expo Go, or press i / a / w
npm run ios        # open in the iOS simulator
npm run android    # open in an Android emulator
npm run web        # run in the browser
npm run lint       # expo lint
```

## Project structure

```
app/
  _layout.tsx            Root layout: Clerk provider, fonts, splash screen
  (auth)/                Sign-in and sign-up screens (redirects if already signed in)
  (tabs)/                Protected tab screens: index (Home), subscriptions, insights, settings
  subscriptions/[id].tsx Subscription detail route (stub)
  onboarding.tsx         Onboarding screen (stub)
components/              SubscriptionCard, UpcomingSubscriptionCard, ListHeading
constants/               Sample data, icons, images, theme tokens
lib/utils.ts             Currency, date, and status formatting helpers
global.css               Tailwind / NativeWind styles and component classes
```

## Roadmap
- Build out the Subscriptions tab with add, edit, and delete
- Save subscriptions per user instead of using sample data
- Insights tab with spending breakdowns
- Onboarding flow and subscription detail screen

## Acknowledgements
Built while following a React Native course. The app concept and design theme come from the course.
