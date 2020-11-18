export type AppStoreData = { [name: string]: any }

export type AppStore<Data extends AppStoreData> = {
  get: { [name in keyof Data]: () => Data[name] }
  set: { [name in keyof Data]: (data: Data[name]) => void }
  bind: { [name in keyof Data]: (data: Data[name]) => void }
  onUpdate: { [name in keyof Data]: (callback: () => void) => void }
}
