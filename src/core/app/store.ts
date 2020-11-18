import { ArrayFlattening } from "../../utils/types"

export type AppStoreValues = { [name: string]: any }

export type AppStoreOptions<Values extends AppStoreValues> = {
  id: string
  values: Values
}

export type AppStoreBindValues<Values extends AppStoreValues> = (keyof Values)[]

export type AppStoreBind<
  Id extends string,
  Values extends AppStoreValues,
  BindValues extends AppStoreBindValues<Values>
  > = {
    id: Id
    get: { [name in ArrayFlattening<BindValues>]: Values[name] }
    set: { [name in ArrayFlattening<BindValues>]: (data: Values[name]) => void }
  }

export type AppStoreActions<Values extends AppStoreValues> = {
  get: { [name in keyof Values]: () => Values[name] }
  set: { [name in keyof Values]: (data: Values[name]) => void }
}

export type AppStore<
  Id extends string,
  Values extends AppStoreValues
  > = AppStoreActions<Values> & {
    bind: <BindValues extends AppStoreBindValues<Values>>(
      values: BindValues,
    ) => AppStoreBind<Id, Values, BindValues>
  }
