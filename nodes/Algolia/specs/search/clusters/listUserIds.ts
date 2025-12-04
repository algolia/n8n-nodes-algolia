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
        "type": 'json',
        "name": 'page',
        "displayName": 'Page',
        "default": '',
        "description": 'Requested page of the API response.\nIf `null`, the API response is not paginated.\n'
      },
      {
        "type": 'number',
        "default": 100,
        "displayName": 'Hits Per Page',
        "name": 'hitsPerPage_number',
        "description": 'Number of hits per page.'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "page": '={{ JSON.parse($value.page) }}',
          "hitsPerPage": '={{ $value.hitsPerPage_number }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Clusters'
        ],
        "operation": [
          'listUserIds'
        ]
      }
    }
  }
];

export default properties;
