import { INodeProperties } from 'n8n-workflow';
import SearchProperties from './search';
import RecordsProperties from './records';
import IndicesProperties from './indices';
import SynonymsProperties from './synonyms';
import ApiKeysProperties from './api-keys';
import RulesProperties from './rules';
import DictionariesProperties from './dictionaries';
import ClustersProperties from './clusters';
import VaultsProperties from './vaults';
import AdvancedProperties from './advanced';

const resourceProperties: INodeProperties[] = [
  {
    "displayName": 'Resource',
    "name": 'resource',
    "type": 'options',
    "default": '',
    "description": 'Select the resource to work with',
    "options": [
      {
        "name": 'Advanced',
        "value": 'Advanced',
        "description": 'Query your logs'
      },
      {
        "name": 'Api Keys',
        "value": 'Api Keys',
        "description": 'Manage your API keys'
      },
      {
        "name": 'Clusters',
        "value": 'Clusters',
        "description": 'Multi-cluster operations'
      },
      {
        "name": 'Dictionaries',
        "value": 'Dictionaries',
        "description": 'Manage your dictionaries'
      },
      {
        "name": 'Indices',
        "value": 'Indices',
        "description": 'Manage your indices and index settings'
      },
      {
        "name": 'Records',
        "value": 'Records',
        "description": 'Add, update, and delete records from your indices'
      },
      {
        "name": 'Rules',
        "value": 'Rules',
        "description": 'Create, update, delete, and search for rules'
      },
      {
        "name": 'Search',
        "value": 'Search',
        "description": 'Search one or more indices for matching records or facet values'
      },
      {
        "name": 'Synonyms',
        "value": 'Synonyms',
        "description": 'Create, update, delete, and search for synonyms'
      },
      {
        "name": 'Vaults',
        "value": 'Vaults',
        "description": 'Algolia Vault lets you restrict access to your clusters to specific IP addresses and provides disk-level encryption at rest'
      }
    ]
  }
];

const properties: INodeProperties[] = [
  ...resourceProperties,
  ...SearchProperties,
  ...RecordsProperties,
  ...IndicesProperties,
  ...SynonymsProperties,
  ...ApiKeysProperties,
  ...RulesProperties,
  ...DictionariesProperties,
  ...ClustersProperties,
  ...VaultsProperties,
  ...AdvancedProperties,
];

export default properties;
