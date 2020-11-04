import { AppConfig } from "./config"
import { ArchitectComponent } from "../architect/component"
import { AppCustomHeaderLeft, AppCustomHeaderRight } from "./custom"
import { AppTheme } from "./theme"

export type AppLinksCustom<Props> = (props: Props) => React.ReactNode

export type AppLinksImports<Config extends AppConfig> = {
  pages: { [name in keyof Config["navigation"]["routes"]]: Promise<any> }
  themes?: { [theme: string]: Promise<any> }
  //stores?: { [store: string]: Promise<any> }
  custom?: {
    header?: {
      left?: Promise<any>
      right?: Promise<any>
    }
  }
}

export type AppLinksResolve = {
  pages: { [page: string]: Promise<{ default: ArchitectComponent }> }
  themes?: { [theme: string]: Promise<{ default: AppTheme<any> }> }
  //stores?: { [store: string]: Promise<{ default: string }> }
  custom?: {
    header?: {
      left?: Promise<{ default: AppLinksCustom<AppCustomHeaderLeft> }>
      right?: Promise<{ default: AppLinksCustom<AppCustomHeaderRight> }>
    }
  }
}

export type AppLinks<Config extends AppConfig> = {
  pages: { [name in keyof Config["navigation"]["routes"]]: ArchitectComponent }
  themes?: { [theme: string]: AppTheme<Config> }
  //stores?: { [store: string]: any }
  custom?: {
    header?: {
      left?: AppLinksCustom<AppCustomHeaderLeft>
      right?: AppLinksCustom<AppCustomHeaderRight>
    }
  }
}
