export const utf8ToHex = (str: string) =>
  [...str]
    .map(c =>
      c.charCodeAt(0) < 128
        ? // Single byte char
          c.charCodeAt(0).toString(16)
        : // Multibyte char
          encodeURIComponent(c)
            .replace(/%/g, '')
            .toLowerCase()
    )
    .join('')
