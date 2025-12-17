import { INodeProperties } from 'n8n-workflow';
import clearSynonymsProperties from './clearSynonyms';
import deleteSynonymProperties from './deleteSynonym';
import getSynonymProperties from './getSynonym';
import saveSynonymProperties from './saveSynonym';
import saveSynonymsProperties from './saveSynonyms';
import searchSynonymsProperties from './searchSynonyms';

const operationProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    default: '',
    description: 'Select the operation to work with',
    options: [
      {
        name: 'Retrieve a synonym',
        value: 'getSynonym',
        action: 'Retrieve a synonym',
        description: 'Retrieves a synonym by its ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/synonyms/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Create or replace a synonym',
        value: 'saveSynonym',
        action: 'Create or replace a synonym',
        description:
          "If a synonym with the specified object ID doesn't exist, Algolia adds a new one.",
        routing: {
          request: {
            method: 'PUT',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/synonyms/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Delete a synonym',
        value: 'deleteSynonym',
        action: 'Delete a synonym',
        description: 'Deletes a synonym by its ID.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/synonyms/{{ $parameter.objectID_string }}',
          },
        },
      },
      {
        name: 'Create or replace synonyms',
        value: 'saveSynonyms',
        action: 'Create or replace synonyms',
        description: "If a synonym with the `objectID` doesn't exist, Algolia adds a new one.",
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/synonyms/batch',
          },
        },
      },
      {
        name: 'Delete all synonyms',
        value: 'clearSynonyms',
        action: 'Delete all synonyms',
        description: 'Deletes all synonyms from the index.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/synonyms/clear',
          },
        },
      },
      {
        name: 'Search for synonyms',
        value: 'searchSynonyms',
        action: 'Search for synonyms',
        description: 'Searches for synonyms in your index.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/synonyms/search',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Synonyms'],
      },
    },
  },
];

const properties: INodeProperties[] = [
  ...operationProperties,
  ...clearSynonymsProperties,
  ...deleteSynonymProperties,
  ...getSynonymProperties,
  ...saveSynonymProperties,
  ...saveSynonymsProperties,
  ...searchSynonymsProperties,
];

export default properties;
