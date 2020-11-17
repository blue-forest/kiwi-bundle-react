import { DynamicData } from "../../utils/store"
import { ReactNative } from "../../vendors"

export type AppOptions<Themes = any> = {
  actions: {
    theme: {
      name: DynamicData<Themes>
      scheme: DynamicData<ReactNative.ColorSchemeName>
    }
  }
}
