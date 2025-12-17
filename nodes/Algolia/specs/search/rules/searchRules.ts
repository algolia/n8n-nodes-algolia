import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
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
        resource: ['Rules'],
        operation: ['searchRules'],
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
        default: '',
        description: 'Search query for rules.',
        displayName: 'Query',
        name: 'query_string',
      },
      {
        type: 'options',
        default: '',
        description:
          'Which part of the search query the pattern should match:\n\n- `startsWith`. The pattern must match the beginning of the query.\n- `endsWith`. The pattern must match the end of the query.\n- `is`. The pattern must match the query exactly.\n- `contains`. The pattern must match anywhere in the query.\n\nEmpty queries are only allowed as patterns with `anchoring: is`.\n',
        options: [
          {
            name: 'is',
            value: 'is',
          },
          {
            name: 'startsWith',
            value: 'startsWith',
          },
          {
            name: 'endsWith',
            value: 'endsWith',
          },
          {
            name: 'contains',
            value: 'contains',
          },
        ],
        displayName: 'Anchoring',
        name: 'anchoring_options',
      },
      {
        type: 'string',
        placeholder: 'mobile',
        default: '',
        description: 'Only return rules that match the context (exact match).',
        displayName: 'Context',
        name: 'context_string',
      },
      {
        type: 'number',
        default: '',
        description:
          'Requested page of the API response.\n\nAlgolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js)).\n\n- `hitsPerPage`: sets the number of search results (_hits_) displayed per page.\n- `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.\n\nFor example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.\n',
        typeOptions: {
          minValue: 0,
        },
        displayName: 'Page',
        name: 'page_number',
      },
      {
        type: 'number',
        default: 20,
        description:
          'Maximum number of hits per page.\n\nAlgolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js)).\n\n- `hitsPerPage`: sets the number of search results (_hits_) displayed per page.\n- `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.\n\nFor example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.\n',
        typeOptions: {
          minValue: 1,
          maxValue: 1000,
        },
        displayName: 'Hits Per Page',
        name: 'hitsPerPage_number',
      },
      {
        type: 'json',
        name: 'enabled',
        displayName: 'Enabled',
        default: '',
      },
    ],
    routing: {
      request: {
        body: {
          query: '={{ $value.query_string }}',
          anchoring: '={{ $value.anchoring_options }}',
          context: '={{ $value.context_string }}',
          page: '={{ $value.page_number }}',
          hitsPerPage: '={{ $value.hitsPerPage_number }}',
          enabled: '={{ JSON.parse($value.enabled) }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Rules'],
        operation: ['searchRules'],
      },
    },
  },
];

export default properties;
