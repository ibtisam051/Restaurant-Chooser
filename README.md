# 🍽️ Restaurant Chooser App

A simple **Expo React Native** application that helps users choose restaurants and manage people involved in the decision-making process.

---

## 📱 Features

* Add and manage people
* Browse and select restaurants
* Simple decision-making flow
* Clean and beginner-friendly UI

---

## 🚀 Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start the Expo development server

```bash
npm start
```

### 3. Open the app

* Scan the QR code using **Expo Go** on your phone
  **OR**
* Run on emulator:

```bash
npm run android
npm run ios
```

---

## 🌐 Publish with Expo

To share your app without running a local server:

### 1. Create an Expo account

https://expo.dev/

### 2. Login

```bash
npx expo login
```

### 3. Publish the app

```bash
npx expo publish
```

---

## 📦 Build APK with EAS (Android Only)

Since iOS requires an Apple Developer account, this project uses **Android-only build**.

### 1. Login to EAS

```bash
npx eas login
```

### 2. Run production build (Android only)

```bash
npx eas build --platform android --profile production
```

---

## 📥 Build Artifact

Download and install the APK:

👉 https://expo.dev/artifacts/eas/wFMZovB2n7i1x2UXR58JPQ.apk

---

## 📁 Project Structure

```
.
├── App.js                      # Root entry point
├── app.json                    # Expo configuration
├── eas.json                    # EAS build configuration
├── src/
│   ├── screens/
│   │   ├── people/             # People management screens
│   │   ├── restaurants/        # Restaurant selection screens
│   │   └── decision/           # Decision flow screens
```

---

## 📌 Notes

* The `eas.json` file is included and pushed to GitHub for build configuration.
* This project is built using Expo and EAS for easy deployment.
* Only Android build is configured (no Apple ID required).

---

## 📎 Submission

* ✅ Public GitHub Repository (with this README)
* ✅ Expo Build Artifact (APK link above)

---

## 👨‍💻 Author

**Ibtisam Ahmed**

---

## 📄 License

This project is for educational purposes.
