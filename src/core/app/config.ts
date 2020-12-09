import { ReactNative } from "../../vendors"
import { Language, NameField_ByLanguage } from "dropin-client"
import { LinkingOptions } from "@react-navigation/native"

export type AppConfig = {
  key: string
  navigation: {
    routes: {
      [name: string]: {
        path: string
        title?: string | NameField_ByLanguage<string>
        header?: {
          hideTitle?: boolean
        }
      }
    }
    getStateFromPath?: LinkingOptions["getStateFromPath"]
    getPathFromState?: LinkingOptions["getPathFromState"]
    prefixes: string[]
  }
  appearance: {
    sizes: { [name: string]: number | string }
    colors: { [name: string]: string }
    header?: {
      hide?: boolean
      style?: ReactNative.Animated.WithAnimatedValue<
        ReactNative.StyleProp<ReactNative.ViewStyle>
      >
    }
  }
  i18n?: {
    languages?: Language[]
  }
  platforms?: {
    web?: {
      title?: string | ((page?: string) => string)
      i18n?: {
        urlQueryParam?: string
      }
    }
  }
}
