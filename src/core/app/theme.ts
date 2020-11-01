import { Theme } from "@react-navigation/native"
import { AppConfig } from "./config"

type AppThemeColor<Config extends AppConfig> = string | ((colors: Config["appearance"]["colors"]) => string)

export type AppTheme<Config extends AppConfig> = {
  [color in keyof Theme["colors"]]: AppThemeColor<Config> | {
    dark: AppThemeColor<Config>
    light: AppThemeColor<Config>
  }
}
