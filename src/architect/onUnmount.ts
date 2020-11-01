import { AppComponent, AppComponentProps } from "../core/app"

export type ArchitectOnUnmount<
  Props extends AppComponentProps
  > = (render: (context: any) => React.ReactElement) => AppComponent<Props>
