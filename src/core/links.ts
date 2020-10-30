import { Theme } from "@react-navigation/native"
import { AppComponent, AppConfig } from "./app"
import { CustomHeaderLeft, CustomHeaderRight } from "./custom"

type AppThemeColor<Config extends AppConfig> = string | ((colors: Config["appearance"]["colors"]) => string)

export type AppTheme<Config extends AppConfig> = {
  [color in keyof Theme["colors"]]: AppThemeColor<Config> | {
    dark: AppThemeColor<Config>
    light: AppThemeColor<Config>
  }
}

export type AppLinksCustom<Props> = (props: Props) => React.ReactNode

export type AppLinks<Config extends AppConfig> = {
  themes?: { [theme: string]: AppTheme<Config> }
  pages: { [name in keyof Config["navigation"]["routes"]]: AppComponent }
  stores?: { [store: string]: string }
  custom?: {
    header?: {
      left?: AppLinksCustom<CustomHeaderLeft>
      right?: AppLinksCustom<CustomHeaderRight>
    }
  }
}

export type AppLinksImports<Config extends AppConfig> = {
  themes?: { [theme: string]: Promise<{ default: AppTheme<Config> }> }
  pages: { [name in keyof Config["navigation"]["routes"]]: Promise<{ default: AppComponent }> }
  stores?: { [store: string]: Promise<{ default: string }> }
  custom?: {
    header?: {
      left?: Promise<{ default: AppLinksCustom<CustomHeaderLeft> }>
      right?: Promise<{ default: AppLinksCustom<CustomHeaderRight> }>
    }
  }
}
