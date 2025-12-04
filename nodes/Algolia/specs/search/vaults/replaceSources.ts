import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    "type": 'json',
    "displayName": 'Body',
    "name": 'body',
    "default": '[]',
    "description": 'Sources.',
    "required": true,
    "routing": {
      "request": {
        "body": '={{ $value }}'
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Vaults'
        ],
        "operation": [
          'replaceSources'
        ]
      }
    }
  }
];

export default properties;
