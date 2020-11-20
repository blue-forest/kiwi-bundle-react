export type ArrayFlattening<Type> = Type extends (infer Child)[] ? Child : never

type StoreValues = { [name: string]: any }

type StoreOptions<Values extends StoreValues> = { id: string; values: Values }

type StoreBind<
  Id extends string,
  Values extends StoreValues = {},
  Binding extends (keyof Values)[] = []
  > = {
    id: Id
    get: { [name in ArrayFlattening<Binding>]: Values[name] }
    set: { [name in ArrayFlattening<Binding>]: (data: Values[name]) => void }
  }

function newStore<Values extends StoreValues>(o: StoreOptions<Values>) {
  return {
    get: ({} as any) as { [name in keyof Values]: () => Values[name] },
    set: ({} as any) as { [name in keyof Values]: (d: Values[name]) => void },
    bind: <Binding extends (keyof Values)[]>(
      b: Binding,
    ): StoreBind<typeof o["id"], Values, Binding> =>
      ({
        id: o.id,
        get: {} as any,
        set: {} as any,
      } as const),,
  }
}

/// --------------------------------------------------------------------------

const store = newStore<{ a: string; b: string }>({
  id: "test1" as const,
  values: { a: "", b: "" },
})
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

type ImportType<Content extends StoreBind = StoreBind> = Content[]

function importStore<Bind extends ImportType>(v: Bind) {
  return ({} as any) as Bind extends ImportType<infer S>
    ? {
      test: S
      stores: { [s in S["id"]]: string }
    }
    : never
}

importStore([store.bind(["a"])]).test.id
