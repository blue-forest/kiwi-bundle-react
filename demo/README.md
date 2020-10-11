
# Kiwi Bundle React Demo

At Blue Forest, we are convinced that the best way to explain abstract concepts is to illustrate them with concrete examples. In other words : don't tell, show !

For this purpose, we suggest the following guideline :


## [./src/bundle.ts](./src/bundle.ts)
You will find in this file the `KiwiBundleReact` initialization, this is where you will be able to define all the general properties of your application

In this demo, the `KBRD` variable will be used to define, for example, Components, StyleSheets and Stores


## [./src/components/Button.tsx](./src/components/Button.tsx)
The first use of `KBRD` that we are could see in this file is for declaring a new React Component

These Components should be as small as possible and avoid dependencies since they represent the lowest level in the Kiwi Bundle React hierarchy


## [./src/components/Button.style.ts](./src/components/Button.style.ts)
This file contains style rules intended to be used by a Component


## [./src/components/Button.style.web.ts](./src/components/Button.style.web.ts)
This file will only be used for web platforms

If this file and `./src/components/Button.style.ts` simultaneously exists, the second one will be applied to Android and iOS

This feature works on any TypeScript file ending by `.web.ts` or `.web.tsx`


## [./src/components/Button.style.android.ts](./src/components/Button.android.ts)
Works like web platform but for Android


## [./src/components/Button.style.ios.ts](./src/components/Button.style.ios.ts)
Works like web platform but for iOS


## [./src/components/Button.style.native.ts](./src/components/Button.style.native.ts)
Works like web platform but for both Android and iOS


## [./src/layouts/Header.tsx](./src/layouts/Header.tsx)
A Layout is a grouping of several Components : it is the intermediate level of your Kiwi Bundle React components


## [./src/stores/Counter.ts](./src/stores/Counter.ts)
Stores are a simple way to enable communication between multiple Components and perform dynamic updates.


## [./src/i18n/Home.ts](./src/i18n/Home.ts)
i18n is an easy way to define words and phrases translated into multiple languages

The `Kiwi.Text` Component will take care of translating everything automatically


## [./src/pages/Home.tsx](./src/pages/Home.tsx)
This file is an example of a Page, it can group Layouts and Components inside


## [./src/index.ts](./src/index.ts)
Once a Page is created, you will need to add it for rendering in this file


## [./index.js](./index.js)
This file represents the entry point of your application, it exports the `./src/index.ts` file
