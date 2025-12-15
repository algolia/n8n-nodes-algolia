import { INodeProperties } from 'n8n-workflow';
import batchDictionaryEntriesProperties from './batchDictionaryEntries';
import searchDictionaryEntriesProperties from './searchDictionaryEntries';
import setDictionarySettingsProperties from './setDictionarySettings';

const operationProperties: INodeProperties[] = [
  {
    "displayName": 'Operation',
    "name": 'operation',
    "type": 'options',
    "default": '',
    "description": 'Select the operation to work with',
    "options": [
      {
        "name": 'Add or delete dictionary entries',
        "value": 'batchDictionaryEntries',
        "action": 'Add or delete dictionary entries',
        "description": 'Adds or deletes multiple entries from your plurals, segmentation, or stop word dictionaries.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/dictionaries/{{ $parameter.dictionaryName_options }}/batch'
          }
        }
      },
      {
        "name": 'Search dictionary entries',
        "value": 'searchDictionaryEntries',
        "action": 'Search dictionary entries',
        "description": 'Searches for standard and custom dictionary entries.',
        "routing": {
          "request": {
            "method": 'POST',
            "url": '=/1/dictionaries/{{ $parameter.dictionaryName_options }}/search'
          }
        }
      },
      {
        "name": 'Retrieve dictionary settings',
        "value": 'getDictionarySettings',
        "action": 'Retrieve dictionary settings',
        "description": 'Retrieves the languages for which standard dictionary entries are turned off.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/dictionaries/*/settings'
          }
        }
      },
      {
        "name": 'Update dictionary settings',
        "value": 'setDictionarySettings',
        "action": 'Update dictionary settings',
        "description": 'Turns standard stop word dictionary entries on or off for a given language.',
        "routing": {
          "request": {
            "method": 'PUT',
            "url": '=/1/dictionaries/*/settings'
          }
        }
      },
      {
        "name": 'List available languages',
        "value": 'getDictionaryLanguages',
        "action": 'List available languages',
        "description": 'Lists supported languages with their supported dictionary types and number of custom entries.',
        "routing": {
          "request": {
            "method": 'GET',
            "url": '=/1/dictionaries/*/languages'
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          'Dictionaries'
        ]
      }
    }
  }
];

const properties: INodeProperties[] = [
  ...operationProperties,
  ...batchDictionaryEntriesProperties,
  ...searchDictionaryEntriesProperties,
  ...setDictionarySettingsProperties,
];

export default properties;
