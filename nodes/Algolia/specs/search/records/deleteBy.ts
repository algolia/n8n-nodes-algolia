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
        resource: ['Records'],
        operation: ['deleteBy'],
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
        type: 'json',
        name: 'facetFilters',
        displayName: 'Facet Filters',
        default: '',
      },
      {
        type: 'string',
        placeholder: '(category:Book OR category:Ebook) AND _tags:published',
        default: '',
        description:
          "Filter expression to only include items that match the filter criteria in the response.\n\nYou can use these filter expressions:\n\n- **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`.\n- **Ranges.** `<facet>:<lower> TO <upper>`, where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive).\n- **Facet filters.** `<facet>:<value>`, where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value.\n- **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive).\n- **Boolean filters.** `<facet>: true | false`.\n\nYou can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:\n\n- You can only combine filters of the same type with `OR`.\n  **Not supported:** `facet:value OR num > 3`.\n- You can't use `NOT` with combinations of filters.\n  **Not supported:** `NOT(facet:value OR facet:value)`\n- You can't combine conjunctions (`AND`) with `OR`.\n  **Not supported:** `facet:value OR (facet:value AND facet:value)`\n\nUse quotes if the facet attribute name or facet value contains spaces, keywords (`OR`, `AND`, `NOT`), or quotes.\nIf a facet attribute is an array, the filter matches if it matches at least one element of the array.\n\nFor more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering).\n",
        displayName: 'Filters',
        name: 'filters_string',
      },
      {
        type: 'json',
        name: 'numericFilters',
        displayName: 'Numeric Filters',
        default: '',
      },
      {
        type: 'json',
        name: 'tagFilters',
        displayName: 'Tag Filters',
        default: '',
      },
      {
        type: 'string',
        placeholder: '40.71,-74.01',
        default: '',
        description:
          'Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.\n\nOnly records included within a circle around this central location are included in the results.\nThe radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings.\nThis parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.\n',
        displayName: 'Around Lat Lng',
        name: 'aroundLatLng_string',
      },
      {
        type: 'json',
        name: 'aroundRadius',
        displayName: 'Around Radius',
        default: '',
      },
      {
        type: 'json',
        name: 'insideBoundingBox',
        displayName: 'Inside Bounding Box',
        default: '',
      },
      {
        type: 'json',
        displayName: 'Inside Polygon',
        name: 'insidePolygon_json',
        default: '[]',
        description:
          'Coordinates of a polygon in which to search.\n\nPolygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude.\nProvide multiple polygons as nested arrays.\nFor more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\nThis parameter is ignored if you also specify `insideBoundingBox`.\n',
        required: false,
      },
    ],
    routing: {
      request: {
        body: {
          facetFilters: '={{ JSON.parse($value.facetFilters) }}',
          filters: '={{ $value.filters_string }}',
          numericFilters: '={{ JSON.parse($value.numericFilters) }}',
          tagFilters: '={{ JSON.parse($value.tagFilters) }}',
          aroundLatLng: '={{ $value.aroundLatLng_string }}',
          aroundRadius: '={{ JSON.parse($value.aroundRadius) }}',
          insideBoundingBox: '={{ JSON.parse($value.insideBoundingBox) }}',
          insidePolygon: '={{ JSON.parse($value.insidePolygon_json) }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Records'],
        operation: ['deleteBy'],
      },
    },
  },
];

export default properties;
