import { Theme } from "@react-navigation/native"
import { ArrayFlattening } from "../../utils/types"
import { ReactNative } from "../../vendors"
import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { AppStoreBind } from "../app/store"
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
  Style extends ArchitectComponentStyle = any,
  States extends ArchitectComponentStates = {},
  Stores extends ArchitectComponentStores = [],
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {}
  > = {
    props: Props
    style: Style
    states: {
      get: { [name in keyof States]: States[name] }
      set: { [name in keyof States]: (v: States[name]) => void }
    }
    stores: Stores extends ArchitectComponentStores<infer Id>
    ? {
      test: Id // { [name in Id]: any }
    }
    : never
    values: Values
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
        params?: { [key: string]: string },
      ) => void
    }
    update: () => void
  }
