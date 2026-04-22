# Restaurant Chooser App

A simple Expo React Native app for choosing restaurants and managing people.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Expo dev server:
   ```bash
   npm start
   ```

3. Open the app:
   - Scan the QR code with Expo Go on a phone, or
   - Run `npm run android` or `npm run ios` if you have a simulator/emulator.

## Publishing with Expo

To make the app available to others without keeping your machine running:

1. Create an Expo account at https://expo.dev/
2. Login from the project folder:
   ```bash
   npx expo login
   ```
3. Publish the app:
   ```bash
   npx expo publish
   ```

If `expo` is not recognized, install the Expo CLI:

```bash
npm install -g expo-cli
```

That makes the app available via Expo's web service so others can access it via the published URL.

## Building a native package with EAS

This repo includes `eas.json` for EAS builds.

1. Install the EAS CLI if needed:
   ```bash
   npm install -g eas-cli
   ```

2. Or run directly with npx:
   ```bash
   npx eas login
   ```

3. Login to Expo/EAS:
   ```bash
   npx eas login
   ```

4. Run a production build:
   ```bash
   npx eas build --platform all --profile production
   ```

If `eas` is not recognized, install the CLI globally:

```bash
npm install -g eas-cli
```

5. When the build completes, copy the build artifact link here:
   - Build artifact link: _paste your finished build URL here_

## Published app links

- Expo published URL: _paste your expo publish URL here_
- EAS build artifact URL: _paste your finished build URL here_

## Project files

- `App.js` — root app entry point.
- `app.json` — Expo project config.
- `eas.json` — EAS build profiles.
- `src/screens/people` — people screens.
- `src/screens/restaurants` — restaurant screens.
- `src/screens/decision` — decision flow screens.

## Notes

- Push `eas.json` to GitHub so the build config is tracked.
- Include the published Expo URL or EAS build artifact link in the repo README when available.
