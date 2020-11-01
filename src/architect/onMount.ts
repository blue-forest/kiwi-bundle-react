import { AppComponent, AppComponentProps } from "../core/app"

export type ArchitectOnMount<
  Props extends AppComponentProps
  > = (render: (context: any) => React.ReactElement) => AppComponent<Props>
