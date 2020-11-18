export type AppStoreValues<Values extends AppStoreValues<Values>> = {
  [name in keyof Values]: Values[name]
}

export type AppStoreOptions<Values extends AppStoreValues<Values>> = {
  id: string
  values: Values
}

export type AppStoreBindValues<
  Values extends AppStoreValues<Values>
  > = (keyof Values)[]

type ArrayFlattening<Type> = Type extends (infer Child)[] ? Child : never

export type AppStoreBind<
  Values extends AppStoreValues<Values>,
  BindValues extends AppStoreBindValues<Values>
  > = {
    id: string
    get: { [name in ArrayFlattening<BindValues>]: Values[name] }
    set: { [name in ArrayFlattening<BindValues>]: (data: Values[name]) => void }
  }

export type AppStore<Values extends AppStoreValues<Values>> = {
  get: { [name in keyof Values]: () => Values[name] }
  set: { [name in keyof Values]: (data: Values[name]) => void }
  bind: <BindValues extends AppStoreBindValues<Values>>(
    values: BindValues,
  ) => AppStoreBind<Values, BindValues>
}
