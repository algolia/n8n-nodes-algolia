import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const simplifyFields = (operationsToSimplify: any[]): INodeProperties => {
  const resourceShow = new Set(
    operationsToSimplify
      .map((operation) => operation.displayOptions.show)
      .flatMap((show) => Object.values(show))
      .flat() as string[],
  );

  const operationShow = new Set(operationsToSimplify.map((operation) => operation.value));

  return {
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: false,
    description: 'Whether to return a simplified version of the response instead of the raw data',
    displayOptions: {
      show: {
        resource: Array.from(resourceShow),
        operation: Array.from(operationShow),
      },
    },
  };
};

const attachPostReceive = (option: INodePropertyOptions) => {
  const simplifiedOutput = option.inputSchema?.simplifiedOutput;

  if (!simplifiedOutput || !Array.isArray(simplifiedOutput)) {
    return;
  }

  // Precompute the function string with the simplifiedOutput value
  const functionString = `async function (items) {
    const simple = this.getNodeParameter('simplify', 0);
    if (!simple) return items;
    return items.map((item) => {
      const json = item.json || {};
      const simplified = new Map();
      ${JSON.stringify(simplifiedOutput)}.forEach((f) => {
        if (json[f] !== undefined) simplified.set(f, json[f]);
      });
      return { json: Object.fromEntries(simplified) };
    });
  }`;

  // Convert the string back to a function
  const postReceiveFunction = eval(`(${functionString})`);

  option.routing = {
    ...option.routing,
    output: {
      ...option.routing?.output,
      postReceive: [postReceiveFunction],
    },
  };
};

export { attachPostReceive, simplifyFields };
