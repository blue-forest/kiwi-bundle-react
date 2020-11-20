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
      ): StoreBind<Id, Values, Bindings> => ({} as any),
    }
  }
}

/// --------------------------------------------------------------------------

type ImportType<Content extends StoreBind = StoreBind> = Content[]

type ExtractStores<Stores extends ImportType> = Stores extends ImportType<
  infer Bind
>
  ? {
    [store in Bind["id"]]: { get: Bind["get"]; set: Bind["set"] }
  }
  : never

const importStore = <Stores extends ImportType>(
  ...s: Stores
): ExtractStores<Stores> => ({} as any)

/// --------------------------------------------------------------------------

const store1 = newStore("test1")<{ a: string; b: string }>({ a: "", b: "" })
const store2 = newStore("test2")<{ a: string; b2: string }>({ a: "", b2: "" })

const test2 = importStore(store1.bind("a", "b"), store2.bind("a"))
