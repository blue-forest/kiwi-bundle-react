import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { AppStyleSheet } from "../app/styles"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentValues,
} from "./component"
import { ArchitectFunctions } from "./functions"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOnUpdate } from "./onUpdate"
import { ArchitectRender } from "./render"
import { ArchitectStates } from "./states"
import { ArchitectStores } from "./stores"
import { ArchitectStyle } from "./style"
import { ArchitectValues } from "./values"

export type ArchitectSelf<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends AppStyleSheet = any,
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {}
  > = {
    style: ArchitectStyle<Config, Links, Props>
    states: ArchitectStates<Config, Links, Props, Style>
    stores: ArchitectStores<Config, Links, Props, Style, States>
    values: ArchitectValues<Config, Links, Props, Style, States>
    functions: ArchitectFunctions<Config, Links, Props, Style, States, Values>
    onInit: ArchitectOnInit<
      Config,
      Links,
      Props,
      Style,
      States,
      Values,
      Functions
    >
    onMount: ArchitectOnMount<
      Config,
      Links,
      Props,
      Style,
      States,
      Values,
      Functions
    >
    onUpdate: ArchitectOnUpdate<
      Config,
      Links,
      Props,
      Style,
      States,
      Values,
      Functions
    >
    onUnmount: ArchitectOnUnmount<
      Config,
      Links,
      Props,
      Style,
      States,
      Values,
      Functions
    >
    render: ArchitectRender<
      Config,
      Links,
      Props,
      Style,
      States,
      Values,
      Functions
    >
  }
