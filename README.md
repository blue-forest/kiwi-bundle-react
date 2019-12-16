# Kiwi Bundle - React


## Features

- Works with Kiwi Bundle TypeScript
- Webpack & Babel, for a perfect build
- React & MobX, for your component views
- built-in router and logger, simplified to the limit
- hot reloading, to develop and view your changes in real time


## Getting Started

**./package.json** (required)
```json
{
  "name": "example",
  "version": "1.0.0",
  "scripts": {
    "start": "kiwi start",
    "test": "kiwi test",
    "build": "kiwi build",
    "deploy": "kiwi deploy",
    "undeploy": "kiwi undeploy"
  },
  "bundles": {
    "kiwi-bundle": {
      "options": {
        "app": {
          "name": "Example"
        },
        "dev": {
          "webHost": "localhost",
          "webPort": 8040
        }
      },
      "handlers": {
        "client": "./index"
      }
    }
  },
  "devDependencies": {
    "kiwi-bundle": "^3.0.1",
    "kiwi-bundle-react": "^1.0.0"
  }
}
```

**./tsconfig.json** (required)
```json
{
  "extends": "./node_modules/kiwi-bundle/.models/ts/react.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": [
    "./src/**/*"
  ],
  "exclude": [
    "node_modules",
    "src/**/*.test.ts",
    "src/**/*.test.tsx"
  ]
}
```

**./src/bundle.ts** (required)
```typescript
import { KiwiBundle } from "kiwi-bundle-react"

export const Example = new KiwiBundle({
  routes: {
    HOME: "/",
  },
})
```

**./src/pages/Home.ts** (required)
```typescript
import * as React from "react"
import * as Kiwi from "kiwi-bundle-react"
import { Example } from "../bundle"

interface Params {}

export const HomePage = Example.Page<Params>({
  render: () => <Kiwi.Text>Hello</Kiwi.Text>
})
```

**./src/index.ts** (required)
```typescript
import { Example } from "./bundle"
import { HomePage } from "./pages/Home"

const router = Example.Router({
  HOME: HomePage,
})

Example.Client(router)
```

**./.gitignore** (recommended)
```
dist/
node_modules/
```

**./tslint.json** (optional)
```json
{
  "extends": "./node_modules/kiwi-bundle/.models/tslint/bf.json"
}
```

**.babelrc** (optional)
```json
{
  "extends": "./node_modules/kiwi-bundle-react/.models/babel/react.json"
}
```

**.stylelintrc** (optional)
```json
{
  "extends": "./node_modules/kiwi-bundle-react/.models/stylelint/bf.json"
}
```
