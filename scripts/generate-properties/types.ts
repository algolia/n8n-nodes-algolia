import { IDisplayOptions, INodeProperties } from 'n8n-workflow';

export interface OperationToSimplify {
  displayOptions: IDisplayOptions;
  value: string;
}

export interface ResourceGroup {
  operationProperty: INodeProperties | null;
  operations: Map<string, INodeProperties[]>;
  simplifyOperations: OperationToSimplify[];
}

export interface GroupedProperties {
  global: INodeProperties[];
  resources: Map<string, ResourceGroup>;
}
