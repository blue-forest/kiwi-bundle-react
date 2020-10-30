import { Theme } from "@react-navigation/native"
import { AppComponent, AppConfig } from "./app"
import { CustomHeaderLeft, CustomHeaderRight } from "./custom"

type AppThemeColor<Colors> = string | ((colors: Colors) => string)

export type AppTheme<Colors> = {
  [color in keyof Theme["colors"]]: AppThemeColor<Colors> | {
    dark: AppThemeColor<Colors>
    light: AppThemeColor<Colors>
  }
}

export type AppLinksCustom<Props> = (props: Props) => React.ReactNode

export type AppLinks<Config extends AppConfig = any> = {
  themes?: { [theme: string]: AppTheme<Config["appearance"]["colors"]> }
  pages: { [name in keyof Config["navigation"]["routes"]]: AppComponent<any> }
  stores?: { [store: string]: string }
  custom?: {
    header?: {
      left?: AppLinksCustom<CustomHeaderLeft>
      right?: AppLinksCustom<CustomHeaderRight>
    }
  }
}

export type AppLinksImports<Config extends AppConfig> = {
  themes?: { [theme: string]: Promise<{ default: AppTheme<Config["appearance"]["colors"]> }> }
  pages: { [name in keyof Config["navigation"]["routes"]]: Promise<{ default: AppComponent<any> }> }
  stores?: { [store: string]: Promise<{ default: string }> }
  custom?: {
    header?: {
      left?: Promise<{ default: AppLinksCustom<CustomHeaderLeft> }>
      right?: Promise<{ default: AppLinksCustom<CustomHeaderRight> }>
    }
  }
}
