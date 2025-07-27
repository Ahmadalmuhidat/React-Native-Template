# Basic React Native App Template
This is a basic starter template for a React Native app, designed to help you quickly kick off your next project. It provides a clean project structure using Expo Router, along with built-in support for tabs, navigation, and common utilities.

Use this template as a solid foundation to build scalable and maintainable React Native applications.

## Folder Structure
```bash
my-template/
├── app/
│   ├── _layout.jsx              # base layout (tabs or stack)
│   ├── index.jsx                # home screen (/)
│   └── screen/                  # nested route folder (/screen)
│       ├── index.jsx            # /screen
│       ├── subroute/            # nested under /screen/subroute
│       │   ├── [id].jsx         # dynamic route: /screen/subroute/123
│       │   └── [...slug].jsx    # catch-all: /screen/subroute/a/b/c
├── assets/
│   └── logo.png
├── package.json
├── app.json
├── babel.config.js
├── template.config.js          # if exporting as a reusable template
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