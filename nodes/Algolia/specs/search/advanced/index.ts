import { INodeProperties } from 'n8n-workflow';
import getAppTaskProperties from './getAppTask';
import getLogsProperties from './getLogs';

const operationProperties: INodeProperties[] = [
  {
    "displayName": 'Operation',
    "name": 'operation',
    "type": 'options',
    "default": '',
    "description": 'Select the operation to work with',
    "options": [
      {
        "name": 'Retrieve log entries',
        "value": 'getLogs',
        "action": 'Retrieve log entries',
        "description": 'The request must be authenticated by an API key with the [`logs` ACL](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/logs'
          }
        }
      },
      {
        "name": 'Check application task status',
        "value": 'getAppTask',
        "action": 'Check application task status',
        "description": 'Checks the status of a given application task.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/task/{{ $parameter.taskID_number }}'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'Advanced'
        ]
      }
    }
  }
];

const properties: INodeProperties[] = [
  ...operationProperties,
  ...getAppTaskProperties,
  ...getLogsProperties,
];

export default properties;
