import { Theme } from "@react-navigation/native"
import { ReactNative } from "../../vendors"
import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentStyle,
  ArchitectComponentValues,
} from "./component"

export type ArchitectContext<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = any,
  States extends ArchitectComponentStates = any,
  Values extends ArchitectComponentValues = any,
  Functions extends ArchitectComponentFunctions = any,
  Stores extends string = any,
  > = {
    props: Props
    style: Style
    states: {
      get: { [name in keyof States]: States[name] }
      set: { [name in keyof States]: (v: States[name]) => void }
    }
    values: Values
    functions: Functions
    stores: Required<{ [store in Stores]: any }>
    OS: ReactNative.PlatformOSType
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
    navigation: {
      push: (route: keyof Config["navigation"]["routes"], params?: { [key: string]: string }) => void
    }
  }
