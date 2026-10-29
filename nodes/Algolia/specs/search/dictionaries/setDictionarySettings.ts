import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'json',
    description:
      'Turn off the built-in Algolia stop words for specific languages.\nOnly `stopwords` is supported.\nThe keys of the `stopwords` object are [language ISO codes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages) of languages with a built-in stop-word dictionary.\n',
    required: true,
    default: '{}',
    routing: {
      send: {
        type: 'body',
        property: 'disableStandardEntries',
        value: '={{ JSON.parse($value) }}',
      },
    },
    displayName: 'Disable Standard Entries',
    name: 'disable_standard_entries_object',
    displayOptions: {
      show: {
        resource: ['Dictionaries'],
        operation: ['setDictionarySettings'],
      },
    },
  },
];

export default properties;
