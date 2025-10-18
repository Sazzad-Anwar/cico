# 💳 Digital Wallet App

A modern, feature-rich digital wallet application built with React Native and Expo. This app provides a seamless experience for managing finances, transferring money, and tracking transactions.

## 🌟 Features

- **User Authentication** - Secure login and signup with form validation
- **Digital Wallet Management** - View and manage multiple currency balances (ETB & USD)
- **Quick Transfers** - Easy money transfers to contacts
- **Transaction History** - Track all your financial activities
- **Contact Management** - Add and manage transfer recipients
- **Beautiful UI** - Modern, intuitive interface with smooth animations
- **Dark Mode Support** - Comfortable viewing in any lighting condition
- **Persistent Storage** - Your data is securely stored locally

## 📱 Screenshots

### Onboarding & Authentication

<div align="center">
  <img src="readme/Simulator Screenshot - iPhone 15 Pro - 2025-10-18 at 22.01.18.png" width="250" alt="Splash Screen" />
  <img src="readme/Simulator Screenshot - iPhone 15 Pro - 2025-10-18 at 22.02.22.png" width="250" alt="Login Screen" />
  <img src="readme/Simulator Screenshot - iPhone 15 Pro - 2025-10-18 at 22.02.37.png" width="250" alt="Signup Screen" />
</div>

### Home & Wallet

<div align="center">
  <img src="readme/Simulator Screenshot - iPhone 15 Pro - 2025-10-18 at 22.02.49.png" width="250" alt="Home Screen" />
  <img src="readme/Simulator Screenshot - iPhone 15 Pro - 2025-10-18 at 22.03.04.png" width="250" alt="Wallet Overview" />
  <img src="readme/Simulator Screenshot - iPhone 15 Pro - 2025-10-18 at 22.03.12.png" width="250" alt="Balance Details" />
</div>

### Transfers & Contacts

<div align="center">
  <img src="readme/Simulator Screenshot - iPhone 15 Pro - 2025-10-18 at 22.03.26.png" width="250" alt="Quick Transfer" />
  <img src="readme/Simulator Screenshot - iPhone 15 Pro - 2025-10-18 at 22.03.53.png" width="250" alt="Add Contact" />
  <img src="readme/Simulator Screenshot - iPhone 15 Pro - 2025-10-18 at 22.04.00.png" width="250" alt="Transfer Details" />
</div>

### Transactions & Settings

<div align="center">
  <img src="readme/Simulator Screenshot - iPhone 15 Pro - 2025-10-18 at 22.04.15.png" width="250" alt="Transaction History" />
  <img src="readme/Simulator Screenshot - iPhone 15 Pro - 2025-10-18 at 22.04.40.png" width="250" alt="Cards View" />
  <img src="readme/Simulator Screenshot - iPhone 15 Pro - 2025-10-18 at 22.04.54.png" width="250" alt="Settings" />
</div>

### User Management

<div align="center">
  <img src="readme/Simulator Screenshot - iPhone 15 Pro - 2025-10-18 at 22.05.04.png" width="250" alt="User Profile" />
</div>

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **UI Components**: [Gluestack UI](https://ui.gluestack.io/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Animations**: [Moti](https://moti.fyi/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Storage**: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- **Date Handling**: [Day.js](https://day.js.org/)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd digital-wallet-2.1.0
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   bun start
   # or
   npm start
   # or
   yarn start
   ```

4. **Run on your device**
   - **iOS**: Press `i` in the terminal or run `bun ios`
   - **Android**: Press `a` in the terminal or run `bun android`
   - **Web**: Press `w` in the terminal or run `bun web`

## 📱 Requirements

- Node.js 18+ or Bun
- Expo CLI
- iOS Simulator (macOS only) or Android Emulator
- Expo Go app (for physical device testing)

## 🚀 Available Scripts

- `bun start` - Start the Expo development server
- `bun ios` - Run on iOS simulator
- `bun android` - Run on Android emulator

## 📁 Project Structure

```
digital-wallet-2.1.0/
├── app/                      # App screens (Expo Router)
│   ├── (tabs)/              # Tab navigation screens
│   ├── (show-data)/         # Data display screens
│   ├── _layout.tsx          # Root layout
│   ├── index.tsx            # Landing page
│   ├── login.tsx            # Login screen
│   ├── signup.tsx           # Signup screen
│   └── slider-screen.tsx    # Onboarding slider
├── components/              # Reusable components
│   ├── ui/                  # UI library components
│   ├── custom-button.tsx
│   ├── header.tsx
│   ├── transactions.tsx
│   ├── transfers.tsx
│   └── wallet-card.tsx
├── store/                   # State management
│   ├── auth.store.ts        # Authentication state
│   └── data.store.ts        # App data state
├── lib/                     # Utilities
│   ├── utils.ts
│   └── data.ts
├── assets/                  # Images, fonts, icons
└── readme/                  # Screenshots
```

## 🎨 Key Features Explained

### Authentication System

- Secure user registration with validation
- Login with "Remember Me" functionality
- Form validation using Zod schemas
- Persistent session storage

### Wallet Management

- Multi-currency support (ETB & USD)
- Real-time balance updates
- Virtual card display
- Balance visibility toggle

### Transfer System

- Quick transfer to recent contacts
- Add new contacts with full details
- Transfer history tracking
- Transaction IDs for reference

### User Experience

- Smooth animations and transitions
- Keyboard-aware forms
- Pull-to-refresh functionality
- Loading states and error handling
- Responsive design

## 🔒 Security Features

- Password encryption (to be implemented with production-ready hashing)
- Secure local storage
- Input validation and sanitization
- Authentication guards on protected routes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

Built with ❤️ using React Native and Expo

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [Gluestack UI](https://ui.gluestack.io/) for beautiful UI components
- [NativeWind](https://www.nativewind.dev/) for Tailwind CSS in React Native
- [Lucide](https://lucide.dev/) for the icon set

---

**Version**: 2.1.0

**Last Updated**: October 18, 2025
