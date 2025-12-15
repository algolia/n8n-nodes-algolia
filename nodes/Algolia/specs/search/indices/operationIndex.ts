import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    "type": 'string',
    "placeholder": 'products',
    "default": '',
    "description": 'Index name (case-sensitive).',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'destination'
      }
    },
    "displayName": 'Destination',
    "name": 'destination_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'Indices'
        ],
        "operation": [
          'operationIndex'
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
          'Indices'
        ],
        "operation": [
          'operationIndex'
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
    "type": 'options',
    "placeholder": 'copy',
    "default": '',
    "description": 'Operation to perform on the index.',
    "options": [
      {
        "name": 'move',
        "value": 'move'
      },
      {
        "name": 'copy',
        "value": 'copy'
      }
    ],
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'operation'
      }
    },
    "displayName": 'Operation',
    "name": 'operation_options',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'Indices'
        ],
        "operation": [
          'operationIndex'
        ]
      }
    }
  },
  {
    "displayName": 'Additional Properties',
    "name": 'additionalProperties',
    "type": 'collection',
    "placeholder": 'Add property',
    "default": {},
    "required": false,
    "options": [
      {
        "type": 'json',
        "displayName": 'Scope',
        "name": 'scope_json',
        "default": '[]',
        "description": '**Only for copying.**\n\nIf you specify a scope, only the selected scopes are copied. Records and the other scopes are left unchanged.\nIf you omit the `scope` parameter, everything is copied: records, settings, synonyms, and rules.\n',
        "required": false
      }
    ],
    "routing": {
      "request": {
        "body": {
          "scope": '={{ JSON.parse($value.scope_json) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Indices'
        ],
        "operation": [
          'operationIndex'
        ]
      }
    }
  }
];

export default properties;
