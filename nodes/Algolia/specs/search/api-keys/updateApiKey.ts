import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    type: 'json',
    displayName: 'Acl',
    name: 'acl_json',
    default: '[]',
    description:
      "Permissions that determine the type of API requests this key can make.\nThe required ACL is listed in each endpoint's reference.\nFor more information, see [access control list](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).\n",
    required: true,
    routing: {
      send: {
        type: 'body',
        value: '={{ JSON.parse($value) }}',
        property: 'acl',
      },
    },
    displayOptions: {
      show: {
        resource: ['Api Keys'],
        operation: ['updateApiKey'],
      },
    },
  },
  {
    type: 'string',
    placeholder: 'ALGOLIA_API_KEY',
    default: '',
    displayName: 'Key',
    name: 'key_string',
    required: true,
    description: 'API key.',
    displayOptions: {
      show: {
        resource: ['Api Keys'],
        operation: ['updateApiKey'],
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
        placeholder: 'Used for indexing by the CLI',
        default: '',
        description: 'Description of an API key to help you identify this API key.',
        displayName: 'Description',
        name: 'description_string',
      },
      {
        type: 'json',
        displayName: 'Indexes',
        name: 'indexes_json',
        default: '[]',
        description:
          'Index names or patterns that this API key can access.\nBy default, an API key can access all indices in the same application.\n\nYou can use leading and trailing wildcard characters (`*`):\n\n- `dev_*` matches all indices starting with "dev_"\n- `*_dev` matches all indices ending with "_dev"\n- `*_products_*` matches all indices containing "_products_".\n',
        required: false,
      },
      {
        type: 'number',
        default: '',
        description:
          "Maximum number of results this API key can retrieve in one query.\nBy default, there's no limit.\n",
        displayName: 'Max Hits Per Query',
        name: 'maxHitsPerQuery_number',
      },
      {
        type: 'number',
        default: '',
        description:
          "Maximum number of API requests allowed per IP address or [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken) per hour.\n\nIf this limit is reached, the API returns an error with status code `429`.\nBy default, there's no limit.\n",
        displayName: 'Max Queries Per IPPer Hour',
        name: 'maxQueriesPerIPPerHour_number',
      },
      {
        type: 'string',
        placeholder: 'typoTolerance=strict&restrictSources=192.168.1.0/24',
        default: '',
        description:
          'Query parameters to add when making API requests with this API key.\n\nTo restrict this API key to specific IP addresses, add the `restrictSources` parameter.\nYou can only add a single source, but you can provide a range of IP addresses.\n\nCreating an API key fails if the request is made from an IP address outside the restricted range.\n',
        displayName: 'Query Parameters',
        name: 'queryParameters_string',
      },
      {
        type: 'json',
        displayName: 'Referers',
        name: 'referers_json',
        default: '[]',
        description:
          'Allowed HTTP referrers for this API key.\n\nBy default, all referrers are allowed.\nYou can use leading and trailing wildcard characters (`*`):\n\n- `https://algolia.com/*` allows all referrers starting with "https://algolia.com/"\n- `*.algolia.com` allows all referrers ending with ".algolia.com"\n- `*algolia.com*` allows all referrers in the domain "algolia.com".\n\nLike all HTTP headers, referrers can be spoofed. Don\'t rely on them to secure your data.\nFor more information, see [HTTP referrer restrictions](https://www.algolia.com/doc/guides/security/security-best-practices/#http-referrers-restrictions).\n',
        required: false,
      },
      {
        type: 'number',
        placeholder: '86400',
        default: '',
        description:
          "Duration (in seconds) after which the API key expires.\nBy default, API keys don't expire.\n",
        displayName: 'Validity',
        name: 'validity_number',
      },
    ],
    routing: {
      request: {
        body: {
          description: '={{ $value.description_string }}',
          indexes: '={{ JSON.parse($value.indexes_json) }}',
          maxHitsPerQuery: '={{ $value.maxHitsPerQuery_number }}',
          maxQueriesPerIPPerHour: '={{ $value.maxQueriesPerIPPerHour_number }}',
          queryParameters: '={{ $value.queryParameters_string }}',
          referers: '={{ JSON.parse($value.referers_json) }}',
          validity: '={{ $value.validity_number }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Api Keys'],
        operation: ['updateApiKey'],
      },
    },
  },
];

export default properties;
