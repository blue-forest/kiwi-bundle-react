type StoreValues = { [name: string]: any }

type StoreBindValues<Values extends StoreValues> = (keyof Values)[]

interface StoreActions<Values extends StoreValues> {
  get: { [name in keyof Values]: () => Values[name] }
  set: { [name in keyof Values]: (d: Values[name]) => void }
}

type StoreBind<
  Id extends string = any,
  Values extends StoreValues = any,
  Bindings extends StoreBindValues<Values> = any
  > = {
    id: Id
    get: { [value in Bindings extends (infer J)[] ? J : never]: Values[value] }
    set: {
      [value in Bindings extends (infer J)[] ? J : never]: (
        data: Values[value],
      ) => void
    }
  }

function newStore<Id extends string>(id: Id) {
  return <Values extends StoreValues>(values: Values) => {
    const actions: StoreActions<Values> = { get: {} as any, set: {} as any }
    return {
      ...actions,
      bind: <Bindings extends StoreBindValues<Values>>(
        ...bindings: Bindings
      ): StoreBind<Id, Values, Bindings> => ({ actions, bindings, id }),
    }
  }
}

/// --------------------------------------------------------------------------

type ImportType<
  Id extends string = any,
  Values extends StoreValues = any,
  Bindings extends StoreBindValues<Values> = any
  > = StoreBind<Id, Values, Bindings>[]

type Test<
  Values extends StoreValues = any,
  Bindings extends StoreBindValues<Values> = any
  > = Bindings extends (infer J)[] ? J : never

function importStore<Stores extends ImportType>(...s: Stores) {
  return ({} as any) as Stores extends ImportType<
    infer Id,
    infer Values,
    infer Bindings
  >
    ? {
      stores: {
        [store in Id]: {
          get: { [value in Test<Values, Bindings>]: Values[value] }
          set: {
            [value in Bindings extends (infer J)[] ? J : never]: (
              data: Values[value],
            ) => void
          }
        }
      }
    }
    : never
}

/// --------------------------------------------------------------------------

const store = newStore("test1")<{ a: string; b: string }>({ a: "", b: "" })
const A = store.get.a()
store.set.a("")
store.bind("a").id

const test2 = importStore(store.bind("a")).stores.test1.get.a
