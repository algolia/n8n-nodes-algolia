import fs from 'fs/promises';
import path from 'path';
import {
  generateGlobalIndexContent,
  generateOperationFileContent,
  generateResourceIndexContent,
  toFolderName,
} from './templates';
import { GroupedProperties } from './types';

const ensureDir = async (dirPath: string): Promise<void> => {
  await fs.mkdir(dirPath, { recursive: true });
};

export const writeGeneratedFiles = async (
  outputDir: string,
  grouped: GroupedProperties,
): Promise<void> => {
  await ensureDir(outputDir);

  const resourceNames: string[] = [];

  for (const [resourceName, resourceGroup] of grouped.resources) {
    resourceNames.push(resourceName);
    const resourceDir = path.join(outputDir, toFolderName(resourceName));
    await ensureDir(resourceDir);

    const operationNames: string[] = [];

    // Write operation files
    for (const [operationName, operationProperties] of resourceGroup.operations) {
      operationNames.push(operationName);
      const operationFilePath = path.join(resourceDir, `${operationName}.ts`);
      await fs.writeFile(operationFilePath, generateOperationFileContent(operationProperties));
    }

    // Write resource index
    const resourceIndexPath = path.join(resourceDir, 'index.ts');
    const resourceIndexContent = generateResourceIndexContent(
      resourceGroup.operationProperty,
      operationNames,
      resourceGroup.simplifyOperations,
    );
    await fs.writeFile(resourceIndexPath, resourceIndexContent);
  }

  // Write global index
  const globalIndexPath = path.join(outputDir, 'index.ts');
  await fs.writeFile(globalIndexPath, generateGlobalIndexContent(grouped.global, resourceNames));
};
