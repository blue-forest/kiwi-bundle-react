import { Actions } from "../../utils/actions"
import { ReactNative } from "../../vendors"

export type AppOptions<Themes = any> = {
  actions: {
    theme: {
      name: Actions<Themes>
      scheme: Actions<ReactNative.ColorSchemeName>
    }
  }
}

