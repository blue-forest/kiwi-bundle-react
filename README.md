
![Kiwi Bundle React](./demo/src/assets/cover.png)


# Features
- out-of-the box configurations for [TypeScript](https://github.com/microsoft/TypeScript), [React](https://github.com/facebook/react), [React Navigation](https://github.com/react-navigation), [Babel](https://github.com/babel/babel), [ESLint](https://github.com/eslint/eslint), [Prettier](https://github.com/prettier/prettier) and [Flow](https://github.com/facebook/flow)
- integration of [react-native-web](https://github.com/necolas/react-native-web) for building **web**, **Android** and **iOS** apps with a same codebase
- **instant start-up** and **hot reloading** to see your components changes in real time
- complete toolbox with built-in **router**, **logger**, **states management** and **styling** simplified to the limit


# Getting started

## Requirements
NodeJS needs to be installed : https://nodejs.org/en/download/

For Android builds, [Java](https://openjdk.java.net) and [Android Studio](https://developer.android.com/studio/index.html) are required

For iOS builds, you need to have Xcode installed on your Mac

Optionally, in replacement of `npm`, you can install `yarn` by running `npm install -g yarn`

If you want Prettier as a code formatter, you will need to install it : https://prettier.io/docs/en/install.html

Finally, if you do not have a text editor yet, give VSCode a try : https://code.visualstudio.com


## Install
Create a **./package.json** file :
```json
{
  "name": "example",
  "version": "1.0.0",
  "scripts": {
    "start": "kiwi start",
    "test": "kiwi test",
    "build": "kiwi build",
    "clean": "kiwi clean",
    "postinstall": "kiwi postinstall"
  },
  "bundles": {
    "kiwi-bundle": {
      "options": {
        "app": {
          "key": "example",
          "name": "Example App"
        }
      }
    }
  },
  "devDependencies": {
    "kiwi-bundle": "3.2.11",
    "kiwi-bundle-react": "2.1.3"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

Then run `npm install` or `yarn install`


## Init
Before launching your application you will need to create some initial files in your `./src` directory

In the [demo directory](./demo) we have written an overview of how to use the main Kiwi Bundle React capabilities through simple examples

You can find an online version of the result right here : https://kiwi-bundle-react.demo.blueforest.cc


## Commands

### Web
To start a local server, run `npm run start web` or `yarn start web`

To build static files, run `npm run build web` or `yarn build web`

### Android
To start development environment :
1. Run `npm run start metro` or `yarn start metro`
2. Run `npm run start android` or `yarn start android`

To build production files, run `npm run build android` or `yarn build android`

### iOS
Before your first start, you will need to run `pod install` in `./ios` to install CocoaPods dependencies

Then run `npm run start ios` or `yarn start ios`

### Test
To start Jest and test your `.test.ts` files, run `npm run test` or `yarn test`

### Clean
Run `npm run clean` or `yarn clean`
