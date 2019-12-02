export = index

declare class index {
  constructor(options: any)
  options: any
  compilationResult: any
  apply(compiler: any): void
  compileHandler(compiler: any, compilation: any, cb: any): void
  emitHandler(compiler: any): void
  emitProccess(compilation: any, cb: any): void
  guessAppName(pwd: any): any
  hooksHandler(compilation: any): void
  htmlProccessingFn(htmlPluginData: any, cb: any): void
  pluginHandler(compilation: any): void
}
