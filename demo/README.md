
# Kiwi Bundle React Demo

At Blue Forest, we are convinced that the best way to explain abstract concepts is to illustrate them with concrete examples. In other words : don't tell, show !

For this purpose, we suggest the following guideline :


## [./src/kbrd/index.ts](./src/kbrd/index.ts)
You will find in this file a new `App` initialization, this is where you will be able to define all the general properties of your application

In this demo, the `KBRD` variable will be used to define, for example, Components, StyleSheets and Stores

Once a Page is created, you will need to add it for rendering in this file


## [./src/kbrd/components/Button.tsx](./src/kbrd/components/Button.tsx)
The first use of `KBRD` that we are could see in this file is for declaring new React Component

These Components should be as small as possible and avoid dependencies since they represent the lowest level in the Kiwi Bundle React hierarchy


## [./src/kbrd/components/Button.style.ts](./src/kbrd/components/Button.style.ts)
This file contains style rules intended to be used by React Components

You can see usage of `as const` : it is not a requirement but it will allow you to get a better visibility of your StyleSheet values from other TypeScript files


## [./src/kbrd/components/Button.style.web.ts](./src/kbrd/components/Button.style.web.ts)
This file will only be used for web platforms

If this file and `./src/kbrd/components/Button.style.ts` simultaneously exists, the second one will apply to Android and iOS

This feature works on any TypeScript file ending by `.web.ts` or `.web.tsx`


## [./src/kbrd/components/Button.style.android.ts](./src/kbrd/components/Button.android.ts)
Works like web but for Android


## [./src/kbrd/components/Button.style.ios.ts](./src/kbrd/components/Button.style.ios.ts)
Works like web but for iOS


## [./src/kbrd/components/Button.style.native.ts](./src/kbrd/components/Button.style.native.ts)
Works like web but for both Android and iOS


## [./src/kbrd/layouts/Header.tsx](./src/kbrd/layouts/Header.tsx)
A Layout is a grouping of several Components, it is the intermediate level of your Kiwi Bundle React Components


## [./src/kbrd/stores/counter.ts](./src/kbrd/stores/counter.ts)
Stores are a simple way to enable communication between multiple Components and perform dynamic updates


## [./src/kbrd/i18n/Home.ts](./src/kbrd/i18n/Home.ts)
i18n is an easy way to define words and phrases translated into multiple languages

If you use `Kiwi.Text` Component, it will take care of translating everything automatically


## [./src/kbrd/pages/Home.tsx](./src/kbrd/pages/Home.tsx)
This file is an example of a Page, it can group Layouts and Components inside it


## [./src/index.ts](./src/index.ts)
Place here everything that must be executed when your app is started


## [./index.js](./index.js)
This file represents the entry point of your application, in our case it will import the file `./src/index.ts`
