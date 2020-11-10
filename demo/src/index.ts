import { i18nSettings, Language } from "dropin-client"
import { KBRD } from "./kbrd"

i18nSettings.setCurrentLanguage(Language.FRENCH) // TEST

KBRD.Render()
