const objectToJavaScript = (obj: any): string => {
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (typeof obj === 'string') return `'${obj.replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  if (typeof obj === 'function') return obj.toString();

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj.map((item) => `${objectToJavaScript(item)}`).join(',');
    return `[${items}]`;
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    const items = keys
      .map((key) => {
        const value = objectToJavaScript(obj[key]);
        return `${key}: ${value}`;
      })
      .join(',');
    return `{${items}}`;
  }

  return String(obj);
};

export { objectToJavaScript };
