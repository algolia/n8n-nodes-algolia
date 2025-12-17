import { INodeProperties } from 'n8n-workflow';
import assignUserIdProperties from './assignUserId';
import batchAssignUserIdsProperties from './batchAssignUserIds';
import getUserIdProperties from './getUserId';
import hasPendingMappingsProperties from './hasPendingMappings';
import listUserIdsProperties from './listUserIds';
import removeUserIdProperties from './removeUserId';
import searchUserIdsProperties from './searchUserIds';

const operationProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    default: '',
    description: 'Select the operation to work with',
    options: [
      {
        name: 'Assign or move a user ID',
        value: 'assignUserId',
        action: 'Assign or move a user ID',
        description: 'Assigns or moves a user ID to a cluster.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/clusters/mapping',
          },
        },
      },
      {
        name: 'List user IDs',
        value: 'listUserIds',
        action: 'List user IDs',
        description: 'Lists the userIDs assigned to a multi-cluster application.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/clusters/mapping',
          },
        },
      },
      {
        name: 'Assign multiple userIDs',
        value: 'batchAssignUserIds',
        action: 'Assign multiple userIDs',
        description: 'Assigns multiple user IDs to a cluster.',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/clusters/mapping/batch',
          },
        },
      },
      {
        name: 'Get top user IDs',
        value: 'getTopUserIds',
        action: 'Get top user IDs',
        description: 'Get the IDs of the 10 users with the highest number of records per cluster.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/clusters/mapping/top',
          },
        },
      },
      {
        name: 'Retrieve user ID',
        value: 'getUserId',
        action: 'Retrieve user ID',
        description: 'Returns the user ID data stored in the mapping.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/clusters/mapping/{{ $parameter.userID_string }}',
          },
        },
      },
      {
        name: 'Delete user ID',
        value: 'removeUserId',
        action: 'Delete user ID',
        description: 'Deletes a user ID and its associated data from the clusters.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/1/clusters/mapping/{{ $parameter.userID_string }}',
          },
        },
      },
      {
        name: 'List clusters',
        value: 'listClusters',
        action: 'List clusters',
        description: 'Lists the available clusters in a multi-cluster setup.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/clusters',
          },
        },
      },
      {
        name: 'Search for user IDs',
        value: 'searchUserIds',
        action: 'Search for user IDs',
        description: 'Since it can take a few seconds to get the data from the different clusters,',
        routing: {
          request: {
            method: 'POST',
            url: '=/1/clusters/mapping/search',
          },
        },
      },
      {
        name: 'Get migration and user mapping status',
        value: 'hasPendingMappings',
        action: 'Get migration and user mapping status',
        description:
          'To determine when the time-consuming process of creating a large batch of users or migrating users from one cluster to another is complete, this operation retrieves the status of the process.',
        routing: {
          request: {
            method: 'GET',
            url: '=/1/clusters/mapping/pending',
          },
        },
      },
    ],
    displayOptions: {
      show: {
        resource: ['Clusters'],
      },
    },
  },
];

const properties: INodeProperties[] = [
  ...operationProperties,
  ...assignUserIdProperties,
  ...batchAssignUserIdsProperties,
  ...getUserIdProperties,
  ...hasPendingMappingsProperties,
  ...listUserIdsProperties,
  ...removeUserIdProperties,
  ...searchUserIdsProperties,
];

export default properties;
