import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentStores,
  ArchitectComponentStyle,
  ArchitectComponentValues,
} from "./component"
import { ArchitectFunctions } from "./functions"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOnUpdate } from "./onUpdate"
import { ArchitectRender } from "./render"
import { ArchitectStates } from "./states"
import { ArchitectStyle } from "./style"
import { ArchitectValues } from "./values"

export type ArchitectSelf<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = any,
  States extends ArchitectComponentStates = {},
  Stores extends ArchitectComponentStores = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {}
  > = {
    style: ArchitectStyle<Config, Links, Props>
    states: ArchitectStates<Config, Links, Props, Style>
    values: ArchitectValues<Config, Links, Props, Style, States, Stores>
    functions: ArchitectFunctions<
      Config,
      Links,
      Props,
      Style,
      States,
      Stores,
      Values
    >
    onInit: ArchitectOnInit<
      Config,
      Links,
      Props,
      Style,
      States,
      Stores,
      Values,
      Functions
    >
    onMount: ArchitectOnMount<
      Config,
      Links,
      Props,
      Style,
      States,
      Stores,
      Values,
      Functions
    >
    onUpdate: ArchitectOnUpdate<
      Config,
      Links,
      Props,
      Style,
      States,
      Stores,
      Values,
      Functions
    >
    onUnmount: ArchitectOnUnmount<
      Config,
      Links,
      Props,
      Style,
      States,
      Stores,
      Values,
      Functions
    >
    render: ArchitectRender<
      Config,
      Links,
      Props,
      Style,
      States,
      Stores,
      Values,
      Functions
    >
  }
