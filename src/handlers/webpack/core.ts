import { Environment } from "dropin-recipes"

type WebpackCallback = () => any[]

interface WebpackConfigParams {
  common?: any[]|WebpackCallback
  development?: WebpackCallback
  production?: WebpackCallback
}

export class WebpackConfig implements WebpackConfigParams {
  common?: any[]|WebpackCallback
  development?: WebpackCallback
  production?: WebpackCallback

  constructor(commonOrParams: any[]|WebpackConfigParams) {
    if(Array.isArray(commonOrParams)) {
      this.common = commonOrParams
    } else {
      this.common = commonOrParams.common
      this.development = commonOrParams.development
      this.production = commonOrParams.production
    }
  }

  generate(env: Environment) {
    if(Array.isArray(this.common)) {
      return this.common
    } else {
      let final = []
      if(typeof this.common !== "undefined") {
        final = this.common()
      }
      if(env === Environment.DEVELOPMENT) {
        if(typeof this.development !== "undefined") {
          final = final.concat(this.development())
        }
      } else if(env === Environment.PRODUCTION) {
        if(typeof this.production !== "undefined") {
          final = final.concat(this.production())
        }
      }
      return final
    }
  }

}
