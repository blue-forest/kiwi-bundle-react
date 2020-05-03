import * as React from "react"
import { i18nSchema, i18n } from "dropin-recipes"
import { ComponentProps, Component } from "./Component"

interface InputProps extends ComponentProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string|i18nSchema
  placeholderColor?: string
  type?: string
  required?: boolean
}

export class Input extends Component<InputProps> {

  private onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange(event.target.value)
  }

  render() {
    const { placeholder, placeholderColor, type, required, children, value } = this.props
    const className = "architect" + this.state.$.architect
    let style = "*:focus { outline: none; }"
    if(typeof placeholderColor !== "undefined") {
      style += ` .${className}::placeholder { color: ${placeholderColor}; }`
    }
    return <div>
      <style children={style}/>
      <input
        required={required}
        type={type}
        className={className}
        placeholder={typeof placeholder === "string" ? placeholder : i18n(placeholder as i18nSchema)}
        style={this.state.$.style}
        children={children}
        value={value}
        onChange={this.onChange.bind(this)}
      />
    </div>
  }

}
