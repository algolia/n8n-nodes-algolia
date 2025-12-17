import { INodeProperties } from 'n8n-workflow';
import deleteIndexProperties from './deleteIndex';
import getSettingsProperties from './getSettings';
import getTaskProperties from './getTask';
import listIndicesProperties from './listIndices';
import operationIndexProperties from './operationIndex';
import setSettingsProperties from './setSettings';

const operationProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    default: '',
    description: 'Select the operation to work with',
    options: [
      {
        name: 'Delete an index',
        value: 'deleteIndex',
        action: 'Delete an index',
        description: 'Deletes an index and all its settings.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/indexes/{{ $parameter.indexName_string }}',
          },
        },
      },
      {
        name: 'Retrieve index settings',
        value: 'getSettings',
        action: 'Retrieve index settings',
        description: 'Retrieves an object with non-null index settings.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/settings',
          },
          output: {
            postReceive: [
              async function (items) {
                const simple = this.getNodeParameter('simplify', 0);
                if (!simple) return items;
                return items.map((item) => {
                  const json = item.json || {};
                  const simplified = new Map();
                  [
                    'advancedSyntax',
                    'advancedSyntaxFeatures',
                    'allowCompressionOfIntegerArray',
                    'allowTyposOnNumericTokens',
                    'alternativesAsExact',
                    'attributeCriteriaComputedByMinProximity',
                    'attributeForDistinct',
                    'attributesForFaceting',
                    'attributesToHighlight',
                    'attributesToRetrieve',
                  ].forEach((f) => {
                    if (json[f] !== undefined) simplified.set(f, json[f]);
                  });
                  return { json: Object.fromEntries(simplified) };
                });
              },
            ],
          },
        },
        inputSchema: {
          simplifiedOutput: [
            'advancedSyntax',
            'advancedSyntaxFeatures',
            'allowCompressionOfIntegerArray',
            'allowTyposOnNumericTokens',
            'alternativesAsExact',
            'attributeCriteriaComputedByMinProximity',
            'attributeForDistinct',
            'attributesForFaceting',
            'attributesToHighlight',
            'attributesToRetrieve',
          ],
        },
      },
      {
        name: 'Update index settings',
        value: 'setSettings',
        action: 'Update index settings',
        description: 'Update the specified index settings.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/settings',
          },
        },
      },
      {
        name: 'Check task status',
        value: 'getTask',
        action: 'Check task status',
        description: 'Checks the status of a given task.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/task/{{ $parameter.taskID_number }}',
          },
        },
      },
      {
        name: 'Copy or move an index',
        value: 'operationIndex',
        action: 'Copy or move an index',
        description: 'Copies or moves (renames) an index within the same Algolia application.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/operation',
          },
        },
      },
      {
        name: 'List indices',
        value: 'listIndices',
        action: 'List indices',
        description: 'Lists all indices in the current Algolia application.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/indexes',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Indices'],
      },
    },
  },
];

const properties: INodeProperties[] = [
  ...operationProperties,

  {
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: false,
    description: 'Whether to return a simplified version of the response instead of the raw data',
    displayOptions: {
      show: {
        resource: ['Indices'],
        operation: ['getSettings'],
      },
    },
  },
  ...deleteIndexProperties,
  ...getSettingsProperties,
  ...getTaskProperties,
  ...listIndicesProperties,
  ...operationIndexProperties,
  ...setSettingsProperties,
];

export default properties;
