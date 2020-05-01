import * as React from "react"
import { i18nSchema, i18n } from "dropin-recipes"
import { ComponentProps, Component } from "./Component"

interface InputProps extends ComponentProps {
  placeholder?: string|i18nSchema
  placeholderColor?: string
}

export class Input extends Component<InputProps> {

  render() {
    const { placeholder, placeholderColor } = this.props
    const className = "architect" + this.architectId
    let style = "*:focus { outline: none; }"
    if(typeof placeholderColor !== "undefined") {
      style += ` .${className}::placeholder { color: ${placeholderColor}; }`
    }
    return <div>
      <style children={style}/>
      <input
        className={className}
        placeholder={typeof placeholder === "string" ? placeholder : i18n(placeholder as i18nSchema)}
        style={this.state.style}
        children={this.props.children}
      />
    </div>
  }

}
