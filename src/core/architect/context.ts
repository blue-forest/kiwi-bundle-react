import { Theme } from "@react-navigation/native"
import { ReactNative } from "../../vendors"
import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentStores,
  ArchitectComponentStyle,
  ArchitectComponentValues,
} from "./component"

export type ArchitectContext<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = {},
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores> = any,
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
    stores: { [store in keyof Required<Stores>]: number }
    state: {
      get: { [name in keyof States]: States[name] }
      set: { [name in keyof States]: (v: States[name]) => void }
    }
    values: Values
    functions: Functions
    OS: ReactNative.PlatformOSType
    navigation: {
      push: (route: keyof Config["navigation"]["routes"], params?: { [key: string]: string }) => void
    }
  }
