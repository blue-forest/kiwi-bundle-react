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

export type AppLinksImports<Config extends AppConfig> = () => {
  pages: { [name in keyof Config["navigation"]["routes"]]: Promise<any> }
  themes?: { [theme: string]: Promise<any> }
  stores?: { [store: string]: Promise<any> }
  custom?: {
    header?: {
      left?: Promise<any>
      right?: Promise<any>
    }
  }
}

export type AppLinksResolve = {
  pages: { [page: string]: Promise<{ default: AppComponent }> }
  themes?: { [theme: string]: Promise<{ default: AppTheme<any> }> }
  stores?: { [store: string]: Promise<{ default: string }> }
  custom?: {
    header?: {
      left?: Promise<{ default: AppLinksCustom<CustomHeaderLeft> }>
      right?: Promise<{ default: AppLinksCustom<CustomHeaderRight> }>
    }
  }
}

export type AppLinks<Config extends AppConfig> = {
  pages: { [name in keyof Config["navigation"]["routes"]]: AppComponent }
  themes?: { [theme: string]: AppTheme<Config> }
  stores?: { [store: string]: string }
  custom?: {
    header?: {
      left?: AppLinksCustom<CustomHeaderLeft>
      right?: AppLinksCustom<CustomHeaderRight>
    }
  }
}
