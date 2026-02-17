import { INodeProperties } from 'n8n-workflow';
import browseProperties from './browse';
import searchProperties from './search';
import searchForFacetValuesProperties from './searchForFacetValues';
import searchSingleIndexProperties from './searchSingleIndex';

const operationProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    default: '',
    description: 'Select the operation to work with',
    options: [
      {
        name: 'Search an index',
        value: 'searchSingleIndex',
        action: 'Search an index',
        description: 'Searches a single index and returns matching search results as hits.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/query',
          },
          output: {
            postReceive: [
              async function (items) {
                const simple = this.getNodeParameter('simplify', 0);
                if (!simple) return items;
                return items.map((item) => {
                  const json = item.json || {};
                  const simplified = new Map();
                  ['hits'].forEach((f) => {
                    if (json[f] !== undefined) simplified.set(f, json[f]);
                  });
                  return { json: Object.fromEntries(simplified) };
                });
              },
            ],
          },
        },
        inputSchema: {
          simplifiedOutput: ['hits'],
        },
      },
      {
        name: 'Search multiple indices',
        value: 'search',
        action: 'Search multiple indices',
        description: 'Sends multiple search requests to one or more indices.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/*/queries',
          },
        },
      },
      {
        name: 'Search for facet values',
        value: 'searchForFacetValues',
        action: 'Search for facet values',
        description: 'Searches for values of a specified facet attribute.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/facets/{{ $parameter.facetName_string }}/query',
          },
        },
      },
      {
        name: 'Browse for records',
        value: 'browse',
        action: 'Browse for records',
        description: 'Retrieves records from an index, up to 1,000 per request.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/indexes/{{ $parameter.indexName_string }}/browse',
          },
          output: {
            postReceive: [
              async function (items) {
                const simple = this.getNodeParameter('simplify', 0);
                if (!simple) return items;
                return items.map((item) => {
                  const json = item.json || {};
                  const simplified = new Map();
                  ['hits'].forEach((f) => {
                    if (json[f] !== undefined) simplified.set(f, json[f]);
                  });
                  return { json: Object.fromEntries(simplified) };
                });
              },
            ],
          },
        },
        inputSchema: {
          simplifiedOutput: ['hits'],
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Search'],
      },
    },
  },
];

const properties: INodeProperties[] = [
  ...operationProperties,

  {
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: false,
    description: 'Whether to return a simplified version of the response instead of the raw data',
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['searchSingleIndex', 'browse'],
      },
    },
  },
  ...browseProperties,
  ...searchProperties,
  ...searchForFacetValuesProperties,
  ...searchSingleIndexProperties,
];

export default properties;
