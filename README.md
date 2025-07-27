# Basic React Native App Template
This is a basic starter template for a React Native app, designed to help you quickly kick off your next project. It provides a clean project structure using Expo Router, along with built-in support for tabs, navigation, and common utilities.

Use this template as a solid foundation to build scalable and maintainable React Native applications.

## Folder Structure
```bash
my-template/
├── app/
│   ├── _layout.jsx              # root layout (e.g., tabs or stack navigator)
│   ├── index.jsx                # home screen (path: /)
│   ├── profile/                 # profile route group
│   │   ├── _layout.jsx          # profile nested stack layout
│   │   ├── index.jsx            # profile main screen (/profile)
│   │   └── dynamic/             # nested dynamic routes under /profile/dynamic
│   │       ├── [id].jsx         # dynamic route: /profile/dynamic/123
│   │       └── [...slug].jsx    # catch-all route: /profile/dynamic/a/b/c
│   └── settings/                # settings route group
│       ├── _layout.jsx          # settings nested stack layout
│       └── index.jsx            # settings main screen (/settings)
├── assets/
│   └── logo.png                 # static assets like images
├── package.json
├── app.json
├── babel.config.js
├── template.config.js          # optional, for reusable template config
└── README.md
```

## Prerequisites
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/more/expo-cli/$0)

## Setup
1. Clone the repository:
    ```bash
    https://github.com/Ahmadalmuhidat/React-Native-Template.git
    cd my-node-api
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

## Running the APP
- Start the server:
    ```bash
    npx expo start
    ```
- Scan the QR code shown in the browser using the Expo Go app on your mobile device.
- Make sure your phone and development machine are on the same Wi-Fi network.