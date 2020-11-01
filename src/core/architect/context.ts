import { Theme } from "@react-navigation/native"
import { ReactNative } from "../../vendors"
import { AppComponentProps, AppComponentStates, AppConfig } from "../app"
import { AppLinksImports } from "../links"
import { AppStyleSheet } from "../styles"

export type ArchitectContext<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet = {},
  Stores = {},
  States extends AppComponentStates = {},
  Values = {},
  Functions = {},
  > = {
    appearance: {
      colors: Config["appearance"]["colors"]
      theme: {
        get: () => keyof Links["themes"] | undefined
        set: (theme: keyof Links["themes"]) => void
        colors: Theme["colors"],
        scheme: {
          get: () => ReactNative.ColorSchemeName
          set: (scheme: ReactNative.ColorSchemeName) => void
        }
      }
    }
    props: Props
    style: Style
    stores: Stores
    state: {
      get: { [name in keyof States]: States[keyof States] }
      set: { [name in keyof States]: (v: States[keyof States]) => void }
    }
    values: Values
    functions: Functions
    OS: ReactNative.PlatformOSType
    navigation: {
      push: (route: keyof Config["navigation"]["routes"], params?: { [key: string]: string }) => void
    }
  }
