import { readFileSync, writeFileSync } from 'fs';
import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import properties from '../nodes/Algolia/specs/search/index';

const getOperationsForResource = (properties: INodeProperties[], resource: string) =>
  properties
    .filter(
      (p) =>
        p.name === 'operation' &&
        p.displayOptions &&
        p.displayOptions.show?.resource?.includes(resource),
    )
    .map((p) => p.options)
    .flat() as INodePropertyOptions[];

const generateContent = () => {
  const resources = properties
    .filter((p) => p.name === 'resource')
    .map((r) => r.options?.map((o) => o.name))
    .flat()
    .filter((r) => r !== undefined) as string[];

  const resourceOperations = resources.map((resourceName) => {
    return { name: resourceName, operations: getOperationsForResource(properties, resourceName) };
  });

  return resourceOperations
    .map((r) => {
      return `### ${r.name}${r.operations.map((o) => `\n- **${o?.name}** - ${o.description?.split('\n')[0]}`).join('')}`;
    })
    .join(`\n\n`);
};

const insertContent = (content: string) => {
  const filePath = 'README.md';
  const text = readFileSync(filePath, 'utf8');
  const newContent = `\n${content} \n`;
  const pattern = /(<!-- OPERATIONS START -->)([\s\S]*?)(<!-- OPERATIONS END -->)/;

  const updated = text.replace(pattern, `$1${newContent} $3`);
  writeFileSync(filePath, updated, 'utf8');
};

insertContent(generateContent());
