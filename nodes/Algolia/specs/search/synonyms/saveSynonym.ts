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
          'saveSynonym'
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
    "placeholder": 'synonymID',
    "default": '',
    "displayName": 'Object ID',
    "name": 'objectID_string',
    "required": true,
    "description": 'Unique identifier of a synonym object.',
    "displayOptions": {
      "show": {
        "resource": [
          'Synonyms'
        ],
        "operation": [
          'saveSynonym'
        ]
      }
    }
  },
  {
    "type": 'string',
    "placeholder": 'synonymID',
    "default": '',
    "description": 'Unique identifier of a synonym object.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'objectID'
      }
    },
    "displayName": 'Object ID',
    "name": 'objectID_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'Synonyms'
        ],
        "operation": [
          'saveSynonym'
        ]
      }
    }
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
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'type'
      }
    },
    "displayName": 'Type',
    "name": 'type_options',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'Synonyms'
        ],
        "operation": [
          'saveSynonym'
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
        "type": 'json',
        "displayName": 'Synonyms',
        "name": 'synonyms_json',
        "default": '[]',
        "description": 'Words or phrases considered equivalent.',
        "required": false
      },
      {
        "type": 'string',
        "placeholder": 'car',
        "default": '',
        "description": 'Word or phrase to appear in query strings (for [`onewaysynonym`s](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/one-way-synonyms)).',
        "displayName": 'Input',
        "name": 'input_string'
      },
      {
        "type": 'string',
        "placeholder": 'car',
        "default": '',
        "description": 'Word or phrase to appear in query strings (for [`altcorrection1` and `altcorrection2`](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-alternative-corrections)).',
        "displayName": 'Word',
        "name": 'word_string'
      },
      {
        "type": 'json',
        "displayName": 'Corrections',
        "name": 'corrections_json',
        "default": '[]',
        "description": 'Words to be matched in records.',
        "required": false
      },
      {
        "type": 'string',
        "placeholder": '<Street>',
        "default": '',
        "description": '[Placeholder token](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-placeholders) to be put inside records.\n',
        "displayName": 'Placeholder',
        "name": 'placeholder_string'
      },
      {
        "type": 'json',
        "displayName": 'Replacements',
        "name": 'replacements_json',
        "default": '[]',
        "description": 'Query words that will match the [placeholder token](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-placeholders).',
        "required": false
      }
    ],
    "routing": {
      "request": {
        "body": {
          "synonyms": '={{ JSON.parse($value.synonyms_json) }}',
          "input": '={{ $value.input_string }}',
          "word": '={{ $value.word_string }}',
          "corrections": '={{ JSON.parse($value.corrections_json) }}',
          "placeholder": '={{ $value.placeholder_string }}',
          "replacements": '={{ JSON.parse($value.replacements_json) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Synonyms'
        ],
        "operation": [
          'saveSynonym'
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
        "type": 'boolean',
        "default": false,
        "displayName": 'Forward To Replicas',
        "name": 'forwardToReplicas_boolean',
        "description": 'Whether changes are applied to replica indices.'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "forwardToReplicas": '={{ $value.forwardToReplicas_boolean }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Synonyms'
        ],
        "operation": [
          'saveSynonym'
        ]
      }
    }
  }
];

export default properties;
