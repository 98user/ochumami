# 🍶 ochumami

![Home](assets/screenshots/01.jpg) ![CocktailScreen](assets/screenshots/02.jpg) ![ReceipeScreen](assets/screenshots/03.jpg)

**Keep a record of your favorite drinks and snacks.**  
Log the sake, wine, beer, or cocktails you’ve enjoyed, along with how they tasted and which snacks paired well with them.  
You can also save your own snack recipes and note the drinks they go best with.

Built with React Native + Expo, designed with pixel-style UI, and aiming for iOS App Store release.

---

## 👩‍💻 Developer

**Lee Yujeong**  
📍 Kyoto, Japan  
📧 0217koro@gmail.com / 98leeyujeong@gmail.com  
💻 GitHub: [@98user](https://github.com/98user)

---

## ✨ Features

- Select drink type on the home screen (Sake, Wine, Beer, Cocktails & Chuhai)  
- Add / edit / delete snack information with images for each drink type  
- Recipe memo feature (ingredients, cooking instructions, and matching drinks)  
- Sound effects, pixel-style graphics, and keyboard-safe UI for better UX  

---

## 🛠️ Tech Stack

- React Native  
- Expo  
- TypeScript  
- React Navigation  
- Context API  
- EAS Build / Submit  

---

## 🚀 Installation & Run

This app runs using **Expo Go** and requires a local development server.

### 1. Install Node.js & Expo CLI

Make sure you have [Node.js](https://nodejs.org/) installed (LTS version is recommended), then run:

```
npm install -g expo-cli
```

### 2. Clone the project & install dependencies

```
git clone https://github.com/98user/ochumami.git
cd ochumami
npm install
```

### 3. Install additional dependencies

```
# React Navigation
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

# Sound (effects)
npx expo install expo-av

# Image picker (for user photo uploads)
npx expo install expo-image-picker

# Custom fonts
npx expo install expo-font

# Local storage
npm install @react-native-async-storage/async-storage

# TypeScript (already included)
npm install --save-dev typescript @types/react
```

### 4. Start the development server

```
npx expo start --tunnel
```

Then scan the QR code with the **Expo Go** app on your phone to launch the app.

> Note: Your local server must be running while using the app.

---

## 📱 QR Code (optional)

If you want to add a QR code image here later, place it under `assets/qr/ochumami.png` and use:

```
![QR](assets/qr/ochumami.png)
```

---

## 🧠 Notes

- This app currently runs only in **Expo Go** (development mode).  
- A production build using `eas build --platform ios` is planned for App Store release.
- Sound effect used in this app was downloaded from [Otologic](https://otologic.jp/free/se/anime-motion01.html).
- This project was created with the help of ChatGPT.
