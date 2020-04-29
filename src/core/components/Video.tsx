import * as React from "react"
import { LanguagesObject_IncludeAll, i18nSettings } from "dropin-recipes"
import { ComponentProps, Component } from "./Component"

interface VideoProps extends ComponentProps {
  sources: string[]|LanguagesObject_IncludeAll<string[]>
  id: string
  muted?: boolean
  autoPlay?: boolean
  loop?: boolean
}

export class Video extends Component<VideoProps> {

  render() {
    const { sources, id, muted, autoPlay, loop } = this.props

    let finalSources: string[] = []
    if(!Array.isArray(sources)) {
      const sourcesAsLanguages = sources as LanguagesObject_IncludeAll<string[]>
      if(typeof sourcesAsLanguages[i18nSettings.getCurrentLanguage()] !== "undefined") {
        finalSources = sourcesAsLanguages[i18nSettings.getCurrentLanguage()]
      } else if(typeof sourcesAsLanguages[i18nSettings.getDefaultLanguage()] !== "undefined") {
        finalSources =  sourcesAsLanguages[i18nSettings.getDefaultLanguage()]
      }
    } else {
      finalSources = sources
    }

    return <video key={id} style={this.state.style} muted={muted} autoPlay={autoPlay} loop={loop}>
      {finalSources.map((source, index) => {
        const split = source.split(".")
        const format = split[split.length - 1]
        return <source key={`${id}-${index}`} src={source} type={`video/${format}`}/>
      })}
      {this.props.children}
    </video>
  }

}
