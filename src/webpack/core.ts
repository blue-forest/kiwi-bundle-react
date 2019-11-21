
export enum WebpackMode {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
}

type WebpackCallback = () => any[]


interface WebpackConfigParams {
  common?: any[]|WebpackCallback
  development?: WebpackCallback
  production?: WebpackCallback
}

export default class WebpackConfig implements WebpackConfigParams {
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

  generate(mode: WebpackMode) {
    if(Array.isArray(this.common)) {
      return this.common
    } else {
      let final = []
      if(typeof this.common !== "undefined") {
        final = this.common()
      }
      if(mode === WebpackMode.DEVELOPMENT) {
        if(typeof this.development !== "undefined") {
          final = final.concat(this.development())
        }
      } else if(mode === WebpackMode.PRODUCTION) {
        if(typeof this.production !== "undefined") {
          final = final.concat(this.production())
        }
      }
      return final
    }
  }

}
