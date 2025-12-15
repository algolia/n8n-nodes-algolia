import { INodeProperties } from 'n8n-workflow';
import { simplifyFields } from '../nodes/overrides/simplify';
import { objectToJavaScript } from '../nodes/utils';
import { OperationToSimplify } from './types';

/** Converts "Api Keys" → "ApiKeys" or "api-keys" → "apiKeys" for valid JS identifiers */
export const toIdentifier = (name: string): string =>
  name.replace(/[-\s]+(.)/g, (_, char) => char.toUpperCase()).replace(/[-\s]+/g, '');

/** Converts "Api Keys" → "api-keys" for folder names */
export const toFolderName = (name: string): string => name.replace(/\s+/g, '-').toLowerCase();

export const generateOperationFileContent = (properties: INodeProperties[]): string => `\
import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = ${objectToJavaScript(properties)};

export default properties;
`;

export const generateResourceIndexContent = (
  operationProperty: INodeProperties | null,
  operationNames: string[],
  simplifyOperations: OperationToSimplify[],
): string => {
  const imports = operationNames
    .map((name) => `import ${name}Properties from './${name}';`)
    .join('\n');

  const spreads = operationNames.map((name) => `  ...${name}Properties,`).join('\n');

  const operationPropertyStr = operationProperty ? objectToJavaScript([operationProperty]) : '[]';

  const simplifyPropertyStr =
    simplifyOperations.length > 0
      ? `,\n  ${objectToJavaScript([simplifyFields(simplifyOperations)]).slice(1, -1)}`
      : '';

  return `\
import { INodeProperties } from 'n8n-workflow';
${imports}

const operationProperties: INodeProperties[] = ${operationPropertyStr};

const properties: INodeProperties[] = [
  ...operationProperties${simplifyPropertyStr},
${spreads}
];

export default properties;
`;
};

export const generateGlobalIndexContent = (
  globalProperties: INodeProperties[],
  resourceNames: string[],
): string => {
  const imports = resourceNames
    .map((name) => `import ${toIdentifier(name)}Properties from './${toFolderName(name)}';`)
    .join('\n');
  const spreads = resourceNames.map((name) => `  ...${toIdentifier(name)}Properties,`).join('\n');

  return `\
import { INodeProperties } from 'n8n-workflow';
${imports}

const resourceProperties: INodeProperties[] = ${objectToJavaScript(globalProperties)};

const properties: INodeProperties[] = [
  ...resourceProperties,
${spreads}
];

export default properties;
`;
};
