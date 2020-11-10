import { ReactNative } from "../../vendors"
import { Language } from "dropin-client"

export type AppConfig = {
  key: string
  navigation: {
    routes: {
      [name: string]: {
        path: string
        title?: string
        header?: {
          hideTitle?: boolean
        }
      }
    }
    prefixes: string[]
  }
  appearance: {
    sizes: { [name: string]: number | string }
    colors: { [name: string]: string }
    header?: {
      hide?: boolean
      style?: ReactNative.Animated.WithAnimatedValue<ReactNative.StyleProp<ReactNative.ViewStyle>>
    }
  }
  i18n?: {
    languages?: Language[]
  }
  platforms?: {
    web?: {
      title?: string | ((page?: string) => string)
    }
    i18n?: {
      urlQueryParam?: string
    }
  }
}
