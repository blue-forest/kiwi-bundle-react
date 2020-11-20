export type ArrayFlattening<Type> = Type extends (infer Child)[] ? Child : never

type StoreValues = { [name: string]: any }

type StoreBind<
  Id extends string = any,
  Values extends StoreValues = {},
  Binding extends (keyof Values)[] = []
  > = {
    id: Id
    get: { [name in ArrayFlattening<Binding>]: Values[name] }
    set: { [name in ArrayFlattening<Binding>]: (data: Values[name]) => void }
  }

function newStore<Id extends string>(id: Id) {
  return <Values extends StoreValues>(values: Values) => {
    return {
      get: ({} as any) as { [name in keyof Values]: () => Values[name] },
      set: ({} as any) as { [name in keyof Values]: (d: Values[name]) => void },
      bind: <Bindings extends (keyof Values)[]>(
        b: Bindings,
      ): StoreBind<Id, Values, Bindings> => ({
        id,
        get: {} as any,
        set: {} as any,
      }),
    }
  }
}

/// --------------------------------------------------------------------------

const store = newStore("test1")<{ a: string; b: string }>({ a: "", b: "" })
const A = store.get.a()
store.set.a("")

store.bind(["a"]).id
store.bind(["a"]).get.a
store.bind(["a"]).set.a("")
store.bind(["a"]).set.b

/// --------------------------------------------------------------------------

/*type Store<Content extends { id: string } = { id: string }> = Content[]
function run<T extends Store>(_: T): T extends Store<infer S> ? { [s in S["id"]]: string } : never { return {} as any }
run([ { id: "a" as const } ])*/

//type ImportType<Content extends StoreBind = StoreBind> = Content[]

type ImportType<
  Id extends string = any,
  Values extends StoreValues = {},
  Binding extends (keyof Values)[] = []
  > = StoreBind<Id, Values, Binding>[]

function importStore<Bindings extends ImportType>(b: Bindings) {
  return ({} as any) as Bindings extends ImportType<
    infer Id,
    infer Values,
    infer Rest
  >
    ? {
      test: Bindings
      stores: {
        [store in Id]: {
          test: Rest
          // get: Bindings ["get"]
          //set: { [name in ArrayFlattening<BindValues>]: (data: Values[name]) => void }
        }
      }
    }
    : never
}

const test = store.bind(["a"])

importStore([store.bind(["a"])]).stores.test1.test

importStore([store.bind(["a"])]).test
