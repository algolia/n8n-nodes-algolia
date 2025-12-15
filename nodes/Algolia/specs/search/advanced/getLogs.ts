import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
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
        "default": '',
        "displayName": 'Offset',
        "name": 'offset_number',
        "description": 'First log entry to retrieve. The most recent entries are listed first.'
      },
      {
        "type": 'number',
        "default": 10,
        "typeOptions": {
          "maxValue": 1000
        },
        "displayName": 'Length',
        "name": 'length_number',
        "description": 'Maximum number of entries to retrieve.'
      },
      {
        "type": 'json',
        "name": 'indexName',
        "displayName": 'Index Name',
        "default": '',
        "description": 'Index for which to retrieve log entries.\nBy default, log entries are retrieved for all indices.\n'
      },
      {
        "type": 'options',
        "default": 'all',
        "options": [
          {
            "name": 'all',
            "value": 'all'
          },
          {
            "name": 'query',
            "value": 'query'
          },
          {
            "name": 'build',
            "value": 'build'
          },
          {
            "name": 'error',
            "value": 'error'
          }
        ],
        "displayName": 'Type',
        "name": 'type_options',
        "description": 'Type of log entries to retrieve.\nBy default, all log entries are retrieved.\n'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "offset": '={{ $value.offset_number }}',
          "length": '={{ $value.length_number }}',
          "indexName": '={{ JSON.parse($value.indexName) }}',
          "type": '={{ $value.type_options }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Advanced'
        ],
        "operation": [
          'getLogs'
        ]
      }
    }
  }
];

export default properties;
