global.console.error = global.console.warn = (msg: any, ...rest: any[]) => {
  throw rest.length ? [msg, ...rest] : msg
}

// Explicitly silence `error TS1208: All files must be modules when the '--isolatedModules' flag is provided.`
export {}
