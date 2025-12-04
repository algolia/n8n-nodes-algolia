import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    "type": 'options',
    "default": '',
    "options": [
      {
        "name": 'plurals',
        "value": 'plurals'
      },
      {
        "name": 'stopwords',
        "value": 'stopwords'
      },
      {
        "name": 'compounds',
        "value": 'compounds'
      }
    ],
    "displayName": 'Dictionary Name',
    "name": 'dictionaryName_options',
    "required": true,
    "description": 'Dictionary type in which to search.',
    "displayOptions": {
      "show": {
        "resource": [
          'Dictionaries'
        ],
        "operation": [
          'searchDictionaryEntries'
        ]
      }
    }
  },
  {
    "type": 'string',
    "default": '',
    "description": 'Search query.',
    "routing": {
      "send": {
        "type": 'body',
        "value": '={{ $value }}',
        "property": 'query'
      }
    },
    "displayName": 'Query',
    "name": 'query_string',
    "required": true,
    "displayOptions": {
      "show": {
        "resource": [
          'Dictionaries'
        ],
        "operation": [
          'searchDictionaryEntries'
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
      },
      {
        "type": 'options',
        "default": '',
        "description": 'ISO code for a supported language.',
        "options": [
          {
            "name": 'af',
            "value": 'af'
          },
          {
            "name": 'ar',
            "value": 'ar'
          },
          {
            "name": 'az',
            "value": 'az'
          },
          {
            "name": 'bg',
            "value": 'bg'
          },
          {
            "name": 'bn',
            "value": 'bn'
          },
          {
            "name": 'ca',
            "value": 'ca'
          },
          {
            "name": 'cs',
            "value": 'cs'
          },
          {
            "name": 'cy',
            "value": 'cy'
          },
          {
            "name": 'da',
            "value": 'da'
          },
          {
            "name": 'de',
            "value": 'de'
          },
          {
            "name": 'el',
            "value": 'el'
          },
          {
            "name": 'en',
            "value": 'en'
          },
          {
            "name": 'eo',
            "value": 'eo'
          },
          {
            "name": 'es',
            "value": 'es'
          },
          {
            "name": 'et',
            "value": 'et'
          },
          {
            "name": 'eu',
            "value": 'eu'
          },
          {
            "name": 'fa',
            "value": 'fa'
          },
          {
            "name": 'fi',
            "value": 'fi'
          },
          {
            "name": 'fo',
            "value": 'fo'
          },
          {
            "name": 'fr',
            "value": 'fr'
          },
          {
            "name": 'ga',
            "value": 'ga'
          },
          {
            "name": 'gl',
            "value": 'gl'
          },
          {
            "name": 'he',
            "value": 'he'
          },
          {
            "name": 'hi',
            "value": 'hi'
          },
          {
            "name": 'hu',
            "value": 'hu'
          },
          {
            "name": 'hy',
            "value": 'hy'
          },
          {
            "name": 'id',
            "value": 'id'
          },
          {
            "name": 'is',
            "value": 'is'
          },
          {
            "name": 'it',
            "value": 'it'
          },
          {
            "name": 'ja',
            "value": 'ja'
          },
          {
            "name": 'ka',
            "value": 'ka'
          },
          {
            "name": 'kk',
            "value": 'kk'
          },
          {
            "name": 'ko',
            "value": 'ko'
          },
          {
            "name": 'ku',
            "value": 'ku'
          },
          {
            "name": 'ky',
            "value": 'ky'
          },
          {
            "name": 'lt',
            "value": 'lt'
          },
          {
            "name": 'lv',
            "value": 'lv'
          },
          {
            "name": 'mi',
            "value": 'mi'
          },
          {
            "name": 'mn',
            "value": 'mn'
          },
          {
            "name": 'mr',
            "value": 'mr'
          },
          {
            "name": 'ms',
            "value": 'ms'
          },
          {
            "name": 'mt',
            "value": 'mt'
          },
          {
            "name": 'nb',
            "value": 'nb'
          },
          {
            "name": 'nl',
            "value": 'nl'
          },
          {
            "name": 'no',
            "value": 'no'
          },
          {
            "name": 'ns',
            "value": 'ns'
          },
          {
            "name": 'pl',
            "value": 'pl'
          },
          {
            "name": 'ps',
            "value": 'ps'
          },
          {
            "name": 'pt',
            "value": 'pt'
          },
          {
            "name": 'pt-br',
            "value": 'pt-br'
          },
          {
            "name": 'qu',
            "value": 'qu'
          },
          {
            "name": 'ro',
            "value": 'ro'
          },
          {
            "name": 'ru',
            "value": 'ru'
          },
          {
            "name": 'sk',
            "value": 'sk'
          },
          {
            "name": 'sq',
            "value": 'sq'
          },
          {
            "name": 'sv',
            "value": 'sv'
          },
          {
            "name": 'sw',
            "value": 'sw'
          },
          {
            "name": 'ta',
            "value": 'ta'
          },
          {
            "name": 'te',
            "value": 'te'
          },
          {
            "name": 'th',
            "value": 'th'
          },
          {
            "name": 'tl',
            "value": 'tl'
          },
          {
            "name": 'tn',
            "value": 'tn'
          },
          {
            "name": 'tr',
            "value": 'tr'
          },
          {
            "name": 'tt',
            "value": 'tt'
          },
          {
            "name": 'uk',
            "value": 'uk'
          },
          {
            "name": 'ur',
            "value": 'ur'
          },
          {
            "name": 'uz',
            "value": 'uz'
          },
          {
            "name": 'zh',
            "value": 'zh'
          }
        ],
        "displayName": 'Language',
        "name": 'language_options'
      }
    ],
    "routing": {
      "request": {
        "body": {
          "page": '={{ $value.page_number }}',
          "hitsPerPage": '={{ $value.hitsPerPage_number }}',
          "language": '={{ $value.language_options }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Dictionaries'
        ],
        "operation": [
          'searchDictionaryEntries'
        ]
      }
    }
  }
];

export default properties;
