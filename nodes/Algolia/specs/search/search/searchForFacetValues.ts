import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'string',
    default: '',
    displayName: 'Facet Name',
    name: 'facetName_string',
    required: true,
    description:
      'Facet attribute in which to search for values.\n\nThis attribute must be included in the `attributesForFaceting` index setting with the `searchable()` modifier.\n',
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
  {
    type: 'options',
    placeholder: 'ALGOLIA_INDEX_NAME',
    default: '',
    displayName: 'Index Name',
    name: 'indexName_string',
    required: true,
    description: 'Name of the index on which to perform the operation.',
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
    typeOptions: {
      loadOptions: {
        routing: {
          request: {
            method: 'GET',
            url: '/1/indexes',
          },
          output: {
            postReceive: [
              {
                type: 'rootProperty',
                properties: {
                  property: 'items',
                },
              },
              {
                type: 'setKeyValue',
                properties: {
                  name: '={{ $responseItem.name }}',
                  value: '={{ $responseItem.name }}',
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    displayName: 'Additional Properties',
    name: 'additionalProperties',
    type: 'collection',
    placeholder: 'Add property',
    default: {},
    required: false,
    options: [
      {
        type: 'string',
        placeholder: 'hitsPerPage=2&getRankingInfo=1',
        default: '',
        description: 'Search parameters as a URL-encoded query string.',
        displayName: 'Params',
        name: 'params_string',
      },
      {
        type: 'string',
        placeholder: 'george',
        default: '',
        description: "Text to search inside the facet's values.",
        displayName: 'Facet Query',
        name: 'facetQuery_string',
      },
      {
        type: 'number',
        default: 10,
        description:
          'Maximum number of facet values to return when [searching for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).',
        typeOptions: {
          maxValue: 100,
        },
        displayName: 'Max Facet Hits',
        name: 'maxFacetHits_number',
      },
    ],
    routing: {
      request: {
        body: {
          params: '={{ $value.params_string }}',
          facetQuery: '={{ $value.facetQuery_string }}',
          maxFacetHits: '={{ $value.maxFacetHits_number }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['searchForFacetValues'],
      },
    },
  },
];

export default properties;
