import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    "type": 'json',
    "displayName": 'Requests',
    "name": 'requests_json',
    "default": '[]',
    "description": undefined,
    "required": true,
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ JSON.parse($value) }}',
        "property": 'requests'
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Search'
        ],
        "operation": [
          'search'
        ]
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
        "type": 'options',
        "default": '',
        "description": 'Strategy for multiple search queries:\n\n- `none`. Run all queries.\n- `stopIfEnoughMatches`. Run the queries one by one, stopping as soon as a query matches at least the `hitsPerPage` number of results.\n',
        "options": [
          {
            "name": 'none',
            "value": 'none'
          },
          {
            "name": 'stopIfEnoughMatches',
            "value": 'stopIfEnoughMatches'
          }
        ],
        "displayName": 'Strategy',
        "name": 'strategy_options'
      }
    ],
    "routing": {
      "request": {
        "body": {
          "strategy": '={{ $value.strategy_options }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Search'
        ],
        "operation": [
          'search'
        ]
      }
    }
  }
];

export default properties;
