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
    bindings: Bindings
    actions: StoreActions<Values>
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

const store = newStore("test1")<{ a: string; b: string }>({ a: "", b: "" })
const A = store.get.a()
store.set.a("")
store.bind("a").id
store.bind("a", "b").bindings

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

function importStore<Stores extends ImportType>(s: Stores) {
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

/*const run1 = <P extends Readonly<("a" | "b" | "c")[]>>(p: P): P => p
const test1 = run1([ "a", "b" ] as const)

const run2 = (p: Readonly<("a" | "b" | "c")[]>): typeof p => p
const test2 = run2([ "a", "b" ])

const run3 = <P extends readonly ("a" | "b" | "c")[]>(p: P): [ (P extends (infer J)[] ? J: never) ] => ({} as any)
const test3 = run3([ "a", "b" ])

const run4 = <P extends Readonly<("a" | "b" | "c")[]>>(p: P): Readonly<P> => ({} as any)
const test4 = run4([ "a", "b" ])

type test5 = ["a" | "b"]
type test51 = test5 extends (infer J)[] ? J: never
type test52 = Record<(test5 extends (infer J)[] ? J: never), {}>
type test53 = [...test5]

const run6 = <P extends ("a" | "b" | "c")[]>(...p: P): P => ({} as any)
const test6 = run6("a", "b")*/
