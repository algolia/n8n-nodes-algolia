import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
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
          'getSettings'
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
        "type": 'number',
        "default": 1,
        "displayName": 'Get Version',
        "name": 'getVersion_number',
        "description": 'When set to 2, the endpoint will not include `synonyms` in the response. This parameter is here for backward compatibility.'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "getVersion": '={{ $value.getVersion_number }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Indices'
        ],
        "operation": [
          'getSettings'
        ]
      }
    }
  }
];

export default properties;
