
export const uniqueHash = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const actionWithObjectKey = (object: any, key: string, action: (data: any) => void) => {
  if(typeof object !== "undefined" && typeof object[key] !== "undefined") {
    action(object[key])
  }
}
