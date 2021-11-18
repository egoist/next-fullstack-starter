global._singletons = global._singletons || {}

export const singleton = <T>(id: string, factory: () => T): T => {
  if (!global._singletons[id]) {
    global._singletons[id] = factory()
  }
  return global._singletons[id]
}

export const singletonAsync = <T>(
  id: string,
  factory: () => Promise<T>,
  singleton = true,
): { readonly value: T; wait: Promise<void> } => {
  if (global._singletons[id] && singleton) {
    return {
      wait: Promise.resolve(),

      get value() {
        return global._singletons[id]
      },
    }
  }

  let ready = false

  const wait = factory().then((value) => {
    ready = true
    global._singletons[id] = value
  })

  return {
    wait,

    get value() {
      if (!ready) {
        throw new Error(`please await .wait before using the value of '${id}'`)
      }
      return global._singletons[id]
    },
  }
}
