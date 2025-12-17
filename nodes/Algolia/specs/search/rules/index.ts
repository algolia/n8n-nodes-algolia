import { INodeProperties } from 'n8n-workflow';
import clearRulesProperties from './clearRules';
import deleteRuleProperties from './deleteRule';
import getRuleProperties from './getRule';
import saveRuleProperties from './saveRule';
import saveRulesProperties from './saveRules';
import searchRulesProperties from './searchRules';

const operationProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    default: '',
    description: 'Select the operation to work with',
    options: [
      {
        name: 'Retrieve a rule',
        value: 'getRule',
        action: 'Retrieve a rule',
        description: 'Retrieves a rule by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/rules/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Create or replace a rule',
        value: 'saveRule',
        action: 'Create or replace a rule',
        description: "If a rule with the specified object ID doesn't exist, it's created.",
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/rules/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Delete a rule',
        value: 'deleteRule',
        action: 'Delete a rule',
        description: 'Deletes a rule by its ID.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/rules/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Create or update rules',
        value: 'saveRules',
        action: 'Create or update rules',
        description: 'Create or update multiple rules.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/rules/batch',
          },
        },
      },
      {
        name: 'Delete all rules',
        value: 'clearRules',
        action: 'Delete all rules',
        description: 'Deletes all rules from the index.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/rules/clear',
          },
        },
      },
      {
        name: 'Search for rules',
        value: 'searchRules',
        action: 'Search for rules',
        description: 'Searches for rules in your index.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/rules/search',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Rules'],
      },
    },
  },
];

const properties: INodeProperties[] = [
  ...operationProperties,
  ...clearRulesProperties,
  ...deleteRuleProperties,
  ...getRuleProperties,
  ...saveRuleProperties,
  ...saveRulesProperties,
  ...searchRulesProperties,
];

export default properties;
