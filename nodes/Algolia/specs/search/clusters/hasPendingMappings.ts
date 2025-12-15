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
        "type": 'boolean',
        "default": false,
        "displayName": 'Get Clusters',
        "name": 'getClusters_boolean',
        "description": 'Whether to include the cluster\'s pending mapping state in the response.'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "getClusters": '={{ $value.getClusters_boolean }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Clusters'
        ],
        "operation": [
          'hasPendingMappings'
        ]
      }
    }
  }
];

export default properties;
