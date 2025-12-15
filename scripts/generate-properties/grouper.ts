import { INodeProperties } from 'n8n-workflow';
import { indexName } from '../nodes/overrides/indexName';
import { attachPostReceive } from '../nodes/overrides/simplify';
import { GroupedProperties, OperationToSimplify, ResourceGroup } from './types';

const getResourceFromDisplayOptions = (property: INodeProperties): string | null => {
  const resourceShow = property.displayOptions?.show?.resource;
  if (Array.isArray(resourceShow) && resourceShow.length === 1) {
    return String(resourceShow[0]);
  }
  return null;
};

const getOperationFromDisplayOptions = (property: INodeProperties): string | null => {
  const operationShow = property.displayOptions?.show?.operation;
  if (Array.isArray(operationShow) && operationShow.length === 1) {
    return String(operationShow[0]);
  }
  return null;
};

const applyPropertyOverrides = (property: INodeProperties): INodeProperties => {
  if (property.name === 'indexName_string') {
    return indexName(property) as INodeProperties;
  }
  return property;
};

const processOperationForSimplify = (
  property: INodeProperties,
): { property: INodeProperties; simplifyOperations: OperationToSimplify[] } => {
  const simplifyOperations: OperationToSimplify[] = [];

  property.options?.forEach((option) => {
    if (
      'inputSchema' in option &&
      option.inputSchema?.simplifiedOutput &&
      property.displayOptions
    ) {
      attachPostReceive(option);
      simplifyOperations.push({
        displayOptions: property.displayOptions,
        value: String(option.value),
      });
    }
  });

  return { property, simplifyOperations };
};

const createEmptyResourceGroup = (): ResourceGroup => ({
  operationProperty: null,
  operations: new Map(),
  simplifyOperations: [],
});

const ensureResourceGroup = (
  resources: Map<string, ResourceGroup>,
  resource: string,
): ResourceGroup => {
  if (!resources.has(resource)) {
    resources.set(resource, createEmptyResourceGroup());
  }
  return resources.get(resource)!;
};

export const groupPropertiesByResourceAndOperation = (
  properties: INodeProperties[],
): GroupedProperties => {
  const grouped: GroupedProperties = {
    global: [],
    resources: new Map(),
  };

  for (const property of properties) {
    const overriddenProperty = applyPropertyOverrides(property);
    const resource = getResourceFromDisplayOptions(overriddenProperty);
    const operation = getOperationFromDisplayOptions(overriddenProperty);

    // Resource selector → global
    if (overriddenProperty.name === 'resource') {
      grouped.global.push(overriddenProperty);
      continue;
    }

    // Operation selector → resource group
    if (overriddenProperty.name === 'operation' && resource) {
      const resourceGroup = ensureResourceGroup(grouped.resources, resource);
      const { property: processedOp, simplifyOperations } =
        processOperationForSimplify(overriddenProperty);
      resourceGroup.operationProperty = processedOp;
      resourceGroup.simplifyOperations = simplifyOperations;
      continue;
    }

    // Field with resource + operation → operation group
    if (resource && operation) {
      const resourceGroup = ensureResourceGroup(grouped.resources, resource);
      if (!resourceGroup.operations.has(operation)) {
        resourceGroup.operations.set(operation, []);
      }
      resourceGroup.operations.get(operation)!.push(overriddenProperty);
      continue;
    }
  }

  return grouped;
};
