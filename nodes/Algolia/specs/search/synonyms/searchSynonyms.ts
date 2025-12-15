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
          'Synonyms'
        ],
        "operation": [
          'searchSynonyms'
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
    "displayName": 'Additional Properties',
    "name": 'additionalProperties',
    "type": 'collection',
    "placeholder": 'Add property',
    "default": {},
    "required": false,
    "options": [
      {
        "type": 'string',
        "default": '',
        "description": 'Search query.',
        "displayName": 'Query',
        "name": 'query_string'
      },
      {
        "type": 'options',
        "placeholder": 'onewaysynonym',
        "default": '',
        "description": 'Synonym type.',
        "options": [
          {
            "name": 'synonym',
            "value": 'synonym'
          },
          {
            "name": 'onewaysynonym',
            "value": 'onewaysynonym'
          },
          {
            "name": 'altcorrection1',
            "value": 'altcorrection1'
          },
          {
            "name": 'altcorrection2',
            "value": 'altcorrection2'
          },
          {
            "name": 'placeholder',
            "value": 'placeholder'
          },
          {
            "name": 'oneWaySynonym',
            "value": 'oneWaySynonym'
          },
          {
            "name": 'altCorrection1',
            "value": 'altCorrection1'
          },
          {
            "name": 'altCorrection2',
            "value": 'altCorrection2'
          }
        ],
        "displayName": 'Type',
        "name": 'type_options'
      },
      {
        "type": 'number',
        "default": '',
        "description": 'Page of search results to retrieve.',
        "typeOptions": {
          "minValue": 0
        },
        "displayName": 'Page',
        "name": 'page_number'
      },
      {
        "type": 'number',
        "default": 20,
        "description": 'Number of hits per page.',
        "typeOptions": {
          "minValue": 1,
          "maxValue": 1000
        },
        "displayName": 'Hits Per Page',
        "name": 'hitsPerPage_number'
      }
    ],
    "routing": {
      "request": {
        "body": {
          "query": '={{ $value.query_string }}',
          "type": '={{ $value.type_options }}',
          "page": '={{ $value.page_number }}',
          "hitsPerPage": '={{ $value.hitsPerPage_number }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Synonyms'
        ],
        "operation": [
          'searchSynonyms'
        ]
      }
    }
  }
];

export default properties;
