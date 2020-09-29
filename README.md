
![Kiwi Bundle React](./assets/cover.png)


# Features
- out-of-the box configurations for [TypeScript](https://github.com/microsoft/TypeScript), [React](https://github.com/facebook/react), [Babel](https://github.com/babel/babel), [ESLint](https://github.com/eslint/eslint), [Prettier](https://github.com/prettier/prettier) and [Flow](https://github.com/facebook/flow)
- integration of [react-native-web](https://github.com/necolas/react-native-web) for building **web**, **Android** and **iOS** apps with the same code
- **instant start-up** and **hot reloading** to see your components changes in real time
- complete toolbox with built-in **router**, **logger**, and **states management** simplified to the limit


# Demo
https://kiwi-bundle-react.demo.blueforest.cc

[Self-documented source code here](./demo)


# Getting started

## Install
Create a **./package.json** file :
```json
{
  "name": "example",
  "version": "1.0.0",
  "scripts": {
    "start": "kiwi start",
    "build": "kiwi build",
    "clear": "kiwi clear"
  },
  "bundles": {
    "kiwi-bundle": {
      "options": {
        "app": {
          "id": "example",
          "name": "Example App",
          "author": "You"
        }
      }
    }
  },
  "dependencies": {
    "kiwi-bundle": "3.2.0",
    "kiwi-bundle-react": "2.0.0"
  }
}
```

Then run `npm install` or `yarn install`

## Commands

### Web
To start, run `npm run start web` or `yarn start web`

To build, run `npm run build web` or `yarn build web`

### Android
To start :
1. Run `npm run start metro` or `yarn start metro`
2. Run `npm run start android` or `yarn start android`

To build, run `npm run build android` or `yarn build android`

### iOS
Run `npm run start ios` or `yarn start ios`

### Clear
Run `npm run clear` or `yarn clear`
