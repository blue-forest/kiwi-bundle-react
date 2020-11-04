import { Store } from "../../utils/store"
import { ReactNative } from "../../vendors"

export type AppOptions<Themes = any> = {
  actions: {
    theme: {
      name: Store<Themes>
      scheme: Store<ReactNative.ColorSchemeName>
    }
  }
}

