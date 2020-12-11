import { Theme } from "@react-navigation/native"
import { ReactNative } from "../../vendors"
import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { AppStyleSheet } from "../app/styles"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentValues,
} from "./component"

export type ArchitectContext<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends AppStyleSheet = any,
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {}
  > = {
    props: Props
    style: {
      [name in keyof Style]: Style[name] extends { style: infer SubStyle }[]
      ? SubStyle
      : Style[name]
    }
    states: {
      get: { [name in keyof States]: States[name] }
      set: { [name in keyof States]: (v: States[name]) => void }
    }
    values: {
      [value in keyof Values]: {
        get: () => Values[value]
        set: (value: Values[value]) => void
      }
    }
    functions: Functions
    OS: ReactNative.PlatformOSType
    appearance: {
      colors: Config["appearance"]["colors"]
      theme: {
        get: () => keyof Links["themes"] | undefined
        set: (theme: keyof Links["themes"]) => void
        colors: Theme["colors"]
        scheme: {
          get: () => ReactNative.ColorSchemeName
          set: (scheme: ReactNative.ColorSchemeName) => void
        }
      }
    }
    navigation: {
      push: (
        route: keyof Config["navigation"]["routes"],
        params?: { [key: string]: string | string[] },
      ) => void
    }
    update: () => void
  }
