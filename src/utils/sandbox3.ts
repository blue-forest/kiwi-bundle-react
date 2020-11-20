type StoreValues = { [name: string]: any }

type StoreBindValues<Values extends StoreValues> = Readonly<(keyof Values)[]>

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
    readonly bindings: Readonly<Bindings>
    actions: StoreActions<Values>
  }

function newStore<Id extends string>(id: Id) {
  return <Values extends StoreValues>(values: Values) => {
    const actions: StoreActions<Values> = { get: {} as any, set: {} as any }
    return {
      ...actions,
      bind: <Bindings extends StoreBindValues<Values>>(
        bindings: Bindings,
      ): StoreBind<Id, Values, Bindings> => ({ actions, bindings, id }),,
    }
  }
}

/// --------------------------------------------------------------------------

const store = newStore("test1")<{ a: string; b: string }>({ a: "", b: "" })
const A = store.get.a()
store.set.a("")
store.bind(["a"]).id
store.bind(["a"]).bindings

/// --------------------------------------------------------------------------

type ImportType<
  Id extends string = any,
  Values extends StoreValues = any,
  Bindings extends Readonly<StoreBindValues<Values>> = any
  > = Readonly<StoreBind<Id, Values, Bindings>[]>

type Test<
  Values extends StoreValues = any,
  Bindings extends Readonly<StoreBindValues<Values>> = any
  > = Bindings extends readonly (infer J)[] ? Readonly<J> : never

function importStore<Stores extends ImportType>(s: Readonly<Stores>) {
  return ({} as any) as Stores extends ImportType<
    infer Id,
    infer Values,
    infer Bindings
  >
    ? {
      test: Bindings
      stores: {
        [store in Id]: {
          get: { [value in Test<Values, Bindings>]: Values[value] }
          set: {
            [value in Bindings extends readonly (infer J)[] ? J : never]: (
              data: Values[value],
            ) => void
          }
        }
      }
    }
    : never
}

importStore([store.bind(["a"] as const)]).test

importStore([store.bind(["a"])]).test

importStore([store.bind(["a"] as const)]).stores.test1.get

importStore([store.bind(["a"])]).stores.test1.get

importStore([store.bind(["a"])]).stores.test1.set

/*type Bind = Readonly<{ readonly id: string, readonly values: readonly string[] }>
type Store<Content extends Bind = Bind> = Content[]
function run<T extends Store>(_: T): T extends Store<infer S> ? { [s in S["id"]]: {
    test: { [value: (S["values"] extends readonly (infer J)[] ? J : never)]: any }
} } : never { return {} as any }
run([ { id: "a", values: [ "1" ] } as const ]).a.test*/

/*const arrayToObject = <A extends Readonly<string[]>>(a: A): { [a in (A extends readonly (infer J)[] ? J : never)]: any } => ({} as any)
arrayToObject([ "a", "b" ] as const).b*/
