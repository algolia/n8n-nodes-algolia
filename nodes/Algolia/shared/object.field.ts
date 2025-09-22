import type { INodeProperties } from 'n8n-workflow';

const objectTypeSelector: INodeProperties = {
  displayName: 'Object',
  name: 'object',
  type: 'options',
  default: 'json',
  options: [
    {
      name: 'From JSON',
      value: 'json',
    },
    {
      name: 'Using Fields Below',
      value: 'keypair',
    },
  ],
  routing: {
    request: {
      body: '={{ $parameter.object === "keypair" ? $parameter.keypair.list.filter(attr => attr.name.trim() !== "").smartJoin("name", "value") : JSON.parse($parameter.json) }}',
    },
  },
};

const jsonObject = (description = 'JSON object containing the data'): INodeProperties => ({
  displayName: 'JSON',
  name: 'json',
  type: 'json',
  default: '',
  description,
  placeholder: `{
"firstname": "John",
"lastname": "Doe",
"age": 25
}`,
  typeOptions: {
    rows: 5,
  },
  displayOptions: {
    show: {
      object: ['json'],
    },
  },
});

const formObject = (description = 'Fields to add'): INodeProperties => ({
  displayName: 'Object Fields',
  name: 'keypair',
  type: 'fixedCollection',
  placeholder: 'Add Field',
  description,
  default: {},
  typeOptions: {
    multipleValues: true,
  },
  displayOptions: {
    show: {
      object: ['keypair'],
    },
  },
  options: [
    {
      displayName: 'Field',
      name: 'list',
      values: [
        {
          displayName: 'Name',
          name: 'name',
          type: 'string',
          default: '',
        },
        {
          displayName: 'Value',
          name: 'value',
          type: 'string',
          default: '',
        },
      ],
    },
  ],
});

export const object = (jsonDescription?: string, formDescription?: string): INodeProperties[] => [
  objectTypeSelector,
  jsonObject(jsonDescription),
  formObject(formDescription),
];
