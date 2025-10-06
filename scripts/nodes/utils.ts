const objectToJavaScript = (obj: any, indent = 0): string => {
  const spacing = '  '.repeat(indent);

  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (typeof obj === 'string') return `'${obj.replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  if (typeof obj === 'function') return obj.toString();

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj
      .map((item) => `\n${spacing}  ${objectToJavaScript(item, indent + 1)}`)
      .join(',');
    return `[${items}\n${spacing}]`;
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    const items = keys
      .map((key) => {
        const value = objectToJavaScript(obj[key], indent + 1);
        return `\n${spacing}  "${key}": ${value}`;
      })
      .join(',');
    return `{${items}\n${spacing}}`;
  }

  return String(obj);
};

export { objectToJavaScript };
