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
          'Records'
        ],
        "operation": [
          'deleteObject'
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
    "type": 'string',
    "placeholder": 'test-record-123',
    "default": '',
    "description": 'Unique record identifier.',
    "displayName": 'Object ID',
    "name": 'objectID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'Records'
        ],
        "operation": [
          'deleteObject'
        ]
      }
    }
  }
];

export default properties;
