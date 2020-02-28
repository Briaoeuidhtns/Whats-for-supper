global.console.error = global.console.warn = (msg: any, ...rest: any[]) => {
  throw rest.length ? [msg, ...rest] : msg
}
