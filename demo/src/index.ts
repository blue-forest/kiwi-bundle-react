import { KBRD } from "./bundle"
import { HomePage } from "./pages/Home"
import { ComponentsPage } from "./pages/Components"
import { ParamsPage } from "./pages/Params"

KBRD.Render({
  HOME: HomePage,
  COMPONENTS: ComponentsPage,
  PARAMS: ParamsPage,
})
