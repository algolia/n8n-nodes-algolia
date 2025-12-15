import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    "type": 'number',
    "placeholder": '1506303845001',
    "default": '',
    "displayName": 'Task ID',
    "name": 'taskID_number',
    "required": true,
    "description": 'Unique task identifier.',
    "displayOptions": {
      "show": {
        "resource": [
          'Advanced'
        ],
        "operation": [
          'getAppTask'
        ]
      }
    }
  }
];

export default properties;
