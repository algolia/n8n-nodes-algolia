import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    "type": 'json',
    "displayName": 'Body',
    "name": 'body',
    "default": '[]',
    "description": 'Rules to add or replace.',
    "required": true,
    "routing": {
      "request": {
        "body": '={{ $value }}'
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Rules'
        ],
        "operation": [
          'saveRules'
        ]
      }
    }
  },
  {
    "type": 'options',
    "placeholder": 'ALGOLIA_INDEX_NAME',
    "default": '',
    "displayName": 'Index Name',
    "name": 'indexName_string',
    "required": true,
    "description": 'Name of the index on which to perform the operation.',
    "displayOptions": {
      "show": {
        "resource": [
          'Rules'
        ],
        "operation": [
          'saveRules'
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": 'GET',
            "url": '/1/indexes'
          },
          "output": {
            "postReceive": [
              {
                "type": 'rootProperty',
                "properties": {
                  "property": 'items'
                }
              },
              {
                "type": 'setKeyValue',
                "properties": {
                  "name": '={{ $responseItem.name }}',
                  "value": '={{ $responseItem.name }}'
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "displayName": 'Options',
    "name": 'options',
    "type": 'collection',
    "placeholder": 'Add option',
    "default": {},
    "required": false,
    "options": [
      {
        "type": 'boolean',
        "default": false,
        "displayName": 'Forward To Replicas',
        "name": 'forwardToReplicas_boolean',
        "description": 'Whether changes are applied to replica indices.'
      },
      {
        "type": 'boolean',
        "default": false,
        "displayName": 'Clear Existing Rules',
        "name": 'clearExistingRules_boolean',
        "description": 'Whether existing rules should be deleted before adding this batch.'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "forwardToReplicas": '={{ $value.forwardToReplicas_boolean }}',
          "clearExistingRules": '={{ $value.clearExistingRules_boolean }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Rules'
        ],
        "operation": [
          'saveRules'
        ]
      }
    }
  }
];

export default properties;
