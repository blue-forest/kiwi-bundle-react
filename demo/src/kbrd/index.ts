import { KBRD } from "./app"
import { HomePage } from "./pages/Home"
import { ComponentsPage } from "./pages/Components"
import { ParamsPage } from "./pages/Params"
import { HeaderLeftLayout } from "./layouts/HeaderLight"
import { HeaderRightLayout } from "./layouts/HeaderRight"

KBRD.Render({
  HOME: HomePage,
  COMPONENTS: ComponentsPage,
  PARAMS: ParamsPage,
}, {
  header: {
    left: HeaderLeftLayout,
    right: HeaderRightLayout,
  },
})
