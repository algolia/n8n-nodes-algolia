import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    "type": 'json',
    "displayName": 'Body',
    "name": 'body',
    "default": '[]',
    "description": 'Matching synonyms.',
    "required": true,
    "routing": {
      "request": {
        "body": '={{ $value }}'
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Synonyms'
        ],
        "operation": [
          'saveSynonyms'
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
          'Synonyms'
        ],
        "operation": [
          'saveSynonyms'
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
        "displayName": 'Replace Existing Synonyms',
        "name": 'replaceExistingSynonyms_boolean',
        "description": 'Whether to replace all synonyms in the index with the ones sent with this request.'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "forwardToReplicas": '={{ $value.forwardToReplicas_boolean }}',
          "replaceExistingSynonyms": '={{ $value.replaceExistingSynonyms_boolean }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Synonyms'
        ],
        "operation": [
          'saveSynonyms'
        ]
      }
    }
  }
];

export default properties;
