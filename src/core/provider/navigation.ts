import { AppConfig } from "../app/config"

export type NavigationActions<Config extends AppConfig> = {
  push: (
    route: keyof Config["navigation"]["routes"],
    params?: { [name: string]: string | number },
  ) => void
}
