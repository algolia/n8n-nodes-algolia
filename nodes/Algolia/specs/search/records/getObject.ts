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
          'getObject'
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
          'getObject'
        ]
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
        "type": 'json',
        "displayName": 'Attributes To Retrieve',
        "name": 'attributesToRetrieve_json',
        "default": '[]',
        "description": 'Attributes to include with the records in the response.\nThis is useful to reduce the size of the API response.\nBy default, all retrievable attributes are returned.\n\n`objectID` is always retrieved.\n\nAttributes included in `unretrievableAttributes`\nwon\'t be retrieved unless the request is authenticated with the admin API key.\n',
        "required": false
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "attributesToRetrieve": '={{ JSON.parse($value.attributesToRetrieve_json) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Records'
        ],
        "operation": [
          'getObject'
        ]
      }
    }
  }
];

export default properties;
