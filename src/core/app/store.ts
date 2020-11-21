export type AppStoreBinding = (onUpdate: () => void) => void

export type AppStoreValues = { [name: string]: any }

export type AppStore<Values extends AppStoreValues = any> = {
  get: { [name in keyof Values]: () => Values[name] }
  set: { [name in keyof Values]: (data: Values[name]) => void }
  bind: <BindValues extends (keyof Values)[]>(
    values: BindValues,
  ) => AppStoreBinding
}
