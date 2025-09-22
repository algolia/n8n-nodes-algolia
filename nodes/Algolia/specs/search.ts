import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    "displayName": "Resource",
    "name": "resource",
    "type": "options",
    "default": "",
    "description": "Select the resource to work with",
    "options": [
      {
        "name": "Advanced",
        "value": "Advanced",
        "description": "Query your logs."
      },
      {
        "name": "Api Keys",
        "value": "Api Keys",
        "description": "Manage your API keys.\n\nAPI requests must be authenticated with an API key.\nAPI keys can have permissions (access control lists, ACL) and restrictions.\n"
      },
      {
        "name": "Clusters",
        "value": "Clusters",
        "description": "Multi-cluster operations.\n\nMulti-cluster operations are **deprecated**.\nIf you have issues with your Algolia infrastructure\ndue to large volumes of data, contact the Algolia support team.\n"
      },
      {
        "name": "Dictionaries",
        "value": "Dictionaries",
        "description": "Manage your dictionaries.\n\nCustomize language-specific settings, such as stop words, plurals, or word segmentation.\n\nDictionaries are application-wide.\n"
      },
      {
        "name": "Indices",
        "value": "Indices",
        "description": "Manage your indices and index settings.\n\nIndices are copies of your data that are stored on Algolia's servers.\nThey're optimal data structures for fast search and are made up of records and settings.\n"
      },
      {
        "name": "Records",
        "value": "Records",
        "description": "Add, update, and delete records from your indices.\n\nRecords are individual items in your index.\nWhen they match a search query, they're returned as search results, in the order determined by your ranking.\nRecords are schemaless JSON objects.\nWhen adding or updating many records, check the [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n"
      },
      {
        "name": "Rules",
        "value": "Rules",
        "description": "Create, update, delete, and search for rules.\n\nRules are _if-then_ statements that you can use to curate search results.\nRules have _conditions_ that can trigger _consequences_.\nConsequences are changes to the search results, such as changing the order of search results or boosting a facet.\nThis can be useful for tuning specific queries or for merchandising.\n"
      },
      {
        "name": "Search",
        "value": "Search",
        "description": "Search one or more indices for matching records or facet values."
      },
      {
        "name": "Synonyms",
        "value": "Synonyms",
        "description": "Create, update, delete, and search for synonyms.\n\nSynonyms are terms that the search engine should consider equal.\n"
      },
      {
        "name": "Vaults",
        "value": "Vaults",
        "description": "Algolia Vault lets you restrict access to your clusters to specific IP addresses and provides disk-level encryption at rest."
      }
    ]
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "",
    "description": "Select the operation to work with",
    "options": [
      {
        "name": "Search single index",
        "value": "searchSingleIndex",
        "action": "Search single index",
        "description": "Searches a single index and returns matching search results (_hits_).\n\nThis method lets you retrieve up to 1,000 hits.\nIf you need more, use the [`browse` operation](#tag/Search/operation/browse) or increase the `paginatedLimitedTo` index setting.\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/query"
          }
        }
      },
      {
        "name": "Search",
        "value": "search",
        "action": "Search",
        "description": "Sends multiple search requests to one or more indices.\n\nThis can be useful in these cases:\n\n- Different indices for different purposes, such as, one index for products, another one for marketing content.\n- Multiple searches to the same index—for example, with different filters.\n\nUse the helper `searchForHits` or `searchForFacets` to get the results in a more convenient format, if you already know the return type you want.\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/*/queries"
          }
        }
      },
      {
        "name": "Search for facet values",
        "value": "searchForFacetValues",
        "action": "Search for facet values",
        "description": "Searches for values of a specified facet attribute.\n\n- By default, facet values are sorted by decreasing count.\n  You can adjust this with the `sortFacetValueBy` parameter.\n- Searching for facet values doesn't work if you have **more than 65 searchable facets and searchable attributes combined**.\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/facets/{{ $parameter.facetName_string }}/query"
          }
        }
      },
      {
        "name": "Browse",
        "value": "browse",
        "action": "Browse",
        "description": "Retrieves records from an index, up to 1,000 per request.\n\nWhile searching retrieves _hits_ (records augmented with attributes for highlighting and ranking details),\nbrowsing _just_ returns matching records.\nThis can be useful if you want to export your indices.\n\n- The Analytics API doesn't collect data when using `browse`.\n- Records are ranked by attributes and custom ranking.\n- There's no ranking for: typo-tolerance, number of matched words, proximity, geo distance.\n\nBrowse requests automatically apply these settings:\n\n- `advancedSyntax`: `false`\n- `attributesToHighlight`: `[]`\n- `attributesToSnippet`: `[]`\n- `distinct`: `false`\n- `enablePersonalization`: `false`\n- `enableRules`: `false`\n- `facets`: `[]`\n- `getRankingInfo`: `false`\n- `ignorePlurals`: `false`\n- `optionalFilters`: `[]`\n- `typoTolerance`: `true` or `false` (`min` and `strict` evaluate to `true`)\n\nIf you send these parameters with your browse requests, they'll be ignored.\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/browse"
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          "Search"
        ]
      }
    }
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "",
    "description": "Select the operation to work with",
    "options": [
      {
        "name": "Save object",
        "value": "saveObject",
        "action": "Save object",
        "description": "Adds a record to an index or replaces it.\n\n- If the record doesn't have an object ID, a new record with an auto-generated object ID is added to your index.\n- If a record with the specified object ID exists, the existing record is replaced.\n- If a record with the specified object ID doesn't exist, a new record is added to your index.\n- If you add a record to an index that doesn't exist yet, a new index is created.\n\nTo update _some_ attributes of a record, use the [`partial` operation](#tag/Records/operation/partialUpdateObject).\nTo add, update, or replace multiple records, use the [`batch` operation](#tag/Records/operation/batch).\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}"
          }
        }
      },
      {
        "name": "Get object",
        "value": "getObject",
        "action": "Get object",
        "description": "Retrieves one record by its object ID.\n\nTo retrieve more than one record, use the [`objects` operation](#tag/Records/operation/getObjects).\n",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/{{ $parameter.objectID_string }}"
          }
        }
      },
      {
        "name": "Add or update object",
        "value": "addOrUpdateObject",
        "action": "Add or update object",
        "description": "If a record with the specified object ID exists, the existing record is replaced.\nOtherwise, a new record is added to the index.\n\nIf you want to use auto-generated object IDs, use the [`saveObject` operation](#tag/Records/operation/saveObject).\nTo update _some_ attributes of an existing record, use the [`partial` operation](#tag/Records/operation/partialUpdateObject) instead.\nTo add, update, or replace multiple records, use the [`batch` operation](#tag/Records/operation/batch).\n",
        "routing": {
          "request": {
            "method": "PUT",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/{{ $parameter.objectID_string }}"
          }
        }
      },
      {
        "name": "Delete object",
        "value": "deleteObject",
        "action": "Delete object",
        "description": "Deletes a record by its object ID.\n\nTo delete more than one record, use the [`batch` operation](#tag/Records/operation/batch).\nTo delete records matching a query, use the [`deleteBy` operation](#tag/Records/operation/deleteBy).\n",
        "routing": {
          "request": {
            "method": "DELETE",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/{{ $parameter.objectID_string }}"
          }
        }
      },
      {
        "name": "Delete by",
        "value": "deleteBy",
        "action": "Delete by",
        "description": "This operation doesn't accept empty filters.\n\nThis operation is resource-intensive.\nYou should only use it if you can't get the object IDs of the records you want to delete.\nIt's more efficient to get a list of object IDs with the [`browse` operation](#tag/Search/operation/browse),\nand then delete the records using the [`batch` operation](#tag/Records/operation/batch).\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/deleteByQuery"
          }
        }
      },
      {
        "name": "Clear objects",
        "value": "clearObjects",
        "action": "Clear objects",
        "description": "Deletes only the records from an index while keeping settings, synonyms, and rules.\nThis operation is resource-intensive and subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/clear"
          }
        }
      },
      {
        "name": "Partial update object",
        "value": "partialUpdateObject",
        "action": "Partial update object",
        "description": "Adds new attributes to a record, or updates existing ones.\n\n- If a record with the specified object ID doesn't exist,\n  a new record is added to the index **if** `createIfNotExists` is true.\n- If the index doesn't exist yet, this method creates a new index.\n- You can use any first-level attribute but not nested attributes.\n  If you specify a nested attribute, this operation replaces its first-level ancestor.\n\nTo update an attribute without pushing the entire record, you can use these built-in operations.\nThese operations can be helpful if you don't have access to your initial data.\n\n- Increment: increment a numeric attribute\n- Decrement: decrement a numeric attribute\n- Add: append a number or string element to an array attribute\n- Remove: remove all matching number or string elements from an array attribute made of numbers or strings\n- AddUnique: add a number or string element to an array attribute made of numbers or strings only if it's not already present\n- IncrementFrom: increment a numeric integer attribute only if the provided value matches the current value, and otherwise ignore the whole object update. For example, if you pass an IncrementFrom value of 2 for the version attribute, but the current value of the attribute is 1, the engine ignores the update. If the object doesn't exist, the engine only creates it if you pass an IncrementFrom value of 0.\n- IncrementSet: increment a numeric integer attribute only if the provided value is greater than the current value, and otherwise ignore the whole object update. For example, if you pass an IncrementSet value of 2 for the version attribute, and the current value of the attribute is 1, the engine updates the object. If the object doesn't exist yet, the engine only creates it if you pass an IncrementSet value greater than 0.\n\nYou can specify an operation by providing an object with the attribute to update as the key and its value being an object with the following properties:\n\n- _operation: the operation to apply on the attribute\n- value: the right-hand side argument to the operation, for example, increment or decrement step, value to add or remove.\n\nWhen updating multiple attributes or using multiple operations targeting the same record, you should use a single partial update for faster processing.\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/{{ $parameter.objectID_string }}/partial"
          }
        }
      },
      {
        "name": "Batch",
        "value": "batch",
        "action": "Batch",
        "description": "Adds, updates, or deletes records in one index with a single API request.\n\nBatching index updates reduces latency and increases data integrity.\n\n- Actions are applied in the order they're specified.\n- Actions are equivalent to the individual API requests of the same name.\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/batch"
          }
        }
      },
      {
        "name": "Multiple batch",
        "value": "multipleBatch",
        "action": "Multiple batch",
        "description": "Adds, updates, or deletes records in multiple indices with a single API request.\n\n- Actions are applied in the order they are specified.\n- Actions are equivalent to the individual API requests of the same name.\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/*/batch"
          }
        }
      },
      {
        "name": "Get objects",
        "value": "getObjects",
        "action": "Get objects",
        "description": "Retrieves one or more records, potentially from different indices.\n\nRecords are returned in the same order as the requests.\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/*/objects"
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ]
      }
    }
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "",
    "description": "Select the operation to work with",
    "options": [
      {
        "name": "Delete index",
        "value": "deleteIndex",
        "action": "Delete index",
        "description": "Deletes an index and all its settings.\n\n- Deleting an index doesn't delete its analytics data.\n- If you try to delete a non-existing index, the operation is ignored without warning.\n- If the index you want to delete has replica indices, the replicas become independent indices.\n- If the index you want to delete is a replica index, you must first unlink it from its primary index before you can delete it.\n  For more information, see [Delete replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/deleting-replicas/).\n",
        "routing": {
          "request": {
            "method": "DELETE",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}"
          }
        }
      },
      {
        "name": "Get settings",
        "value": "getSettings",
        "action": "Get settings",
        "description": "Retrieves an object with non-null index settings.",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/settings"
          }
        }
      },
      {
        "name": "Set settings",
        "value": "setSettings",
        "action": "Set settings",
        "description": "Update the specified index settings.\n\nIndex settings that you don't specify are left unchanged.\nSpecify `null` to reset a setting to its default value.\n\nFor best performance, update the index settings before you add new records to your index.\n",
        "routing": {
          "request": {
            "method": "PUT",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/settings"
          }
        }
      },
      {
        "name": "Get task",
        "value": "getTask",
        "action": "Get task",
        "description": "Checks the status of a given task.\n\nIndexing tasks are asynchronous.\nWhen you add, update, or delete records or indices,\na task is created on a queue and completed depending on the load on the server.\n\nThe indexing tasks' responses include a task ID that you can use to check the status.\n",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/task/{{ $parameter.taskID_number }}"
          }
        }
      },
      {
        "name": "Operation index",
        "value": "operationIndex",
        "action": "Operation index",
        "description": "Copies or moves (renames) an index within the same Algolia application.\n\n- Existing destination indices are overwritten, except for their analytics data.\n- If the destination index doesn't exist yet, it'll be created.\n- This operation is resource-intensive.\n\n**Copy**\n\n- Copying a source index that doesn't exist creates a new index with 0 records and default settings.\n- The API keys of the source index are merged with the existing keys in the destination index.\n- You can't copy the `enableReRanking`, `mode`, and `replicas` settings.\n- You can't copy to a destination index that already has replicas.\n- Be aware of the [size limits](https://www.algolia.com/doc/guides/scaling/algolia-service-limits/#application-record-and-index-limits).\n- Related guide: [Copy indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/copy-indices/)\n\n**Move**\n\n- Moving a source index that doesn't exist is ignored without returning an error.\n- When moving an index, the analytics data keeps its original name, and a new set of analytics data is started for the new name.\n  To access the original analytics in the dashboard, create an index with the original name.\n- If the destination index has replicas, moving will overwrite the existing index and copy the data to the replica indices.\n- Related guide: [Move indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/move-indices/).\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/operation"
          }
        }
      },
      {
        "name": "List indices",
        "value": "listIndices",
        "action": "List indices",
        "description": "Lists all indices in the current Algolia application.\n\nThe request follows any index restrictions of the API key you use to make the request.\n",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/indexes"
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          "Indices"
        ]
      }
    }
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "",
    "description": "Select the operation to work with",
    "options": [
      {
        "name": "Get synonym",
        "value": "getSynonym",
        "action": "Get synonym",
        "description": "Retrieves a synonym by its ID.\nTo find the object IDs for your synonyms,\nuse the [`search` operation](#tag/Synonyms/operation/searchSynonyms).\n",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/synonyms/{{ $parameter.objectID_string }}"
          }
        }
      },
      {
        "name": "Save synonym",
        "value": "saveSynonym",
        "action": "Save synonym",
        "description": "If a synonym with the specified object ID doesn't exist, Algolia adds a new one.\nOtherwise, the existing synonym is replaced.\nTo add multiple synonyms in a single API request, use the [`batch` operation](#tag/Synonyms/operation/saveSynonyms).\n",
        "routing": {
          "request": {
            "method": "PUT",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/synonyms/{{ $parameter.objectID_string }}"
          }
        }
      },
      {
        "name": "Delete synonym",
        "value": "deleteSynonym",
        "action": "Delete synonym",
        "description": "Deletes a synonym by its ID.\nTo find the object IDs of your synonyms, use the [`search` operation](#tag/Synonyms/operation/searchSynonyms).\n",
        "routing": {
          "request": {
            "method": "DELETE",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/synonyms/{{ $parameter.objectID_string }}"
          }
        }
      },
      {
        "name": "Save synonyms",
        "value": "saveSynonyms",
        "action": "Save synonyms",
        "description": "If a synonym with the `objectID` doesn't exist, Algolia adds a new one.\nOtherwise, existing synonyms are replaced.\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/synonyms/batch"
          }
        }
      },
      {
        "name": "Clear synonyms",
        "value": "clearSynonyms",
        "action": "Clear synonyms",
        "description": "Deletes all synonyms from the index.",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/synonyms/clear"
          }
        }
      },
      {
        "name": "Search synonyms",
        "value": "searchSynonyms",
        "action": "Search synonyms",
        "description": "Searches for synonyms in your index.",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/synonyms/search"
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ]
      }
    }
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "",
    "description": "Select the operation to work with",
    "options": [
      {
        "name": "List api keys",
        "value": "listApiKeys",
        "action": "List api keys",
        "description": "Lists all API keys associated with your Algolia application, including their permissions and restrictions.",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/keys"
          }
        }
      },
      {
        "name": "Add api key",
        "value": "addApiKey",
        "action": "Add api key",
        "description": "Creates a new API key with specific permissions and restrictions.",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/keys"
          }
        }
      },
      {
        "name": "Get api key",
        "value": "getApiKey",
        "action": "Get api key",
        "description": "Gets the permissions and restrictions of an API key.\n\nWhen authenticating with the admin API key, you can request information for any of your application's keys.\nWhen authenticating with other API keys, you can only retrieve information for that key,\nwith the description replaced by `<redacted>`.\n",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/keys/{{ $parameter.key_string }}"
          }
        }
      },
      {
        "name": "Update api key",
        "value": "updateApiKey",
        "action": "Update api key",
        "description": "Replaces the permissions of an existing API key.\n\nAny unspecified attribute resets that attribute to its default value.\n",
        "routing": {
          "request": {
            "method": "PUT",
            "url": "=/1/keys/{{ $parameter.key_string }}"
          }
        }
      },
      {
        "name": "Delete api key",
        "value": "deleteApiKey",
        "action": "Delete api key",
        "description": "Deletes the API key.",
        "routing": {
          "request": {
            "method": "DELETE",
            "url": "=/1/keys/{{ $parameter.key_string }}"
          }
        }
      },
      {
        "name": "Restore api key",
        "value": "restoreApiKey",
        "action": "Restore api key",
        "description": "Restores a deleted API key.\n\nRestoring resets the `validity` attribute to `0`.\n\nAlgolia stores up to 1,000 API keys per application.\nIf you create more, the oldest API keys are deleted and can't be restored.\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/keys/{{ $parameter.key_string }}/restore"
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          "Api Keys"
        ]
      }
    }
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "",
    "description": "Select the operation to work with",
    "options": [
      {
        "name": "Get rule",
        "value": "getRule",
        "action": "Get rule",
        "description": "Retrieves a rule by its ID.\nTo find the object ID of rules, use the [`search` operation](#tag/Rules/operation/searchRules).\n",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/rules/{{ $parameter.objectID_string }}"
          }
        }
      },
      {
        "name": "Save rule",
        "value": "saveRule",
        "action": "Save rule",
        "description": "If a rule with the specified object ID doesn't exist, it's created.\nOtherwise, the existing rule is replaced.\n\nTo create or update more than one rule, use the [`batch` operation](#tag/Rules/operation/saveRules).\n",
        "routing": {
          "request": {
            "method": "PUT",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/rules/{{ $parameter.objectID_string }}"
          }
        }
      },
      {
        "name": "Delete rule",
        "value": "deleteRule",
        "action": "Delete rule",
        "description": "Deletes a rule by its ID.\nTo find the object ID for rules,\nuse the [`search` operation](#tag/Rules/operation/searchRules).\n",
        "routing": {
          "request": {
            "method": "DELETE",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/rules/{{ $parameter.objectID_string }}"
          }
        }
      },
      {
        "name": "Save rules",
        "value": "saveRules",
        "action": "Save rules",
        "description": "Create or update multiple rules.\n\nIf a rule with the specified object ID doesn't exist, Algolia creates a new one.\nOtherwise, existing rules are replaced.\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/rules/batch"
          }
        }
      },
      {
        "name": "Clear rules",
        "value": "clearRules",
        "action": "Clear rules",
        "description": "Deletes all rules from the index.",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/rules/clear"
          }
        }
      },
      {
        "name": "Search rules",
        "value": "searchRules",
        "action": "Search rules",
        "description": "Searches for rules in your index.",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/indexes/{{ $parameter.indexName_string }}/rules/search"
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ]
      }
    }
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "",
    "description": "Select the operation to work with",
    "options": [
      {
        "name": "Batch dictionary entries",
        "value": "batchDictionaryEntries",
        "action": "Batch dictionary entries",
        "description": "Adds or deletes multiple entries from your plurals, segmentation, or stop word dictionaries.",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/dictionaries/{{ $parameter.dictionaryName_options }}/batch"
          }
        }
      },
      {
        "name": "Search dictionary entries",
        "value": "searchDictionaryEntries",
        "action": "Search dictionary entries",
        "description": "Searches for standard and custom dictionary entries.",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/dictionaries/{{ $parameter.dictionaryName_options }}/search"
          }
        }
      },
      {
        "name": "Get dictionary settings",
        "value": "getDictionarySettings",
        "action": "Get dictionary settings",
        "description": "Retrieves the languages for which standard dictionary entries are turned off.",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/dictionaries/*/settings"
          }
        }
      },
      {
        "name": "Set dictionary settings",
        "value": "setDictionarySettings",
        "action": "Set dictionary settings",
        "description": "Turns standard stop word dictionary entries on or off for a given language.",
        "routing": {
          "request": {
            "method": "PUT",
            "url": "=/1/dictionaries/*/settings"
          }
        }
      },
      {
        "name": "Get dictionary languages",
        "value": "getDictionaryLanguages",
        "action": "Get dictionary languages",
        "description": "Lists supported languages with their supported dictionary types and number of custom entries.\n",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/dictionaries/*/languages"
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          "Dictionaries"
        ]
      }
    }
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "",
    "description": "Select the operation to work with",
    "options": [
      {
        "name": "Assign user id",
        "value": "assignUserId",
        "action": "Assign user id",
        "description": "Assigns or moves a user ID to a cluster.\n\nThe time it takes to move a user is proportional to the amount of data linked to the user ID.\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/clusters/mapping"
          }
        }
      },
      {
        "name": "List user ids",
        "value": "listUserIds",
        "action": "List user ids",
        "description": "Lists the userIDs assigned to a multi-cluster application.\n\nSince it can take a few seconds to get the data from the different clusters,\nthe response isn't real-time.\n",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/clusters/mapping"
          }
        }
      },
      {
        "name": "Batch assign user ids",
        "value": "batchAssignUserIds",
        "action": "Batch assign user ids",
        "description": "Assigns multiple user IDs to a cluster.\n\n**You can't move users with this operation**.\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/clusters/mapping/batch"
          }
        }
      },
      {
        "name": "Get top user ids",
        "value": "getTopUserIds",
        "action": "Get top user ids",
        "description": "Get the IDs of the 10 users with the highest number of records per cluster.\n\nSince it can take a few seconds to get the data from the different clusters,\nthe response isn't real-time.\n",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/clusters/mapping/top"
          }
        }
      },
      {
        "name": "Get user id",
        "value": "getUserId",
        "action": "Get user id",
        "description": "Returns the user ID data stored in the mapping.\n\nSince it can take a few seconds to get the data from the different clusters,\nthe response isn't real-time.\n",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/clusters/mapping/{{ $parameter.userID_string }}"
          }
        }
      },
      {
        "name": "Remove user id",
        "value": "removeUserId",
        "action": "Remove user id",
        "description": "Deletes a user ID and its associated data from the clusters.",
        "routing": {
          "request": {
            "method": "DELETE",
            "url": "=/1/clusters/mapping/{{ $parameter.userID_string }}"
          }
        }
      },
      {
        "name": "List clusters",
        "value": "listClusters",
        "action": "List clusters",
        "description": "Lists the available clusters in a multi-cluster setup.",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/clusters"
          }
        }
      },
      {
        "name": "Search user ids",
        "value": "searchUserIds",
        "action": "Search user ids",
        "description": "Since it can take a few seconds to get the data from the different clusters,\nthe response isn't real-time.\n\nTo ensure rapid updates, the user IDs index isn't built at the same time as the mapping. Instead, it's built every 12 hours, at the same time as the update of user ID usage. For example, if you add or move a user ID, the search will show an old value until the next time the mapping is rebuilt (every 12 hours).\n",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/clusters/mapping/search"
          }
        }
      },
      {
        "name": "Has pending mappings",
        "value": "hasPendingMappings",
        "action": "Has pending mappings",
        "description": "To determine when the time-consuming process of creating a large batch of users or migrating users from one cluster to another is complete, this operation retrieves the status of the process.\n",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/clusters/mapping/pending"
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          "Clusters"
        ]
      }
    }
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "",
    "description": "Select the operation to work with",
    "options": [
      {
        "name": "Get sources",
        "value": "getSources",
        "action": "Get sources",
        "description": "Retrieves all allowed IP addresses with access to your application.",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/security/sources"
          }
        }
      },
      {
        "name": "Replace sources",
        "value": "replaceSources",
        "action": "Replace sources",
        "description": "Replaces the list of allowed sources.",
        "routing": {
          "request": {
            "method": "PUT",
            "url": "=/1/security/sources"
          }
        }
      },
      {
        "name": "Append source",
        "value": "appendSource",
        "action": "Append source",
        "description": "Adds a source to the list of allowed sources.",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/1/security/sources/append"
          }
        }
      },
      {
        "name": "Delete source",
        "value": "deleteSource",
        "action": "Delete source",
        "description": "Deletes a source from the list of allowed sources.",
        "routing": {
          "request": {
            "method": "DELETE",
            "url": "=/1/security/sources/{{ $parameter.source_string }}"
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          "Vaults"
        ]
      }
    }
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "",
    "description": "Select the operation to work with",
    "options": [
      {
        "name": "Get logs",
        "value": "getLogs",
        "action": "Get logs",
        "description": "The request must be authenticated by an API key with the [`logs` ACL](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).\n\n- Logs are held for the last seven days.\n- Up to 1,000 API requests per server are logged.\n- This request counts towards your [operations quota](https://support.algolia.com/hc/en-us/articles/4406981829777-How-does-Algolia-count-records-and-operations-) but doesn't appear in the logs itself.\n",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/logs"
          }
        }
      },
      {
        "name": "Get app task",
        "value": "getAppTask",
        "action": "Get app task",
        "description": "Checks the status of a given application task.\n",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/1/task/{{ $parameter.taskID_number }}"
          }
        }
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          "Advanced"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "options",
    "name": "selector",
    "displayName": "Selector",
    "default": "",
    "options": [
      {
        "name": "Search parameters as query string",
        "value": "search_parameters_as_query_string"
      },
      {
        "name": "Search parameters as object",
        "value": "search_parameters_as_object"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "hitsPerPage=2&getRankingInfo=1",
    "description": "Search parameters as a URL-encoded query string.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "params"
      }
    },
    "displayName": "Params",
    "name": "params_string",
    "default": "",
    "displayOptions": {
      "show": {
        "selector": [
          "search_parameters_as_query_string"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "multiOptions",
    "name": "search_parameters_as_object",
    "displayName": "Search parameters as object",
    "description": "Each parameter value, including the `query` must not be larger than 512 bytes.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Query",
        "value": "query_string"
      },
      {
        "name": "Similar Query",
        "value": "similarquery_string"
      },
      {
        "name": "Filters",
        "value": "filters_string"
      },
      {
        "name": "Facet Filters",
        "value": "facetfilters"
      },
      {
        "name": "Optional Filters",
        "value": "optionalfilters"
      },
      {
        "name": "Numeric Filters",
        "value": "numericfilters"
      },
      {
        "name": "Tag Filters",
        "value": "tagfilters"
      },
      {
        "name": "Sum Or Filters Scores",
        "value": "sumorfiltersscores_boolean"
      },
      {
        "name": "Restrict Searchable Attributes",
        "value": "restrictsearchableattributes_json"
      },
      {
        "name": "Facets",
        "value": "facets_json"
      },
      {
        "name": "Faceting After Distinct",
        "value": "facetingafterdistinct_boolean"
      },
      {
        "name": "Page",
        "value": "page_number"
      },
      {
        "name": "Offset",
        "value": "offset_number"
      },
      {
        "name": "Length",
        "value": "length_number"
      },
      {
        "name": "Around Lat Lng",
        "value": "aroundlatlng_string"
      },
      {
        "name": "Around Lat Lng Via IP",
        "value": "aroundlatlngviaip_boolean"
      },
      {
        "name": "Around Radius",
        "value": "aroundradius"
      },
      {
        "name": "Around Precision",
        "value": "aroundprecision"
      },
      {
        "name": "Minimum Around Radius",
        "value": "minimumaroundradius_number"
      },
      {
        "name": "Inside Bounding Box",
        "value": "insideboundingbox"
      },
      {
        "name": "Inside Polygon",
        "value": "insidepolygon_json"
      },
      {
        "name": "Natural Languages",
        "value": "naturallanguages_json"
      },
      {
        "name": "Rule Contexts",
        "value": "rulecontexts_json"
      },
      {
        "name": "Personalization Impact",
        "value": "personalizationimpact_number"
      },
      {
        "name": "User Token",
        "value": "usertoken_string"
      },
      {
        "name": "Get Ranking Info",
        "value": "getrankinginfo_boolean"
      },
      {
        "name": "Synonyms",
        "value": "synonyms_boolean"
      },
      {
        "name": "Click Analytics",
        "value": "clickanalytics_boolean"
      },
      {
        "name": "Analytics",
        "value": "analytics_boolean"
      },
      {
        "name": "Analytics Tags",
        "value": "analyticstags_json"
      },
      {
        "name": "Percentile Computation",
        "value": "percentilecomputation_boolean"
      },
      {
        "name": "Enable ABTest",
        "value": "enableabtest_boolean"
      },
      {
        "name": "Attributes To Retrieve",
        "value": "attributestoretrieve_json"
      },
      {
        "name": "Ranking",
        "value": "ranking_json"
      },
      {
        "name": "Relevancy Strictness",
        "value": "relevancystrictness_number"
      },
      {
        "name": "Attributes To Highlight",
        "value": "attributestohighlight_json"
      },
      {
        "name": "Attributes To Snippet",
        "value": "attributestosnippet_json"
      },
      {
        "name": "Highlight Pre Tag",
        "value": "highlightpretag_string"
      },
      {
        "name": "Highlight Post Tag",
        "value": "highlightposttag_string"
      },
      {
        "name": "Snippet Ellipsis Text",
        "value": "snippetellipsistext_string"
      },
      {
        "name": "Restrict Highlight And Snippet Arrays",
        "value": "restricthighlightandsnippetarrays_boolean"
      },
      {
        "name": "Hits Per Page",
        "value": "hitsperpage_number"
      },
      {
        "name": "Min Word Sizefor1Typo",
        "value": "minwordsizefor1typo_number"
      },
      {
        "name": "Min Word Sizefor2Typos",
        "value": "minwordsizefor2typos_number"
      },
      {
        "name": "Typo Tolerance",
        "value": "typotolerance"
      },
      {
        "name": "Allow Typos On Numeric Tokens",
        "value": "allowtyposonnumerictokens_boolean"
      },
      {
        "name": "Disable Typo Tolerance On Attributes",
        "value": "disabletypotoleranceonattributes_json"
      },
      {
        "name": "Ignore Plurals",
        "value": "ignoreplurals"
      },
      {
        "name": "Remove Stop Words",
        "value": "removestopwords"
      },
      {
        "name": "Query Languages",
        "value": "querylanguages_json"
      },
      {
        "name": "Decompound Query",
        "value": "decompoundquery_boolean"
      },
      {
        "name": "Enable Rules",
        "value": "enablerules_boolean"
      },
      {
        "name": "Enable Personalization",
        "value": "enablepersonalization_boolean"
      },
      {
        "name": "Query Type",
        "value": "querytype_options"
      },
      {
        "name": "Remove Words If No Results",
        "value": "removewordsifnoresults_options"
      },
      {
        "name": "Mode",
        "value": "mode_options"
      },
      {
        "name": "Semantic search object",
        "value": "semantic_search_object"
      },
      {
        "name": "Advanced Syntax",
        "value": "advancedsyntax_boolean"
      },
      {
        "name": "Optional Words",
        "value": "optionalwords"
      },
      {
        "name": "Disable Exact On Attributes",
        "value": "disableexactonattributes_json"
      },
      {
        "name": "Exact On Single Word Query",
        "value": "exactonsinglewordquery_options"
      },
      {
        "name": "Alternatives As Exact",
        "value": "alternativesasexact_json"
      },
      {
        "name": "Advanced Syntax Features",
        "value": "advancedsyntaxfeatures_json"
      },
      {
        "name": "Distinct",
        "value": "distinct"
      },
      {
        "name": "Replace Synonyms In Highlight",
        "value": "replacesynonymsinhighlight_boolean"
      },
      {
        "name": "Min Proximity",
        "value": "minproximity_number"
      },
      {
        "name": "Response Fields",
        "value": "responsefields_json"
      },
      {
        "name": "Max Values Per Facet",
        "value": "maxvaluesperfacet_number"
      },
      {
        "name": "Sort Facet Values By",
        "value": "sortfacetvaluesby_string"
      },
      {
        "name": "Attribute Criteria Computed By Min Proximity",
        "value": "attributecriteriacomputedbyminproximity_boolean"
      },
      {
        "name": "Rendering content object",
        "value": "rendering_content_object"
      },
      {
        "name": "Enable Re Ranking",
        "value": "enablereranking_boolean"
      },
      {
        "name": "Re Ranking Apply Filter",
        "value": "rerankingapplyfilter"
      }
    ],
    "displayOptions": {
      "show": {
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "description": "Search query.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "query"
      }
    },
    "displayName": "Query",
    "name": "query_string",
    "default": "",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "query_string"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "comedy drama crime Macy Buscemi",
    "description": "Keywords to be used instead of the search query to conduct a more broader search\nUsing the `similarQuery` parameter changes other settings\n- `queryType` is set to `prefixNone`.\n- `removeStopWords` is set to true.\n- `words` is set as the first ranking criterion.\n- All remaining words are treated as `optionalWords`\nSince the `similarQuery` is supposed to do a broad search, they usually return many results.\nCombine it with `filters` to narrow down the list of results.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "similarQuery"
      }
    },
    "displayName": "Similar Query",
    "name": "similarQuery_string",
    "default": "",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "similarquery_string"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "(category:Book OR category:Ebook) AND _tags:published",
    "description": "Filter expression to only include items that match the filter criteria in the response.\n\nYou can use these filter expressions:\n\n- **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`.\n- **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive).\n- **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value.\n- **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive).\n- **Boolean filters.** `<facet>: true | false`.\n\nYou can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:\n\n- You can only combine filters of the same type with `OR`.\n  **Not supported:** `facet:value OR num > 3`.\n- You can't use `NOT` with combinations of filters.\n  **Not supported:** `NOT(facet:value OR facet:value)`\n- You can't combine conjunctions (`AND`) with `OR`.\n  **Not supported:** `facet:value OR (facet:value AND facet:value)`\n\nUse quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes.\nIf a facet attribute is an array, the filter matches if it matches at least one element of the array.\n\nFor more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "filters"
      }
    },
    "displayName": "Filters",
    "name": "filters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "filters_string"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "facetFilters",
    "displayName": "Facet Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "facetFilters",
        "value": "={{ typeof $parameter.facetFilters_json !== \"undefined\" ? JSON.parse($parameter.facetFilters_json) : typeof $parameter.facetFilters_string !== \"undefined\" ? $parameter.facetFilters_string : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "facetfilters"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Facet Filters",
    "name": "facetFilters_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "facetFilters": [
          "array"
        ],
        "search_parameters_as_object": [
          "facetfilters"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Facet Filters",
    "name": "facetFilters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "facetFilters": [
          "string"
        ],
        "search_parameters_as_object": [
          "facetfilters"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "optionalFilters",
    "displayName": "Optional Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "optionalFilters",
        "value": "={{ typeof $parameter.optionalFilters_json !== \"undefined\" ? JSON.parse($parameter.optionalFilters_json) : typeof $parameter.optionalFilters_string !== \"undefined\" ? $parameter.optionalFilters_string : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "optionalfilters"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Optional Filters",
    "name": "optionalFilters_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "optionalFilters": [
          "array"
        ],
        "search_parameters_as_object": [
          "optionalfilters"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Optional Filters",
    "name": "optionalFilters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "optionalFilters": [
          "string"
        ],
        "search_parameters_as_object": [
          "optionalfilters"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "numericFilters",
    "displayName": "Numeric Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "numericFilters",
        "value": "={{ typeof $parameter.numericFilters_json !== \"undefined\" ? JSON.parse($parameter.numericFilters_json) : typeof $parameter.numericFilters_string !== \"undefined\" ? $parameter.numericFilters_string : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "numericfilters"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Numeric Filters",
    "name": "numericFilters_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "numericFilters": [
          "array"
        ],
        "search_parameters_as_object": [
          "numericfilters"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Numeric Filters",
    "name": "numericFilters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "numericFilters": [
          "string"
        ],
        "search_parameters_as_object": [
          "numericfilters"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "tagFilters",
    "displayName": "Tag Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "tagFilters",
        "value": "={{ typeof $parameter.tagFilters_json !== \"undefined\" ? JSON.parse($parameter.tagFilters_json) : typeof $parameter.tagFilters_string !== \"undefined\" ? $parameter.tagFilters_string : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "tagfilters"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Tag Filters",
    "name": "tagFilters_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "tagFilters": [
          "array"
        ],
        "search_parameters_as_object": [
          "tagfilters"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Tag Filters",
    "name": "tagFilters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "tagFilters": [
          "string"
        ],
        "search_parameters_as_object": [
          "tagfilters"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to sum all filter scores\nIf true, all filter scores are summed.\nOtherwise, the maximum filter score is kept.\nFor more information, see [filter scores](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/in-depth/filter-scoring/#accumulating-scores-with-sumorfiltersscores).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "sumOrFiltersScores"
      }
    },
    "displayName": "Sum Or Filters Scores",
    "name": "sumOrFiltersScores_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "sumorfiltersscores_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Restrict Searchable Attributes",
    "name": "restrictSearchableAttributes_json",
    "default": "[]",
    "description": "Restricts a search to a subset of your searchable attributes.\nAttribute names are case-sensitive.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "restrictSearchableAttributes"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "restrictsearchableattributes_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Facets",
    "name": "facets_json",
    "default": "[]",
    "description": "Facets for which to retrieve facet values that match the search criteria and the number of matching facet values\nTo retrieve all facets, use the wildcard character `*`.\nFor more information, see [facets](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#contextual-facet-values-and-counts).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "facets"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "facets_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether faceting should be applied after deduplication with `distinct`\nThis leads to accurate facet counts when using faceting in combination with `distinct`.\nIt's usually better to use `afterDistinct` modifiers in the `attributesForFaceting` setting,\nas `facetingAfterDistinct` only computes correct facet counts if all records have the same facet values for the `attributeForDistinct`.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "facetingAfterDistinct"
      }
    },
    "displayName": "Faceting After Distinct",
    "name": "facetingAfterDistinct_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "facetingafterdistinct_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Page of search results to retrieve.",
    "required": false,
    "typeOptions": {
      "minValue": 0
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "page"
      }
    },
    "displayName": "Page",
    "name": "page_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "page_number"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Position of the first hit to retrieve.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "offset"
      }
    },
    "displayName": "Offset",
    "name": "offset_number",
    "default": "",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "offset_number"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Number of hits to retrieve (used in combination with `offset`).",
    "required": false,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 1000
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "length"
      }
    },
    "displayName": "Length",
    "name": "length_number",
    "default": "",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "length_number"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "40.71,-74.01",
    "description": "Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.\n\nOnly records included within a circle around this central location are included in the results.\nThe radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings.\nThis parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "aroundLatLng"
      }
    },
    "displayName": "Around Lat Lng",
    "name": "aroundLatLng_string",
    "default": "",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "aroundlatlng_string"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to obtain the coordinates from the request's IP address.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "aroundLatLngViaIP"
      }
    },
    "displayName": "Around Lat Lng Via IP",
    "name": "aroundLatLngViaIP_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "aroundlatlngviaip_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "aroundRadius",
    "displayName": "Around Radius",
    "default": "",
    "options": [
      {
        "name": "Integer",
        "value": "integer"
      },
      {
        "name": "All",
        "value": "all"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "aroundRadius",
        "value": "={{ typeof $parameter.aroundRadius_number !== \"undefined\" ? $parameter.aroundRadius_number : typeof $parameter.aroundRadius_options !== \"undefined\" ? $parameter.aroundRadius_options : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "aroundradius"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Maximum search radius around a central location in meters.",
    "required": false,
    "typeOptions": {
      "minValue": 1
    },
    "displayName": "Around Radius",
    "name": "aroundRadius_number",
    "default": "",
    "displayOptions": {
      "show": {
        "aroundRadius": [
          "integer"
        ],
        "search_parameters_as_object": [
          "aroundradius"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "description": "Return all records with a valid `_geoloc` attribute. Don't filter by distance.",
    "required": false,
    "options": [
      {
        "name": "all",
        "value": "all"
      }
    ],
    "displayName": "Around Radius",
    "name": "aroundRadius_options",
    "default": "",
    "displayOptions": {
      "show": {
        "aroundRadius": [
          "all"
        ],
        "search_parameters_as_object": [
          "aroundradius"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "aroundPrecision",
    "displayName": "Around Precision",
    "default": "",
    "options": [
      {
        "name": "Integer",
        "value": "integer"
      },
      {
        "name": "Range objects",
        "value": "range_objects"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "aroundPrecision",
        "value": "={{ typeof $parameter.aroundPrecision_number !== \"undefined\" ? $parameter.aroundPrecision_number : typeof $parameter.aroundPrecision_fixedCollection.aroundPrecision_fixedCollection_values !== \"undefined\" ? $parameter.aroundPrecision_fixedCollection.aroundPrecision_fixedCollection_values?.map(item => ({ from: typeof item.from_number_aroundPrecision !== \"undefined\" ? item.from_number_aroundPrecision : undefined, value: typeof item.value_number_aroundPrecision !== \"undefined\" ? item.value_number_aroundPrecision : undefined })) : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "aroundprecision"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 10,
    "description": "Distance in meters to group results by similar distances.\n\nFor example, if you set `aroundPrecision` to 100, records wihin 100 meters to the central coordinate are considered to have the same distance,\nas are records between 100 and 199 meters.\n",
    "required": false,
    "displayName": "Around Precision",
    "name": "aroundPrecision_number",
    "displayOptions": {
      "show": {
        "aroundPrecision": [
          "integer"
        ],
        "search_parameters_as_object": [
          "aroundprecision"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "fixedCollection",
    "displayName": "Around Precision",
    "name": "aroundPrecision_fixedCollection",
    "default": "",
    "required": false,
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "aroundPrecision_fixedCollection_values",
        "displayName": "Around Precision",
        "values": [
          {
            "type": "number",
            "placeholder": "20",
            "description": "Lower boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.",
            "required": false,
            "displayName": "From",
            "name": "from_number_aroundPrecision",
            "default": ""
          },
          {
            "type": "number",
            "description": "Upper boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.",
            "required": false,
            "displayName": "Value",
            "name": "value_number_aroundPrecision",
            "default": ""
          }
        ]
      }
    ],
    "displayOptions": {
      "show": {
        "aroundPrecision": [
          "range_objects"
        ],
        "search_parameters_as_object": [
          "aroundprecision"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Minimum radius (in meters) for a search around a location when `aroundRadius` isn't set.",
    "required": false,
    "typeOptions": {
      "minValue": 1
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "minimumAroundRadius"
      }
    },
    "displayName": "Minimum Around Radius",
    "name": "minimumAroundRadius_number",
    "default": "",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "minimumaroundradius_number"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "insideBoundingBox",
    "displayName": "Inside Bounding Box",
    "default": "",
    "options": [
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Null",
        "value": "null"
      },
      {
        "name": "Array",
        "value": "array"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "insideBoundingBox",
        "value": "={{ typeof $parameter.insideBoundingBox_string !== \"undefined\" ? $parameter.insideBoundingBox_string : typeof $parameter.insideBoundingBox_null !== \"undefined\" ? JSON.parse($parameter.insideBoundingBox_null) : typeof $parameter.insideBoundingBox_json !== \"undefined\" ? JSON.parse($parameter.insideBoundingBox_json) : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "insideboundingbox"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Inside Bounding Box",
    "name": "insideBoundingBox_string",
    "default": "",
    "displayOptions": {
      "show": {
        "insideBoundingBox": [
          "string"
        ],
        "search_parameters_as_object": [
          "insideboundingbox"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "insideBoundingBox",
    "name": "insideBoundingBox_null",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "insideBoundingBox": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "insideBoundingBox": [
          "null"
        ],
        "search_parameters_as_object": [
          "insideboundingbox"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Inside Bounding Box",
    "name": "insideBoundingBox_json",
    "default": "[]",
    "description": "Coordinates for a rectangular area in which to search.\n\nEach bounding box is defined by the two opposite points of its diagonal, and expressed as latitude and longitude pair:\n`[p1 lat, p1 long, p2 lat, p2 long]`.\nProvide multiple bounding boxes as nested arrays.\nFor more information, see [rectangular area](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\n",
    "required": false,
    "displayOptions": {
      "show": {
        "insideBoundingBox": [
          "array"
        ],
        "search_parameters_as_object": [
          "insideboundingbox"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Inside Polygon",
    "name": "insidePolygon_json",
    "default": "[]",
    "description": "Coordinates of a polygon in which to search.\n\nPolygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude.\nProvide multiple polygons as nested arrays.\nFor more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\nThis parameter is ignored if you also specify `insideBoundingBox`.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "insidePolygon"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "insidepolygon_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Natural Languages",
    "name": "naturalLanguages_json",
    "default": "[]",
    "description": "ISO language codes that adjust settings that are useful for processing natural language queries (as opposed to keyword searches)\n- Sets `removeStopWords` and `ignorePlurals` to the list of provided languages.\n- Sets `removeWordsIfNoResults` to `allOptional`.\n- Adds a `natural_language` attribute to `ruleContexts` and `analyticsTags`.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "naturalLanguages"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "naturallanguages_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Rule Contexts",
    "name": "ruleContexts_json",
    "default": "[]",
    "description": "Assigns a rule context to the search query\n[Rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/how-to/customize-search-results-by-platform/#whats-a-context) are strings that you can use to trigger matching rules.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "ruleContexts"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "rulecontexts_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 100,
    "description": "Impact that Personalization should have on this search\nThe higher this value is, the more Personalization determines the ranking compared to other factors.\nFor more information, see [Understanding Personalization impact](https://www.algolia.com/doc/guides/personalization/personalizing-results/in-depth/configuring-personalization/#understanding-personalization-impact).\n",
    "required": false,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 100
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "personalizationImpact"
      }
    },
    "displayName": "Personalization Impact",
    "name": "personalizationImpact_number",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "personalizationimpact_number"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "test-user-123",
    "description": "Unique pseudonymous or anonymous user identifier.\n\nThis helps with analytics and click and conversion events.\nFor more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "userToken"
      }
    },
    "displayName": "User Token",
    "name": "userToken_string",
    "default": "",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "usertoken_string"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether the search response should include detailed ranking information.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "getRankingInfo"
      }
    },
    "displayName": "Get Ranking Info",
    "name": "getRankingInfo_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "getrankinginfo_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to take into account an index's synonyms for this search.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "synonyms"
      }
    },
    "displayName": "Synonyms",
    "name": "synonyms_boolean",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "synonyms_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to include a `queryID` attribute in the response\nThe query ID is a unique identifier for a search query and is required for tracking [click and conversion events](https://www.algolia.com/guides/sending-events/getting-started/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "clickAnalytics"
      }
    },
    "displayName": "Click Analytics",
    "name": "clickAnalytics_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "clickanalytics_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether this search will be included in Analytics.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "analytics"
      }
    },
    "displayName": "Analytics",
    "name": "analytics_boolean",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "analytics_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Analytics Tags",
    "name": "analyticsTags_json",
    "default": "[]",
    "description": "Tags to apply to the query for [segmenting analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "analyticsTags"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "analyticstags_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to include this search when calculating processing-time percentiles.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "percentileComputation"
      }
    },
    "displayName": "Percentile Computation",
    "name": "percentileComputation_boolean",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "percentilecomputation_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to enable A/B testing for this search.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "enableABTest"
      }
    },
    "displayName": "Enable ABTest",
    "name": "enableABTest_boolean",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "enableabtest_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Retrieve",
    "name": "attributesToRetrieve_json",
    "default": "[]",
    "description": "Attributes to include in the API response\nTo reduce the size of your response, you can retrieve only some of the attributes.\nAttribute names are case-sensitive\n- `*` retrieves all attributes, except attributes included in the `customRanking` and `unretrievableAttributes` settings.\n- To retrieve all attributes except a specific one, prefix the attribute with a dash and combine it with the `*`: `[\"*\", \"-ATTRIBUTE\"]`.\n- The `objectID` attribute is always included.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "attributesToRetrieve"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "attributestoretrieve_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Ranking",
    "name": "ranking_json",
    "default": "[]",
    "description": "Determines the order in which Algolia returns your results.\n\nBy default, each entry corresponds to a [ranking criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/).\nThe tie-breaking algorithm sequentially applies each criterion in the order they're specified.\nIf you configure a replica index for [sorting by an attribute](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute/),\nyou put the sorting attribute at the top of the list.\n\n**Modifiers**\n\n- `asc(\"ATTRIBUTE\")`.\n  Sort the index by the values of an attribute, in ascending order.\n- `desc(\"ATTRIBUTE\")`.\n  Sort the index by the values of an attribute, in descending order.\n\nBefore you modify the default setting,\nyou should test your changes in the dashboard,\nand by [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "ranking"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "ranking_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "placeholder": "90",
    "default": 100,
    "description": "Relevancy threshold below which less relevant results aren't included in the results\nYou can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas).\nUse this setting to strike a balance between the relevance and number of returned results.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "relevancyStrictness"
      }
    },
    "displayName": "Relevancy Strictness",
    "name": "relevancyStrictness_number",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "relevancystrictness_number"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Highlight",
    "name": "attributesToHighlight_json",
    "default": "[]",
    "description": "Attributes to highlight\nBy default, all searchable attributes are highlighted.\nUse `*` to highlight all attributes or use an empty array `[]` to turn off highlighting.\nAttribute names are case-sensitive\nWith highlighting, strings that match the search query are surrounded by HTML tags defined by `highlightPreTag` and `highlightPostTag`.\nYou can use this to visually highlight matching parts of a search query in your UI\nFor more information, see [Highlighting and snippeting](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "attributesToHighlight"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "attributestohighlight_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Snippet",
    "name": "attributesToSnippet_json",
    "default": "[]",
    "description": "Attributes for which to enable snippets.\nAttribute names are case-sensitive\nSnippets provide additional context to matched words.\nIf you enable snippets, they include 10 words, including the matched word.\nThe matched word will also be wrapped by HTML tags for highlighting.\nYou can adjust the number of words with the following notation: `ATTRIBUTE:NUMBER`,\nwhere `NUMBER` is the number of words to be extracted.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "attributesToSnippet"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "attributestosnippet_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "<em>",
    "description": "HTML tag to insert before the highlighted parts in all highlighted results and snippets.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "highlightPreTag"
      }
    },
    "displayName": "Highlight Pre Tag",
    "name": "highlightPreTag_string",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "highlightpretag_string"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "</em>",
    "description": "HTML tag to insert after the highlighted parts in all highlighted results and snippets.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "highlightPostTag"
      }
    },
    "displayName": "Highlight Post Tag",
    "name": "highlightPostTag_string",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "highlightposttag_string"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "…",
    "description": "String used as an ellipsis indicator when a snippet is truncated.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "snippetEllipsisText"
      }
    },
    "displayName": "Snippet Ellipsis Text",
    "name": "snippetEllipsisText_string",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "snippetellipsistext_string"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to restrict highlighting and snippeting to items that at least partially matched the search query.\nBy default, all items are highlighted and snippeted.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "restrictHighlightAndSnippetArrays"
      }
    },
    "displayName": "Restrict Highlight And Snippet Arrays",
    "name": "restrictHighlightAndSnippetArrays_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "restricthighlightandsnippetarrays_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 20,
    "description": "Number of hits per page.",
    "required": false,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 1000
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "hitsPerPage"
      }
    },
    "displayName": "Hits Per Page",
    "name": "hitsPerPage_number",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "hitsperpage_number"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 4,
    "description": "Minimum number of characters a word in the search query must contain to accept matches with [one typo](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "minWordSizefor1Typo"
      }
    },
    "displayName": "Min Word Sizefor1Typo",
    "name": "minWordSizefor1Typo_number",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "minwordsizefor1typo_number"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 8,
    "description": "Minimum number of characters a word in the search query must contain to accept matches with [two typos](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "minWordSizefor2Typos"
      }
    },
    "displayName": "Min Word Sizefor2Typos",
    "name": "minWordSizefor2Typos_number",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "minwordsizefor2typos_number"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "typoTolerance",
    "displayName": "Typo Tolerance",
    "default": "",
    "options": [
      {
        "name": "Boolean",
        "value": "boolean"
      },
      {
        "name": "Typo tolerance",
        "value": "typo_tolerance"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "typoTolerance",
        "value": "={{ typeof $parameter.typoTolerance_boolean !== \"undefined\" ? $parameter.typoTolerance_boolean : typeof $parameter.typoTolerance_options !== \"undefined\" ? $parameter.typoTolerance_options : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "typotolerance"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether typo tolerance is active. If true, matches with typos are included in the search results and rank after exact matches.",
    "required": false,
    "displayName": "Typo Tolerance",
    "name": "typoTolerance_boolean",
    "displayOptions": {
      "show": {
        "typoTolerance": [
          "boolean"
        ],
        "search_parameters_as_object": [
          "typotolerance"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "description": "- `min`. Return matches with the lowest number of typos.\n  For example, if you have matches without typos, only include those.\n  But if there are no matches without typos (with 1 typo), include matches with 1 typo (2 typos).\n- `strict`. Return matches with the two lowest numbers of typos.\n  With `strict`, the Typo ranking criterion is applied first in the `ranking` setting.\n",
    "required": false,
    "options": [
      {
        "name": "min",
        "value": "min"
      },
      {
        "name": "strict",
        "value": "strict"
      },
      {
        "name": "true",
        "value": "true"
      },
      {
        "name": "false",
        "value": "false"
      }
    ],
    "displayName": "Typo Tolerance",
    "name": "typoTolerance_options",
    "default": "",
    "displayOptions": {
      "show": {
        "typoTolerance": [
          "typo_tolerance"
        ],
        "search_parameters_as_object": [
          "typotolerance"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to allow typos on numbers in the search query\nTurn off this setting to reduce the number of irrelevant matches\nwhen searching in large sets of similar numbers.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "allowTyposOnNumericTokens"
      }
    },
    "displayName": "Allow Typos On Numeric Tokens",
    "name": "allowTyposOnNumericTokens_boolean",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "allowtyposonnumerictokens_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Disable Typo Tolerance On Attributes",
    "name": "disableTypoToleranceOnAttributes_json",
    "default": "[]",
    "description": "Attributes for which you want to turn off [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/).\nAttribute names are case-sensitive\nReturning only exact matches can help when\n- [Searching in hyphenated attributes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes/).\n- Reducing the number of matches when you have too many.\n  This can happen with attributes that are long blocks of text, such as product descriptions\nConsider alternatives such as `disableTypoToleranceOnWords` or adding synonyms if your attributes have intentional unusual spellings that might look like typos.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "disableTypoToleranceOnAttributes"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "disabletypotoleranceonattributes_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "ignorePlurals",
    "displayName": "Ignore Plurals",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Boolean",
        "value": "boolean"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "ignorePlurals",
        "value": "={{ typeof $parameter.ignorePlurals_json !== \"undefined\" ? JSON.parse($parameter.ignorePlurals_json) : typeof $parameter.ignorePlurals_options !== \"undefined\" ? $parameter.ignorePlurals_options : typeof $parameter.ignorePlurals_boolean !== \"undefined\" ? $parameter.ignorePlurals_boolean : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "ignoreplurals"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Ignore Plurals",
    "name": "ignorePlurals_json",
    "default": "[]",
    "description": "ISO code for languages for which this feature should be active.\nThis overrides languages you set with `queryLanguages`.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "ignorePlurals": [
          "array"
        ],
        "search_parameters_as_object": [
          "ignoreplurals"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "required": false,
    "options": [
      {
        "name": "true",
        "value": "true"
      },
      {
        "name": "false",
        "value": "false"
      }
    ],
    "displayName": "Ignore Plurals",
    "name": "ignorePlurals_options",
    "default": "",
    "displayOptions": {
      "show": {
        "ignorePlurals": [
          "string"
        ],
        "search_parameters_as_object": [
          "ignoreplurals"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "If true, `ignorePlurals` is active for all languages included in `queryLanguages`, or for all supported languages, if `queryLanguges` is empty.\nIf false, singulars, plurals, and other declensions won't be considered equivalent.\n",
    "required": false,
    "displayName": "Ignore Plurals",
    "name": "ignorePlurals_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "ignorePlurals": [
          "boolean"
        ],
        "search_parameters_as_object": [
          "ignoreplurals"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "removeStopWords",
    "displayName": "Remove Stop Words",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "Boolean",
        "value": "boolean"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "removeStopWords",
        "value": "={{ typeof $parameter.removeStopWords_json !== \"undefined\" ? JSON.parse($parameter.removeStopWords_json) : typeof $parameter.removeStopWords_boolean !== \"undefined\" ? $parameter.removeStopWords_boolean : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "removestopwords"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Remove Stop Words",
    "name": "removeStopWords_json",
    "default": "[]",
    "description": "ISO code for languages for which stop words should be removed. This overrides languages you set in `queryLanguges`.",
    "required": false,
    "displayOptions": {
      "show": {
        "removeStopWords": [
          "array"
        ],
        "search_parameters_as_object": [
          "removestopwords"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "If true, stop words are removed for all languages you included in `queryLanguages`, or for all supported languages, if `queryLanguages` is empty.\nIf false, stop words are not removed.\n",
    "required": false,
    "displayName": "Remove Stop Words",
    "name": "removeStopWords_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "removeStopWords": [
          "boolean"
        ],
        "search_parameters_as_object": [
          "removestopwords"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Query Languages",
    "name": "queryLanguages_json",
    "default": "[]",
    "description": "Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries \nThis setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings.\nThis setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages.\nTo support this, you must place the CJK language **first** \n**You should always specify a query language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages/),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "queryLanguages"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "querylanguages_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to split compound words in the query into their building blocks\nFor more information, see [Word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#splitting-compound-words).\nWord segmentation is supported for these languages: German, Dutch, Finnish, Swedish, and Norwegian.\nDecompounding doesn't work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark).\nFor example, `Gartenstühle` won't be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "decompoundQuery"
      }
    },
    "displayName": "Decompound Query",
    "name": "decompoundQuery_boolean",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "decompoundquery_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to enable rules.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "enableRules"
      }
    },
    "displayName": "Enable Rules",
    "name": "enableRules_boolean",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "enablerules_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to enable Personalization.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "enablePersonalization"
      }
    },
    "displayName": "Enable Personalization",
    "name": "enablePersonalization_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "enablepersonalization_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "default": "prefixLast",
    "description": "Determines if and how query words are interpreted as prefixes.\n\nBy default, only the last query word is treated as a prefix (`prefixLast`).\nTo turn off prefix search, use `prefixNone`.\nAvoid `prefixAll`, which treats all query words as prefixes.\nThis might lead to counterintuitive results and makes your search slower.\n\nFor more information, see [Prefix searching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/prefix-searching/).\n",
    "required": false,
    "options": [
      {
        "name": "prefixLast",
        "value": "prefixLast"
      },
      {
        "name": "prefixAll",
        "value": "prefixAll"
      },
      {
        "name": "prefixNone",
        "value": "prefixNone"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "queryType"
      }
    },
    "displayName": "Query Type",
    "name": "queryType_options",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "querytype_options"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "firstWords",
    "default": "none",
    "description": "Strategy for removing words from the query when it doesn't return any results.\nThis helps to avoid returning empty search results.\n\n- `none`.\n  No words are removed when a query doesn't return results.\n\n- `lastWords`.\n  Treat the last (then second to last, then third to last) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `firstWords`.\n  Treat the first (then second, then third) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `allOptional`.\n  Treat all words as optional.\n\nFor more information, see [Remove words to improve results](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/in-depth/why-use-remove-words-if-no-results/).\n",
    "required": false,
    "options": [
      {
        "name": "none",
        "value": "none"
      },
      {
        "name": "lastWords",
        "value": "lastWords"
      },
      {
        "name": "firstWords",
        "value": "firstWords"
      },
      {
        "name": "allOptional",
        "value": "allOptional"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "removeWordsIfNoResults"
      }
    },
    "displayName": "Remove Words If No Results",
    "name": "removeWordsIfNoResults_options",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "removewordsifnoresults_options"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "default": "keywordSearch",
    "description": "Search mode the index will use to query for results.\n\nThis setting only applies to indices, for which Algolia enabled NeuralSearch for you.\n",
    "required": false,
    "options": [
      {
        "name": "neuralSearch",
        "value": "neuralSearch"
      },
      {
        "name": "keywordSearch",
        "value": "keywordSearch"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "mode"
      }
    },
    "displayName": "Mode",
    "name": "mode_options",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "mode_options"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "displayName": "Semantic Search",
    "name": "semantic_search_object",
    "type": "multiOptions",
    "description": "Settings for the semantic search part of NeuralSearch.\nOnly used when `mode` is `neuralSearch`.\n",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Event Sources",
        "value": "eventSources_semanticSearch"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "semanticSearch",
        "value": "={{ { \"eventSources\": typeof $parameter.eventSources_json_semanticSearch !== \"undefined\" ? JSON.parse($parameter.eventSources_json_semanticSearch) : typeof $parameter.eventSources_null_semanticSearch !== \"undefined\" ? JSON.parse($parameter.eventSources_null_semanticSearch) : undefined } }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "semantic_search_object"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "eventSources_semanticSearch",
    "displayName": "Event Sources",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "displayOptions": {
      "show": {
        "semantic_search_object": [
          "eventSources_semanticSearch"
        ],
        "search_parameters_as_object": [
          "semantic_search_object"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Event Sources",
    "name": "eventSources_json_semanticSearch",
    "default": "[]",
    "description": "Indices from which to collect click and conversion events.\n\nIf null, the current index and all its replicas are used.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "semantic_search_object": [
          "eventSources_semanticSearch"
        ],
        "eventSources_semanticSearch": [
          "array"
        ],
        "search_parameters_as_object": [
          "semantic_search_object"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "eventSources",
    "name": "eventSources_null_semanticSearch",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "eventSources": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "semantic_search_object": [
          "eventSources_semanticSearch"
        ],
        "eventSources_semanticSearch": [
          "null"
        ],
        "search_parameters_as_object": [
          "semantic_search_object"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to support phrase matching and excluding words from search queries\nUse the `advancedSyntaxFeatures` parameter to control which feature is supported.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "advancedSyntax"
      }
    },
    "displayName": "Advanced Syntax",
    "name": "advancedSyntax_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "advancedsyntax_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "optionalWords",
    "displayName": "Optional Words",
    "default": "",
    "options": [
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Null",
        "value": "null"
      },
      {
        "name": "Array",
        "value": "array"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "optionalWords",
        "value": "={{ typeof $parameter.optionalWords_string !== \"undefined\" ? $parameter.optionalWords_string : typeof $parameter.optionalWords_null !== \"undefined\" ? JSON.parse($parameter.optionalWords_null) : typeof $parameter.optionalWords_json !== \"undefined\" ? JSON.parse($parameter.optionalWords_json) : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "optionalwords"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Optional Words",
    "name": "optionalWords_string",
    "default": "",
    "displayOptions": {
      "show": {
        "optionalWords": [
          "string"
        ],
        "search_parameters_as_object": [
          "optionalwords"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "optionalWords",
    "name": "optionalWords_null",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "optionalWords": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "optionalWords": [
          "null"
        ],
        "search_parameters_as_object": [
          "optionalwords"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Optional Words",
    "name": "optionalWords_json",
    "default": "[]",
    "description": "List of [optional words](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/#creating-a-list-of-optional-words).",
    "required": false,
    "displayOptions": {
      "show": {
        "optionalWords": [
          "array"
        ],
        "search_parameters_as_object": [
          "optionalwords"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Disable Exact On Attributes",
    "name": "disableExactOnAttributes_json",
    "default": "[]",
    "description": "Searchable attributes for which you want to [turn off the Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes).\nAttribute names are case-sensitive\nThis can be useful for attributes with long values, where the likelihood of an exact match is high,\nsuch as product descriptions.\nTurning off the Exact ranking criterion for these attributes favors exact matching on other attributes.\nThis reduces the impact of individual attributes with a lot of content on ranking.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "disableExactOnAttributes"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "disableexactonattributes_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "default": "attribute",
    "description": "Determines how the [Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes) is computed when the search query has only one word.\n\n- `attribute`.\n  The Exact ranking criterion is 1 if the query word and attribute value are the same.\n  For example, a search for \"road\" will match the value \"road\", but not \"road trip\".\n\n- `none`.\n  The Exact ranking criterion is ignored on single-word searches.\n\n- `word`.\n  The Exact ranking criterion is 1 if the query word is found in the attribute value.\n  The query word must have at least 3 characters and must not be a stop word.\n  Only exact matches will be highlighted,\n  partial and prefix matches won't.\n",
    "required": false,
    "options": [
      {
        "name": "attribute",
        "value": "attribute"
      },
      {
        "name": "none",
        "value": "none"
      },
      {
        "name": "word",
        "value": "word"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "exactOnSingleWordQuery"
      }
    },
    "displayName": "Exact On Single Word Query",
    "name": "exactOnSingleWordQuery_options",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "exactonsinglewordquery_options"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Alternatives As Exact",
    "name": "alternativesAsExact_json",
    "default": "[]",
    "description": "Determine which plurals and synonyms should be considered an exact matches\nBy default, Algolia treats singular and plural forms of a word, and single-word synonyms, as [exact](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#exact) matches when searching.\nFor example\n- \"swimsuit\" and \"swimsuits\" are treated the same\n- \"swimsuit\" and \"swimwear\" are treated the same (if they are [synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#regular-synonyms))\n- `ignorePlurals`.\n  Plurals and similar declensions added by the `ignorePlurals` setting are considered exact matches\n- `singleWordSynonym`.\n  Single-word synonyms, such as \"NY\" = \"NYC\", are considered exact matches\n- `multiWordsSynonym`.\n  Multi-word synonyms, such as \"NY\" = \"New York\", are considered exact matches.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "alternativesAsExact"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "alternativesasexact_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Advanced Syntax Features",
    "name": "advancedSyntaxFeatures_json",
    "default": "[]",
    "description": "Advanced search syntax features you want to support\n- `exactPhrase`.\n  Phrases in quotes must match exactly.\n  For example, `sparkly blue \"iPhone case\"` only returns records with the exact string \"iPhone case\"\n- `excludeWords`.\n  Query words prefixed with a `-` must not occur in a record.\n  For example, `search -engine` matches records that contain \"search\" but not \"engine\"\nThis setting only has an effect if `advancedSyntax` is true.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "advancedSyntaxFeatures"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "advancedsyntaxfeatures_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "distinct",
    "displayName": "Distinct",
    "default": "",
    "options": [
      {
        "name": "Boolean",
        "value": "boolean"
      },
      {
        "name": "Integer",
        "value": "integer"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "distinct",
        "value": "={{ typeof $parameter.distinct_boolean !== \"undefined\" ? $parameter.distinct_boolean : typeof $parameter.distinct_number !== \"undefined\" ? $parameter.distinct_number : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "distinct"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether deduplication is turned on. If true, only one member of a group is shown in the search results.",
    "required": false,
    "displayName": "Distinct",
    "name": "distinct_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "distinct": [
          "boolean"
        ],
        "search_parameters_as_object": [
          "distinct"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Number of members of a group of records to include in the search results.\n\n- Don't use `distinct > 1` for records that might be [promoted by rules](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/promote-hits/).\n  The number of hits won't be correct and faceting won't work as expected.\n- With `distinct > 1`, the `hitsPerPage` parameter controls the number of returned groups.\n  For example, with `hitsPerPage: 10` and `distinct: 2`, up to 20 records are returned.\n  Likewise, the `nbHits` response attribute contains the number of returned groups.\n",
    "required": false,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 4
    },
    "displayName": "Distinct",
    "name": "distinct_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "distinct": [
          "integer"
        ],
        "search_parameters_as_object": [
          "distinct"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to replace a highlighted word with the matched synonym\nBy default, the original words are highlighted even if a synonym matches.\nFor example, with `home` as a synonym for `house` and a search for `home`,\nrecords matching either \"home\" or \"house\" are included in the search results,\nand either \"home\" or \"house\" are highlighted\nWith `replaceSynonymsInHighlight` set to `true`, a search for `home` still matches the same records,\nbut all occurrences of \"house\" are replaced by \"home\" in the highlighted response.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "replaceSynonymsInHighlight"
      }
    },
    "displayName": "Replace Synonyms In Highlight",
    "name": "replaceSynonymsInHighlight_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "replacesynonymsinhighlight_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 1,
    "description": "Minimum proximity score for two matching words\nThis adjusts the [Proximity ranking criterion](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#proximity)\nby equally scoring matches that are farther apart\nFor example, if `minProximity` is 2, neighboring matches and matches with one word between them would have the same score.\n",
    "required": false,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 7
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "minProximity"
      }
    },
    "displayName": "Min Proximity",
    "name": "minProximity_number",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "minproximity_number"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Response Fields",
    "name": "responseFields_json",
    "default": "[]",
    "description": "Properties to include in the API response of search and browse requests\nBy default, all response properties are included.\nTo reduce the response size, you can select which properties should be included\nAn empty list may lead to an empty API response (except properties you can't exclude)\nYou can't exclude these properties:\n`message`, `warning`, `cursor`, `abTestVariantID`,\nor any property added by setting `getRankingInfo` to true\nYour search depends on the `hits` field. If you omit this field, searches won't return any results.\nYour UI might also depend on other properties, for example, for pagination.\nBefore restricting the response size, check the impact on your search experience.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "responseFields"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "responsefields_json"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 100,
    "description": "Maximum number of facet values to return for each facet.",
    "required": false,
    "typeOptions": {
      "maxValue": 1000
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "maxValuesPerFacet"
      }
    },
    "displayName": "Max Values Per Facet",
    "name": "maxValuesPerFacet_number",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "maxvaluesperfacet_number"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "count",
    "description": "Order in which to retrieve facet values\n- `count`.\n  Facet values are retrieved by decreasing count.\n  The count is the number of matching records containing this facet value\n- `alpha`.\n  Retrieve facet values alphabetically\nThis setting doesn't influence how facet values are displayed in your UI (see `renderingContent`).\nFor more information, see [facet value display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/js/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "sortFacetValuesBy"
      }
    },
    "displayName": "Sort Facet Values By",
    "name": "sortFacetValuesBy_string",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "sortfacetvaluesby_string"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether the best matching attribute should be determined by minimum proximity\nThis setting only affects ranking if the Attribute ranking criterion comes before Proximity in the `ranking` setting.\nIf true, the best matching attribute is selected based on the minimum proximity of multiple matches.\nOtherwise, the best matching attribute is determined by the order in the `searchableAttributes` setting.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "attributeCriteriaComputedByMinProximity"
      }
    },
    "displayName": "Attribute Criteria Computed By Min Proximity",
    "name": "attributeCriteriaComputedByMinProximity_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "attributecriteriacomputedbyminproximity_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "displayName": "Rendering Content",
    "name": "rendering_content_object",
    "type": "multiOptions",
    "description": "Extra data that can be used in the search UI.\n\nYou can use this to control aspects of your search UI, such as the order of facet names and values\nwithout changing your frontend code.\n",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Facet Ordering",
        "value": "facet_ordering_object_renderingContent"
      },
      {
        "name": "Redirect",
        "value": "redirect_object_renderingContent"
      },
      {
        "name": "Widgets",
        "value": "widgets_object_renderingContent"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "renderingContent",
        "value": "={{ { \"facetOrdering\": { \"facets\": { \"order\": typeof $parameter.order_json_facets_facetOrdering_renderingContent !== \"undefined\" ? JSON.parse($parameter.order_json_facets_facetOrdering_renderingContent) : undefined }, \"values\": typeof $parameter.values_object_facetOrdering_renderingContent !== \"undefined\" ? JSON.parse($parameter.values_object_facetOrdering_renderingContent) : undefined }, \"redirect\": { \"url\": typeof $parameter.url_string_redirect_renderingContent !== \"undefined\" ? $parameter.url_string_redirect_renderingContent : undefined }, \"widgets\": { \"banners\": typeof $parameter.banners_fixedCollection_widgets_renderingContent !== \"undefined\" ? JSON.parse($parameter.banners_fixedCollection_widgets_renderingContent) : undefined } } }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "rendering_content_object"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "displayName": "Facet Ordering",
    "name": "facet_ordering_object_renderingContent",
    "type": "multiOptions",
    "description": "Order of facet names and facet values in your UI.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Facets",
        "value": "facets_object_facetOrdering"
      },
      {
        "name": "Values",
        "value": "values_object_facetOrdering"
      }
    ],
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "facet_ordering_object_renderingContent"
        ],
        "search_parameters_as_object": [
          "rendering_content_object"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "displayName": "Facets",
    "name": "facets_object_facetOrdering_renderingContent",
    "type": "multiOptions",
    "description": "Order of facet names.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Order",
        "value": "order_json_facets"
      }
    ],
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent": [
          "facets_object_facetOrdering"
        ],
        "search_parameters_as_object": [
          "rendering_content_object"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Order",
    "name": "order_json_facets_facetOrdering_renderingContent",
    "default": "[]",
    "description": "Explicit order of facets or facet values.\n\nThis setting lets you always show specific facets or facet values at the top of the list.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent": [
          "facets_object_facetOrdering"
        ],
        "facets_object_facetOrdering_renderingContent": [
          "order_json_facets"
        ],
        "search_parameters_as_object": [
          "rendering_content_object"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "displayName": "Values",
    "name": "values_object_facetOrdering_renderingContent",
    "type": "json",
    "description": "Order of facet values. One object for each facet.",
    "required": false,
    "default": "",
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent": [
          "values_object_facetOrdering"
        ],
        "search_parameters_as_object": [
          "rendering_content_object"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "displayName": "Redirect",
    "name": "redirect_object_renderingContent",
    "type": "multiOptions",
    "description": "The redirect rule container.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Url",
        "value": "url_string_redirect"
      }
    ],
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "redirect_object_renderingContent"
        ],
        "search_parameters_as_object": [
          "rendering_content_object"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Url",
    "name": "url_string_redirect_renderingContent",
    "default": "",
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "redirect_object_renderingContent"
        ],
        "redirect_object_renderingContent": [
          "url_string_redirect"
        ],
        "search_parameters_as_object": [
          "rendering_content_object"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "displayName": "Widgets",
    "name": "widgets_object_renderingContent",
    "type": "multiOptions",
    "description": "Widgets returned from any rules that are applied to the current search.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Banners",
        "value": "banners_fixedCollection_widgets"
      }
    ],
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "widgets_object_renderingContent"
        ],
        "search_parameters_as_object": [
          "rendering_content_object"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Banners",
    "name": "banners_fixedCollection_widgets_renderingContent",
    "default": "",
    "description": "Banners defined in the Merchandising Studio for a given search.",
    "required": false,
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "widgets_object_renderingContent"
        ],
        "widgets_object_renderingContent": [
          "banners_fixedCollection_widgets"
        ],
        "search_parameters_as_object": [
          "rendering_content_object"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking/)\nThis setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "enableReRanking"
      }
    },
    "displayName": "Enable Re Ranking",
    "name": "enableReRanking_boolean",
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "enablereranking_boolean"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "reRankingApplyFilter",
    "displayName": "Re Ranking Apply Filter",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "reRankingApplyFilter",
        "value": "={{ typeof $parameter.reRankingApplyFilter_json !== \"undefined\" ? JSON.parse($parameter.reRankingApplyFilter_json) : typeof $parameter.reRankingApplyFilter_string !== \"undefined\" ? $parameter.reRankingApplyFilter_string : typeof $parameter.reRankingApplyFilter_null !== \"undefined\" ? JSON.parse($parameter.reRankingApplyFilter_null) : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_parameters_as_object": [
          "rerankingapplyfilter"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Re Ranking Apply Filter",
    "name": "reRankingApplyFilter_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "reRankingApplyFilter": [
          "array"
        ],
        "search_parameters_as_object": [
          "rerankingapplyfilter"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Re Ranking Apply Filter",
    "name": "reRankingApplyFilter_string",
    "default": "",
    "displayOptions": {
      "show": {
        "reRankingApplyFilter": [
          "string"
        ],
        "search_parameters_as_object": [
          "rerankingapplyfilter"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "reRankingApplyFilter",
    "name": "reRankingApplyFilter_null",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "reRankingApplyFilter": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "reRankingApplyFilter": [
          "null"
        ],
        "search_parameters_as_object": [
          "rerankingapplyfilter"
        ],
        "selector": [
          "search_parameters_as_object"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchSingleIndex"
        ]
      }
    }
  },
  {
    "displayName": "Search Method Params",
    "name": "search_method_params_object",
    "type": "multiOptions",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Strategy",
        "value": "strategy_options"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Search"
        ],
        "operation": [
          "search"
        ]
      }
    }
  },
  {
    "type": "options",
    "description": "Strategy for multiple search queries:\n\n- `none`. Run all queries.\n- `stopIfEnoughMatches`. Run the queries one by one, stopping as soon as a query matches at least the `hitsPerPage` number of results.\n",
    "required": false,
    "options": [
      {
        "name": "none",
        "value": "none"
      },
      {
        "name": "stopIfEnoughMatches",
        "value": "stopIfEnoughMatches"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "strategy"
      }
    },
    "displayName": "Strategy",
    "name": "strategy_options",
    "default": "",
    "displayOptions": {
      "show": {
        "search_method_params_object": [
          "strategy_options"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "search"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Search"
        ],
        "operation": [
          "searchForFacetValues"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "string",
    "required": true,
    "displayName": "Facet Name",
    "name": "facetName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Search"
        ],
        "operation": [
          "searchForFacetValues"
        ]
      }
    }
  },
  {
    "displayName": "Search For Facet Values Request",
    "name": "search_for_facet_values_request_object",
    "type": "multiOptions",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Params",
        "value": "params_string"
      },
      {
        "name": "Facet Query",
        "value": "facetQuery_string"
      },
      {
        "name": "Max Facet Hits",
        "value": "maxFacetHits_number"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Search"
        ],
        "operation": [
          "searchForFacetValues"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "hitsPerPage=2&getRankingInfo=1",
    "description": "Search parameters as a URL-encoded query string.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "params"
      }
    },
    "displayName": "Params",
    "name": "params_string",
    "default": "",
    "displayOptions": {
      "show": {
        "search_for_facet_values_request_object": [
          "params_string"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchForFacetValues"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "george",
    "description": "Text to search inside the facet's values.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "facetQuery"
      }
    },
    "displayName": "Facet Query",
    "name": "facetQuery_string",
    "default": "",
    "displayOptions": {
      "show": {
        "search_for_facet_values_request_object": [
          "facetQuery_string"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchForFacetValues"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 10,
    "description": "Maximum number of facet values to return when [searching for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).",
    "required": false,
    "typeOptions": {
      "maxValue": 100
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "maxFacetHits"
      }
    },
    "displayName": "Max Facet Hits",
    "name": "maxFacetHits_number",
    "displayOptions": {
      "show": {
        "search_for_facet_values_request_object": [
          "maxFacetHits_number"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "searchForFacetValues"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "options",
    "name": "selector",
    "displayName": "Selector",
    "default": "",
    "options": [
      {
        "name": "Search parameters as query string",
        "value": "search_parameters_as_query_string"
      },
      {
        "name": "Option 2",
        "value": "option_2"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "hitsPerPage=2&getRankingInfo=1",
    "description": "Search parameters as a URL-encoded query string.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "params"
      }
    },
    "displayName": "Params",
    "name": "params_string",
    "default": "",
    "displayOptions": {
      "show": {
        "selector": [
          "search_parameters_as_query_string"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "multiOptions",
    "name": "multiple_properties",
    "displayName": "Multiple properties",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Query",
        "value": "query_string"
      },
      {
        "name": "Similar Query",
        "value": "similarquery_string"
      },
      {
        "name": "Filters",
        "value": "filters_string"
      },
      {
        "name": "Facet Filters",
        "value": "facetfilters"
      },
      {
        "name": "Optional Filters",
        "value": "optionalfilters"
      },
      {
        "name": "Numeric Filters",
        "value": "numericfilters"
      },
      {
        "name": "Tag Filters",
        "value": "tagfilters"
      },
      {
        "name": "Sum Or Filters Scores",
        "value": "sumorfiltersscores_boolean"
      },
      {
        "name": "Restrict Searchable Attributes",
        "value": "restrictsearchableattributes_json"
      },
      {
        "name": "Facets",
        "value": "facets_json"
      },
      {
        "name": "Faceting After Distinct",
        "value": "facetingafterdistinct_boolean"
      },
      {
        "name": "Page",
        "value": "page_number"
      },
      {
        "name": "Offset",
        "value": "offset_number"
      },
      {
        "name": "Length",
        "value": "length_number"
      },
      {
        "name": "Around Lat Lng",
        "value": "aroundlatlng_string"
      },
      {
        "name": "Around Lat Lng Via IP",
        "value": "aroundlatlngviaip_boolean"
      },
      {
        "name": "Around Radius",
        "value": "aroundradius"
      },
      {
        "name": "Around Precision",
        "value": "aroundprecision"
      },
      {
        "name": "Minimum Around Radius",
        "value": "minimumaroundradius_number"
      },
      {
        "name": "Inside Bounding Box",
        "value": "insideboundingbox"
      },
      {
        "name": "Inside Polygon",
        "value": "insidepolygon_json"
      },
      {
        "name": "Natural Languages",
        "value": "naturallanguages_json"
      },
      {
        "name": "Rule Contexts",
        "value": "rulecontexts_json"
      },
      {
        "name": "Personalization Impact",
        "value": "personalizationimpact_number"
      },
      {
        "name": "User Token",
        "value": "usertoken_string"
      },
      {
        "name": "Get Ranking Info",
        "value": "getrankinginfo_boolean"
      },
      {
        "name": "Synonyms",
        "value": "synonyms_boolean"
      },
      {
        "name": "Click Analytics",
        "value": "clickanalytics_boolean"
      },
      {
        "name": "Analytics",
        "value": "analytics_boolean"
      },
      {
        "name": "Analytics Tags",
        "value": "analyticstags_json"
      },
      {
        "name": "Percentile Computation",
        "value": "percentilecomputation_boolean"
      },
      {
        "name": "Enable ABTest",
        "value": "enableabtest_boolean"
      },
      {
        "name": "Attributes To Retrieve",
        "value": "attributestoretrieve_json"
      },
      {
        "name": "Ranking",
        "value": "ranking_json"
      },
      {
        "name": "Relevancy Strictness",
        "value": "relevancystrictness_number"
      },
      {
        "name": "Attributes To Highlight",
        "value": "attributestohighlight_json"
      },
      {
        "name": "Attributes To Snippet",
        "value": "attributestosnippet_json"
      },
      {
        "name": "Highlight Pre Tag",
        "value": "highlightpretag_string"
      },
      {
        "name": "Highlight Post Tag",
        "value": "highlightposttag_string"
      },
      {
        "name": "Snippet Ellipsis Text",
        "value": "snippetellipsistext_string"
      },
      {
        "name": "Restrict Highlight And Snippet Arrays",
        "value": "restricthighlightandsnippetarrays_boolean"
      },
      {
        "name": "Hits Per Page",
        "value": "hitsperpage_number"
      },
      {
        "name": "Min Word Sizefor1Typo",
        "value": "minwordsizefor1typo_number"
      },
      {
        "name": "Min Word Sizefor2Typos",
        "value": "minwordsizefor2typos_number"
      },
      {
        "name": "Typo Tolerance",
        "value": "typotolerance"
      },
      {
        "name": "Allow Typos On Numeric Tokens",
        "value": "allowtyposonnumerictokens_boolean"
      },
      {
        "name": "Disable Typo Tolerance On Attributes",
        "value": "disabletypotoleranceonattributes_json"
      },
      {
        "name": "Ignore Plurals",
        "value": "ignoreplurals"
      },
      {
        "name": "Remove Stop Words",
        "value": "removestopwords"
      },
      {
        "name": "Query Languages",
        "value": "querylanguages_json"
      },
      {
        "name": "Decompound Query",
        "value": "decompoundquery_boolean"
      },
      {
        "name": "Enable Rules",
        "value": "enablerules_boolean"
      },
      {
        "name": "Enable Personalization",
        "value": "enablepersonalization_boolean"
      },
      {
        "name": "Query Type",
        "value": "querytype_options"
      },
      {
        "name": "Remove Words If No Results",
        "value": "removewordsifnoresults_options"
      },
      {
        "name": "Mode",
        "value": "mode_options"
      },
      {
        "name": "Semantic search object",
        "value": "semantic_search_object"
      },
      {
        "name": "Advanced Syntax",
        "value": "advancedsyntax_boolean"
      },
      {
        "name": "Optional Words",
        "value": "optionalwords"
      },
      {
        "name": "Disable Exact On Attributes",
        "value": "disableexactonattributes_json"
      },
      {
        "name": "Exact On Single Word Query",
        "value": "exactonsinglewordquery_options"
      },
      {
        "name": "Alternatives As Exact",
        "value": "alternativesasexact_json"
      },
      {
        "name": "Advanced Syntax Features",
        "value": "advancedsyntaxfeatures_json"
      },
      {
        "name": "Distinct",
        "value": "distinct"
      },
      {
        "name": "Replace Synonyms In Highlight",
        "value": "replacesynonymsinhighlight_boolean"
      },
      {
        "name": "Min Proximity",
        "value": "minproximity_number"
      },
      {
        "name": "Response Fields",
        "value": "responsefields_json"
      },
      {
        "name": "Max Values Per Facet",
        "value": "maxvaluesperfacet_number"
      },
      {
        "name": "Sort Facet Values By",
        "value": "sortfacetvaluesby_string"
      },
      {
        "name": "Attribute Criteria Computed By Min Proximity",
        "value": "attributecriteriacomputedbyminproximity_boolean"
      },
      {
        "name": "Rendering content object",
        "value": "rendering_content_object"
      },
      {
        "name": "Enable Re Ranking",
        "value": "enablereranking_boolean"
      },
      {
        "name": "Re Ranking Apply Filter",
        "value": "rerankingapplyfilter"
      },
      {
        "name": "Cursor",
        "value": "cursor_string"
      }
    ],
    "displayOptions": {
      "show": {
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "description": "Search query.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "query"
      }
    },
    "displayName": "Query",
    "name": "query_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "query_string"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "comedy drama crime Macy Buscemi",
    "description": "Keywords to be used instead of the search query to conduct a more broader search\nUsing the `similarQuery` parameter changes other settings\n- `queryType` is set to `prefixNone`.\n- `removeStopWords` is set to true.\n- `words` is set as the first ranking criterion.\n- All remaining words are treated as `optionalWords`\nSince the `similarQuery` is supposed to do a broad search, they usually return many results.\nCombine it with `filters` to narrow down the list of results.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "similarQuery"
      }
    },
    "displayName": "Similar Query",
    "name": "similarQuery_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "similarquery_string"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "(category:Book OR category:Ebook) AND _tags:published",
    "description": "Filter expression to only include items that match the filter criteria in the response.\n\nYou can use these filter expressions:\n\n- **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`.\n- **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive).\n- **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value.\n- **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive).\n- **Boolean filters.** `<facet>: true | false`.\n\nYou can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:\n\n- You can only combine filters of the same type with `OR`.\n  **Not supported:** `facet:value OR num > 3`.\n- You can't use `NOT` with combinations of filters.\n  **Not supported:** `NOT(facet:value OR facet:value)`\n- You can't combine conjunctions (`AND`) with `OR`.\n  **Not supported:** `facet:value OR (facet:value AND facet:value)`\n\nUse quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes.\nIf a facet attribute is an array, the filter matches if it matches at least one element of the array.\n\nFor more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "filters"
      }
    },
    "displayName": "Filters",
    "name": "filters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "filters_string"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "facetFilters",
    "displayName": "Facet Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "facetFilters",
        "value": "={{ typeof $parameter.facetFilters_json !== \"undefined\" ? JSON.parse($parameter.facetFilters_json) : typeof $parameter.facetFilters_string !== \"undefined\" ? $parameter.facetFilters_string : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "facetfilters"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Facet Filters",
    "name": "facetFilters_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "facetFilters": [
          "array"
        ],
        "multiple_properties": [
          "facetfilters"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Facet Filters",
    "name": "facetFilters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "facetFilters": [
          "string"
        ],
        "multiple_properties": [
          "facetfilters"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "optionalFilters",
    "displayName": "Optional Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "optionalFilters",
        "value": "={{ typeof $parameter.optionalFilters_json !== \"undefined\" ? JSON.parse($parameter.optionalFilters_json) : typeof $parameter.optionalFilters_string !== \"undefined\" ? $parameter.optionalFilters_string : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "optionalfilters"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Optional Filters",
    "name": "optionalFilters_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "optionalFilters": [
          "array"
        ],
        "multiple_properties": [
          "optionalfilters"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Optional Filters",
    "name": "optionalFilters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "optionalFilters": [
          "string"
        ],
        "multiple_properties": [
          "optionalfilters"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "numericFilters",
    "displayName": "Numeric Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "numericFilters",
        "value": "={{ typeof $parameter.numericFilters_json !== \"undefined\" ? JSON.parse($parameter.numericFilters_json) : typeof $parameter.numericFilters_string !== \"undefined\" ? $parameter.numericFilters_string : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "numericfilters"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Numeric Filters",
    "name": "numericFilters_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "numericFilters": [
          "array"
        ],
        "multiple_properties": [
          "numericfilters"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Numeric Filters",
    "name": "numericFilters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "numericFilters": [
          "string"
        ],
        "multiple_properties": [
          "numericfilters"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "tagFilters",
    "displayName": "Tag Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "tagFilters",
        "value": "={{ typeof $parameter.tagFilters_json !== \"undefined\" ? JSON.parse($parameter.tagFilters_json) : typeof $parameter.tagFilters_string !== \"undefined\" ? $parameter.tagFilters_string : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "tagfilters"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Tag Filters",
    "name": "tagFilters_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "tagFilters": [
          "array"
        ],
        "multiple_properties": [
          "tagfilters"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Tag Filters",
    "name": "tagFilters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "tagFilters": [
          "string"
        ],
        "multiple_properties": [
          "tagfilters"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to sum all filter scores\nIf true, all filter scores are summed.\nOtherwise, the maximum filter score is kept.\nFor more information, see [filter scores](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/in-depth/filter-scoring/#accumulating-scores-with-sumorfiltersscores).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "sumOrFiltersScores"
      }
    },
    "displayName": "Sum Or Filters Scores",
    "name": "sumOrFiltersScores_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "sumorfiltersscores_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Restrict Searchable Attributes",
    "name": "restrictSearchableAttributes_json",
    "default": "[]",
    "description": "Restricts a search to a subset of your searchable attributes.\nAttribute names are case-sensitive.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "restrictSearchableAttributes"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "restrictsearchableattributes_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Facets",
    "name": "facets_json",
    "default": "[]",
    "description": "Facets for which to retrieve facet values that match the search criteria and the number of matching facet values\nTo retrieve all facets, use the wildcard character `*`.\nFor more information, see [facets](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#contextual-facet-values-and-counts).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "facets"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "facets_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether faceting should be applied after deduplication with `distinct`\nThis leads to accurate facet counts when using faceting in combination with `distinct`.\nIt's usually better to use `afterDistinct` modifiers in the `attributesForFaceting` setting,\nas `facetingAfterDistinct` only computes correct facet counts if all records have the same facet values for the `attributeForDistinct`.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "facetingAfterDistinct"
      }
    },
    "displayName": "Faceting After Distinct",
    "name": "facetingAfterDistinct_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "facetingafterdistinct_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Page of search results to retrieve.",
    "required": false,
    "typeOptions": {
      "minValue": 0
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "page"
      }
    },
    "displayName": "Page",
    "name": "page_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "page_number"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Position of the first hit to retrieve.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "offset"
      }
    },
    "displayName": "Offset",
    "name": "offset_number",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "offset_number"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Number of hits to retrieve (used in combination with `offset`).",
    "required": false,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 1000
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "length"
      }
    },
    "displayName": "Length",
    "name": "length_number",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "length_number"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "40.71,-74.01",
    "description": "Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.\n\nOnly records included within a circle around this central location are included in the results.\nThe radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings.\nThis parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "aroundLatLng"
      }
    },
    "displayName": "Around Lat Lng",
    "name": "aroundLatLng_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "aroundlatlng_string"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to obtain the coordinates from the request's IP address.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "aroundLatLngViaIP"
      }
    },
    "displayName": "Around Lat Lng Via IP",
    "name": "aroundLatLngViaIP_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "aroundlatlngviaip_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "aroundRadius",
    "displayName": "Around Radius",
    "default": "",
    "options": [
      {
        "name": "Integer",
        "value": "integer"
      },
      {
        "name": "All",
        "value": "all"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "aroundRadius",
        "value": "={{ typeof $parameter.aroundRadius_number !== \"undefined\" ? $parameter.aroundRadius_number : typeof $parameter.aroundRadius_options !== \"undefined\" ? $parameter.aroundRadius_options : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "aroundradius"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Maximum search radius around a central location in meters.",
    "required": false,
    "typeOptions": {
      "minValue": 1
    },
    "displayName": "Around Radius",
    "name": "aroundRadius_number",
    "default": "",
    "displayOptions": {
      "show": {
        "aroundRadius": [
          "integer"
        ],
        "multiple_properties": [
          "aroundradius"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "description": "Return all records with a valid `_geoloc` attribute. Don't filter by distance.",
    "required": false,
    "options": [
      {
        "name": "all",
        "value": "all"
      }
    ],
    "displayName": "Around Radius",
    "name": "aroundRadius_options",
    "default": "",
    "displayOptions": {
      "show": {
        "aroundRadius": [
          "all"
        ],
        "multiple_properties": [
          "aroundradius"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "aroundPrecision",
    "displayName": "Around Precision",
    "default": "",
    "options": [
      {
        "name": "Integer",
        "value": "integer"
      },
      {
        "name": "Range objects",
        "value": "range_objects"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "aroundPrecision",
        "value": "={{ typeof $parameter.aroundPrecision_number !== \"undefined\" ? $parameter.aroundPrecision_number : typeof $parameter.aroundPrecision_fixedCollection.aroundPrecision_fixedCollection_values !== \"undefined\" ? $parameter.aroundPrecision_fixedCollection.aroundPrecision_fixedCollection_values?.map(item => ({ from: typeof item.from_number_aroundPrecision !== \"undefined\" ? item.from_number_aroundPrecision : undefined, value: typeof item.value_number_aroundPrecision !== \"undefined\" ? item.value_number_aroundPrecision : undefined })) : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "aroundprecision"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 10,
    "description": "Distance in meters to group results by similar distances.\n\nFor example, if you set `aroundPrecision` to 100, records wihin 100 meters to the central coordinate are considered to have the same distance,\nas are records between 100 and 199 meters.\n",
    "required": false,
    "displayName": "Around Precision",
    "name": "aroundPrecision_number",
    "displayOptions": {
      "show": {
        "aroundPrecision": [
          "integer"
        ],
        "multiple_properties": [
          "aroundprecision"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "fixedCollection",
    "displayName": "Around Precision",
    "name": "aroundPrecision_fixedCollection",
    "default": "",
    "required": false,
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "aroundPrecision_fixedCollection_values",
        "displayName": "Around Precision",
        "values": [
          {
            "type": "number",
            "placeholder": "20",
            "description": "Lower boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.",
            "required": false,
            "displayName": "From",
            "name": "from_number_aroundPrecision",
            "default": ""
          },
          {
            "type": "number",
            "description": "Upper boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.",
            "required": false,
            "displayName": "Value",
            "name": "value_number_aroundPrecision",
            "default": ""
          }
        ]
      }
    ],
    "displayOptions": {
      "show": {
        "aroundPrecision": [
          "range_objects"
        ],
        "multiple_properties": [
          "aroundprecision"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Minimum radius (in meters) for a search around a location when `aroundRadius` isn't set.",
    "required": false,
    "typeOptions": {
      "minValue": 1
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "minimumAroundRadius"
      }
    },
    "displayName": "Minimum Around Radius",
    "name": "minimumAroundRadius_number",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "minimumaroundradius_number"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "insideBoundingBox",
    "displayName": "Inside Bounding Box",
    "default": "",
    "options": [
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Null",
        "value": "null"
      },
      {
        "name": "Array",
        "value": "array"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "insideBoundingBox",
        "value": "={{ typeof $parameter.insideBoundingBox_string !== \"undefined\" ? $parameter.insideBoundingBox_string : typeof $parameter.insideBoundingBox_null !== \"undefined\" ? JSON.parse($parameter.insideBoundingBox_null) : typeof $parameter.insideBoundingBox_json !== \"undefined\" ? JSON.parse($parameter.insideBoundingBox_json) : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "insideboundingbox"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Inside Bounding Box",
    "name": "insideBoundingBox_string",
    "default": "",
    "displayOptions": {
      "show": {
        "insideBoundingBox": [
          "string"
        ],
        "multiple_properties": [
          "insideboundingbox"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "insideBoundingBox",
    "name": "insideBoundingBox_null",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "insideBoundingBox": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "insideBoundingBox": [
          "null"
        ],
        "multiple_properties": [
          "insideboundingbox"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Inside Bounding Box",
    "name": "insideBoundingBox_json",
    "default": "[]",
    "description": "Coordinates for a rectangular area in which to search.\n\nEach bounding box is defined by the two opposite points of its diagonal, and expressed as latitude and longitude pair:\n`[p1 lat, p1 long, p2 lat, p2 long]`.\nProvide multiple bounding boxes as nested arrays.\nFor more information, see [rectangular area](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\n",
    "required": false,
    "displayOptions": {
      "show": {
        "insideBoundingBox": [
          "array"
        ],
        "multiple_properties": [
          "insideboundingbox"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Inside Polygon",
    "name": "insidePolygon_json",
    "default": "[]",
    "description": "Coordinates of a polygon in which to search.\n\nPolygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude.\nProvide multiple polygons as nested arrays.\nFor more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\nThis parameter is ignored if you also specify `insideBoundingBox`.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "insidePolygon"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "insidepolygon_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Natural Languages",
    "name": "naturalLanguages_json",
    "default": "[]",
    "description": "ISO language codes that adjust settings that are useful for processing natural language queries (as opposed to keyword searches)\n- Sets `removeStopWords` and `ignorePlurals` to the list of provided languages.\n- Sets `removeWordsIfNoResults` to `allOptional`.\n- Adds a `natural_language` attribute to `ruleContexts` and `analyticsTags`.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "naturalLanguages"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "naturallanguages_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Rule Contexts",
    "name": "ruleContexts_json",
    "default": "[]",
    "description": "Assigns a rule context to the search query\n[Rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/how-to/customize-search-results-by-platform/#whats-a-context) are strings that you can use to trigger matching rules.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "ruleContexts"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "rulecontexts_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 100,
    "description": "Impact that Personalization should have on this search\nThe higher this value is, the more Personalization determines the ranking compared to other factors.\nFor more information, see [Understanding Personalization impact](https://www.algolia.com/doc/guides/personalization/personalizing-results/in-depth/configuring-personalization/#understanding-personalization-impact).\n",
    "required": false,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 100
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "personalizationImpact"
      }
    },
    "displayName": "Personalization Impact",
    "name": "personalizationImpact_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "personalizationimpact_number"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "test-user-123",
    "description": "Unique pseudonymous or anonymous user identifier.\n\nThis helps with analytics and click and conversion events.\nFor more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "userToken"
      }
    },
    "displayName": "User Token",
    "name": "userToken_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "usertoken_string"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether the search response should include detailed ranking information.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "getRankingInfo"
      }
    },
    "displayName": "Get Ranking Info",
    "name": "getRankingInfo_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "getrankinginfo_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to take into account an index's synonyms for this search.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "synonyms"
      }
    },
    "displayName": "Synonyms",
    "name": "synonyms_boolean",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "synonyms_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to include a `queryID` attribute in the response\nThe query ID is a unique identifier for a search query and is required for tracking [click and conversion events](https://www.algolia.com/guides/sending-events/getting-started/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "clickAnalytics"
      }
    },
    "displayName": "Click Analytics",
    "name": "clickAnalytics_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "clickanalytics_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether this search will be included in Analytics.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "analytics"
      }
    },
    "displayName": "Analytics",
    "name": "analytics_boolean",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "analytics_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Analytics Tags",
    "name": "analyticsTags_json",
    "default": "[]",
    "description": "Tags to apply to the query for [segmenting analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "analyticsTags"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "analyticstags_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to include this search when calculating processing-time percentiles.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "percentileComputation"
      }
    },
    "displayName": "Percentile Computation",
    "name": "percentileComputation_boolean",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "percentilecomputation_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to enable A/B testing for this search.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "enableABTest"
      }
    },
    "displayName": "Enable ABTest",
    "name": "enableABTest_boolean",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "enableabtest_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Retrieve",
    "name": "attributesToRetrieve_json",
    "default": "[]",
    "description": "Attributes to include in the API response\nTo reduce the size of your response, you can retrieve only some of the attributes.\nAttribute names are case-sensitive\n- `*` retrieves all attributes, except attributes included in the `customRanking` and `unretrievableAttributes` settings.\n- To retrieve all attributes except a specific one, prefix the attribute with a dash and combine it with the `*`: `[\"*\", \"-ATTRIBUTE\"]`.\n- The `objectID` attribute is always included.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "attributesToRetrieve"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "attributestoretrieve_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Ranking",
    "name": "ranking_json",
    "default": "[]",
    "description": "Determines the order in which Algolia returns your results.\n\nBy default, each entry corresponds to a [ranking criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/).\nThe tie-breaking algorithm sequentially applies each criterion in the order they're specified.\nIf you configure a replica index for [sorting by an attribute](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute/),\nyou put the sorting attribute at the top of the list.\n\n**Modifiers**\n\n- `asc(\"ATTRIBUTE\")`.\n  Sort the index by the values of an attribute, in ascending order.\n- `desc(\"ATTRIBUTE\")`.\n  Sort the index by the values of an attribute, in descending order.\n\nBefore you modify the default setting,\nyou should test your changes in the dashboard,\nand by [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "ranking"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "ranking_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "placeholder": "90",
    "default": 100,
    "description": "Relevancy threshold below which less relevant results aren't included in the results\nYou can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas).\nUse this setting to strike a balance between the relevance and number of returned results.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "relevancyStrictness"
      }
    },
    "displayName": "Relevancy Strictness",
    "name": "relevancyStrictness_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "relevancystrictness_number"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Highlight",
    "name": "attributesToHighlight_json",
    "default": "[]",
    "description": "Attributes to highlight\nBy default, all searchable attributes are highlighted.\nUse `*` to highlight all attributes or use an empty array `[]` to turn off highlighting.\nAttribute names are case-sensitive\nWith highlighting, strings that match the search query are surrounded by HTML tags defined by `highlightPreTag` and `highlightPostTag`.\nYou can use this to visually highlight matching parts of a search query in your UI\nFor more information, see [Highlighting and snippeting](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "attributesToHighlight"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "attributestohighlight_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Snippet",
    "name": "attributesToSnippet_json",
    "default": "[]",
    "description": "Attributes for which to enable snippets.\nAttribute names are case-sensitive\nSnippets provide additional context to matched words.\nIf you enable snippets, they include 10 words, including the matched word.\nThe matched word will also be wrapped by HTML tags for highlighting.\nYou can adjust the number of words with the following notation: `ATTRIBUTE:NUMBER`,\nwhere `NUMBER` is the number of words to be extracted.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "attributesToSnippet"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "attributestosnippet_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "<em>",
    "description": "HTML tag to insert before the highlighted parts in all highlighted results and snippets.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "highlightPreTag"
      }
    },
    "displayName": "Highlight Pre Tag",
    "name": "highlightPreTag_string",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "highlightpretag_string"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "</em>",
    "description": "HTML tag to insert after the highlighted parts in all highlighted results and snippets.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "highlightPostTag"
      }
    },
    "displayName": "Highlight Post Tag",
    "name": "highlightPostTag_string",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "highlightposttag_string"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "…",
    "description": "String used as an ellipsis indicator when a snippet is truncated.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "snippetEllipsisText"
      }
    },
    "displayName": "Snippet Ellipsis Text",
    "name": "snippetEllipsisText_string",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "snippetellipsistext_string"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to restrict highlighting and snippeting to items that at least partially matched the search query.\nBy default, all items are highlighted and snippeted.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "restrictHighlightAndSnippetArrays"
      }
    },
    "displayName": "Restrict Highlight And Snippet Arrays",
    "name": "restrictHighlightAndSnippetArrays_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "restricthighlightandsnippetarrays_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 20,
    "description": "Number of hits per page.",
    "required": false,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 1000
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "hitsPerPage"
      }
    },
    "displayName": "Hits Per Page",
    "name": "hitsPerPage_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "hitsperpage_number"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 4,
    "description": "Minimum number of characters a word in the search query must contain to accept matches with [one typo](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "minWordSizefor1Typo"
      }
    },
    "displayName": "Min Word Sizefor1Typo",
    "name": "minWordSizefor1Typo_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "minwordsizefor1typo_number"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 8,
    "description": "Minimum number of characters a word in the search query must contain to accept matches with [two typos](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "minWordSizefor2Typos"
      }
    },
    "displayName": "Min Word Sizefor2Typos",
    "name": "minWordSizefor2Typos_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "minwordsizefor2typos_number"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "typoTolerance",
    "displayName": "Typo Tolerance",
    "default": "",
    "options": [
      {
        "name": "Boolean",
        "value": "boolean"
      },
      {
        "name": "Typo tolerance",
        "value": "typo_tolerance"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "typoTolerance",
        "value": "={{ typeof $parameter.typoTolerance_boolean !== \"undefined\" ? $parameter.typoTolerance_boolean : typeof $parameter.typoTolerance_options !== \"undefined\" ? $parameter.typoTolerance_options : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "typotolerance"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether typo tolerance is active. If true, matches with typos are included in the search results and rank after exact matches.",
    "required": false,
    "displayName": "Typo Tolerance",
    "name": "typoTolerance_boolean",
    "displayOptions": {
      "show": {
        "typoTolerance": [
          "boolean"
        ],
        "multiple_properties": [
          "typotolerance"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "description": "- `min`. Return matches with the lowest number of typos.\n  For example, if you have matches without typos, only include those.\n  But if there are no matches without typos (with 1 typo), include matches with 1 typo (2 typos).\n- `strict`. Return matches with the two lowest numbers of typos.\n  With `strict`, the Typo ranking criterion is applied first in the `ranking` setting.\n",
    "required": false,
    "options": [
      {
        "name": "min",
        "value": "min"
      },
      {
        "name": "strict",
        "value": "strict"
      },
      {
        "name": "true",
        "value": "true"
      },
      {
        "name": "false",
        "value": "false"
      }
    ],
    "displayName": "Typo Tolerance",
    "name": "typoTolerance_options",
    "default": "",
    "displayOptions": {
      "show": {
        "typoTolerance": [
          "typo_tolerance"
        ],
        "multiple_properties": [
          "typotolerance"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to allow typos on numbers in the search query\nTurn off this setting to reduce the number of irrelevant matches\nwhen searching in large sets of similar numbers.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "allowTyposOnNumericTokens"
      }
    },
    "displayName": "Allow Typos On Numeric Tokens",
    "name": "allowTyposOnNumericTokens_boolean",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "allowtyposonnumerictokens_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Disable Typo Tolerance On Attributes",
    "name": "disableTypoToleranceOnAttributes_json",
    "default": "[]",
    "description": "Attributes for which you want to turn off [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/).\nAttribute names are case-sensitive\nReturning only exact matches can help when\n- [Searching in hyphenated attributes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes/).\n- Reducing the number of matches when you have too many.\n  This can happen with attributes that are long blocks of text, such as product descriptions\nConsider alternatives such as `disableTypoToleranceOnWords` or adding synonyms if your attributes have intentional unusual spellings that might look like typos.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "disableTypoToleranceOnAttributes"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "disabletypotoleranceonattributes_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "ignorePlurals",
    "displayName": "Ignore Plurals",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Boolean",
        "value": "boolean"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "ignorePlurals",
        "value": "={{ typeof $parameter.ignorePlurals_json !== \"undefined\" ? JSON.parse($parameter.ignorePlurals_json) : typeof $parameter.ignorePlurals_options !== \"undefined\" ? $parameter.ignorePlurals_options : typeof $parameter.ignorePlurals_boolean !== \"undefined\" ? $parameter.ignorePlurals_boolean : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "ignoreplurals"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Ignore Plurals",
    "name": "ignorePlurals_json",
    "default": "[]",
    "description": "ISO code for languages for which this feature should be active.\nThis overrides languages you set with `queryLanguages`.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "ignorePlurals": [
          "array"
        ],
        "multiple_properties": [
          "ignoreplurals"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "required": false,
    "options": [
      {
        "name": "true",
        "value": "true"
      },
      {
        "name": "false",
        "value": "false"
      }
    ],
    "displayName": "Ignore Plurals",
    "name": "ignorePlurals_options",
    "default": "",
    "displayOptions": {
      "show": {
        "ignorePlurals": [
          "string"
        ],
        "multiple_properties": [
          "ignoreplurals"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "If true, `ignorePlurals` is active for all languages included in `queryLanguages`, or for all supported languages, if `queryLanguges` is empty.\nIf false, singulars, plurals, and other declensions won't be considered equivalent.\n",
    "required": false,
    "displayName": "Ignore Plurals",
    "name": "ignorePlurals_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "ignorePlurals": [
          "boolean"
        ],
        "multiple_properties": [
          "ignoreplurals"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "removeStopWords",
    "displayName": "Remove Stop Words",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "Boolean",
        "value": "boolean"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "removeStopWords",
        "value": "={{ typeof $parameter.removeStopWords_json !== \"undefined\" ? JSON.parse($parameter.removeStopWords_json) : typeof $parameter.removeStopWords_boolean !== \"undefined\" ? $parameter.removeStopWords_boolean : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "removestopwords"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Remove Stop Words",
    "name": "removeStopWords_json",
    "default": "[]",
    "description": "ISO code for languages for which stop words should be removed. This overrides languages you set in `queryLanguges`.",
    "required": false,
    "displayOptions": {
      "show": {
        "removeStopWords": [
          "array"
        ],
        "multiple_properties": [
          "removestopwords"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "If true, stop words are removed for all languages you included in `queryLanguages`, or for all supported languages, if `queryLanguages` is empty.\nIf false, stop words are not removed.\n",
    "required": false,
    "displayName": "Remove Stop Words",
    "name": "removeStopWords_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "removeStopWords": [
          "boolean"
        ],
        "multiple_properties": [
          "removestopwords"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Query Languages",
    "name": "queryLanguages_json",
    "default": "[]",
    "description": "Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries \nThis setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings.\nThis setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages.\nTo support this, you must place the CJK language **first** \n**You should always specify a query language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages/),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "queryLanguages"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "querylanguages_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to split compound words in the query into their building blocks\nFor more information, see [Word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#splitting-compound-words).\nWord segmentation is supported for these languages: German, Dutch, Finnish, Swedish, and Norwegian.\nDecompounding doesn't work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark).\nFor example, `Gartenstühle` won't be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "decompoundQuery"
      }
    },
    "displayName": "Decompound Query",
    "name": "decompoundQuery_boolean",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "decompoundquery_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to enable rules.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "enableRules"
      }
    },
    "displayName": "Enable Rules",
    "name": "enableRules_boolean",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "enablerules_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to enable Personalization.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "enablePersonalization"
      }
    },
    "displayName": "Enable Personalization",
    "name": "enablePersonalization_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "enablepersonalization_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "default": "prefixLast",
    "description": "Determines if and how query words are interpreted as prefixes.\n\nBy default, only the last query word is treated as a prefix (`prefixLast`).\nTo turn off prefix search, use `prefixNone`.\nAvoid `prefixAll`, which treats all query words as prefixes.\nThis might lead to counterintuitive results and makes your search slower.\n\nFor more information, see [Prefix searching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/prefix-searching/).\n",
    "required": false,
    "options": [
      {
        "name": "prefixLast",
        "value": "prefixLast"
      },
      {
        "name": "prefixAll",
        "value": "prefixAll"
      },
      {
        "name": "prefixNone",
        "value": "prefixNone"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "queryType"
      }
    },
    "displayName": "Query Type",
    "name": "queryType_options",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "querytype_options"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "firstWords",
    "default": "none",
    "description": "Strategy for removing words from the query when it doesn't return any results.\nThis helps to avoid returning empty search results.\n\n- `none`.\n  No words are removed when a query doesn't return results.\n\n- `lastWords`.\n  Treat the last (then second to last, then third to last) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `firstWords`.\n  Treat the first (then second, then third) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `allOptional`.\n  Treat all words as optional.\n\nFor more information, see [Remove words to improve results](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/in-depth/why-use-remove-words-if-no-results/).\n",
    "required": false,
    "options": [
      {
        "name": "none",
        "value": "none"
      },
      {
        "name": "lastWords",
        "value": "lastWords"
      },
      {
        "name": "firstWords",
        "value": "firstWords"
      },
      {
        "name": "allOptional",
        "value": "allOptional"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "removeWordsIfNoResults"
      }
    },
    "displayName": "Remove Words If No Results",
    "name": "removeWordsIfNoResults_options",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "removewordsifnoresults_options"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "default": "keywordSearch",
    "description": "Search mode the index will use to query for results.\n\nThis setting only applies to indices, for which Algolia enabled NeuralSearch for you.\n",
    "required": false,
    "options": [
      {
        "name": "neuralSearch",
        "value": "neuralSearch"
      },
      {
        "name": "keywordSearch",
        "value": "keywordSearch"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "mode"
      }
    },
    "displayName": "Mode",
    "name": "mode_options",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "mode_options"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "displayName": "Semantic Search",
    "name": "semantic_search_object",
    "type": "multiOptions",
    "description": "Settings for the semantic search part of NeuralSearch.\nOnly used when `mode` is `neuralSearch`.\n",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Event Sources",
        "value": "eventSources_semanticSearch"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "semanticSearch",
        "value": "={{ { \"eventSources\": typeof $parameter.eventSources_json_semanticSearch !== \"undefined\" ? JSON.parse($parameter.eventSources_json_semanticSearch) : typeof $parameter.eventSources_null_semanticSearch !== \"undefined\" ? JSON.parse($parameter.eventSources_null_semanticSearch) : undefined } }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "semantic_search_object"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "eventSources_semanticSearch",
    "displayName": "Event Sources",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "displayOptions": {
      "show": {
        "semantic_search_object": [
          "eventSources_semanticSearch"
        ],
        "multiple_properties": [
          "semantic_search_object"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Event Sources",
    "name": "eventSources_json_semanticSearch",
    "default": "[]",
    "description": "Indices from which to collect click and conversion events.\n\nIf null, the current index and all its replicas are used.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "semantic_search_object": [
          "eventSources_semanticSearch"
        ],
        "eventSources_semanticSearch": [
          "array"
        ],
        "multiple_properties": [
          "semantic_search_object"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "eventSources",
    "name": "eventSources_null_semanticSearch",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "eventSources": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "semantic_search_object": [
          "eventSources_semanticSearch"
        ],
        "eventSources_semanticSearch": [
          "null"
        ],
        "multiple_properties": [
          "semantic_search_object"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to support phrase matching and excluding words from search queries\nUse the `advancedSyntaxFeatures` parameter to control which feature is supported.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "advancedSyntax"
      }
    },
    "displayName": "Advanced Syntax",
    "name": "advancedSyntax_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "advancedsyntax_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "optionalWords",
    "displayName": "Optional Words",
    "default": "",
    "options": [
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Null",
        "value": "null"
      },
      {
        "name": "Array",
        "value": "array"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "optionalWords",
        "value": "={{ typeof $parameter.optionalWords_string !== \"undefined\" ? $parameter.optionalWords_string : typeof $parameter.optionalWords_null !== \"undefined\" ? JSON.parse($parameter.optionalWords_null) : typeof $parameter.optionalWords_json !== \"undefined\" ? JSON.parse($parameter.optionalWords_json) : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "optionalwords"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Optional Words",
    "name": "optionalWords_string",
    "default": "",
    "displayOptions": {
      "show": {
        "optionalWords": [
          "string"
        ],
        "multiple_properties": [
          "optionalwords"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "optionalWords",
    "name": "optionalWords_null",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "optionalWords": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "optionalWords": [
          "null"
        ],
        "multiple_properties": [
          "optionalwords"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Optional Words",
    "name": "optionalWords_json",
    "default": "[]",
    "description": "List of [optional words](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/#creating-a-list-of-optional-words).",
    "required": false,
    "displayOptions": {
      "show": {
        "optionalWords": [
          "array"
        ],
        "multiple_properties": [
          "optionalwords"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Disable Exact On Attributes",
    "name": "disableExactOnAttributes_json",
    "default": "[]",
    "description": "Searchable attributes for which you want to [turn off the Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes).\nAttribute names are case-sensitive\nThis can be useful for attributes with long values, where the likelihood of an exact match is high,\nsuch as product descriptions.\nTurning off the Exact ranking criterion for these attributes favors exact matching on other attributes.\nThis reduces the impact of individual attributes with a lot of content on ranking.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "disableExactOnAttributes"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "disableexactonattributes_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "default": "attribute",
    "description": "Determines how the [Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes) is computed when the search query has only one word.\n\n- `attribute`.\n  The Exact ranking criterion is 1 if the query word and attribute value are the same.\n  For example, a search for \"road\" will match the value \"road\", but not \"road trip\".\n\n- `none`.\n  The Exact ranking criterion is ignored on single-word searches.\n\n- `word`.\n  The Exact ranking criterion is 1 if the query word is found in the attribute value.\n  The query word must have at least 3 characters and must not be a stop word.\n  Only exact matches will be highlighted,\n  partial and prefix matches won't.\n",
    "required": false,
    "options": [
      {
        "name": "attribute",
        "value": "attribute"
      },
      {
        "name": "none",
        "value": "none"
      },
      {
        "name": "word",
        "value": "word"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "exactOnSingleWordQuery"
      }
    },
    "displayName": "Exact On Single Word Query",
    "name": "exactOnSingleWordQuery_options",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "exactonsinglewordquery_options"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Alternatives As Exact",
    "name": "alternativesAsExact_json",
    "default": "[]",
    "description": "Determine which plurals and synonyms should be considered an exact matches\nBy default, Algolia treats singular and plural forms of a word, and single-word synonyms, as [exact](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#exact) matches when searching.\nFor example\n- \"swimsuit\" and \"swimsuits\" are treated the same\n- \"swimsuit\" and \"swimwear\" are treated the same (if they are [synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#regular-synonyms))\n- `ignorePlurals`.\n  Plurals and similar declensions added by the `ignorePlurals` setting are considered exact matches\n- `singleWordSynonym`.\n  Single-word synonyms, such as \"NY\" = \"NYC\", are considered exact matches\n- `multiWordsSynonym`.\n  Multi-word synonyms, such as \"NY\" = \"New York\", are considered exact matches.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "alternativesAsExact"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "alternativesasexact_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Advanced Syntax Features",
    "name": "advancedSyntaxFeatures_json",
    "default": "[]",
    "description": "Advanced search syntax features you want to support\n- `exactPhrase`.\n  Phrases in quotes must match exactly.\n  For example, `sparkly blue \"iPhone case\"` only returns records with the exact string \"iPhone case\"\n- `excludeWords`.\n  Query words prefixed with a `-` must not occur in a record.\n  For example, `search -engine` matches records that contain \"search\" but not \"engine\"\nThis setting only has an effect if `advancedSyntax` is true.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "advancedSyntaxFeatures"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "advancedsyntaxfeatures_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "distinct",
    "displayName": "Distinct",
    "default": "",
    "options": [
      {
        "name": "Boolean",
        "value": "boolean"
      },
      {
        "name": "Integer",
        "value": "integer"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "distinct",
        "value": "={{ typeof $parameter.distinct_boolean !== \"undefined\" ? $parameter.distinct_boolean : typeof $parameter.distinct_number !== \"undefined\" ? $parameter.distinct_number : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "distinct"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether deduplication is turned on. If true, only one member of a group is shown in the search results.",
    "required": false,
    "displayName": "Distinct",
    "name": "distinct_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "distinct": [
          "boolean"
        ],
        "multiple_properties": [
          "distinct"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Number of members of a group of records to include in the search results.\n\n- Don't use `distinct > 1` for records that might be [promoted by rules](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/promote-hits/).\n  The number of hits won't be correct and faceting won't work as expected.\n- With `distinct > 1`, the `hitsPerPage` parameter controls the number of returned groups.\n  For example, with `hitsPerPage: 10` and `distinct: 2`, up to 20 records are returned.\n  Likewise, the `nbHits` response attribute contains the number of returned groups.\n",
    "required": false,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 4
    },
    "displayName": "Distinct",
    "name": "distinct_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "distinct": [
          "integer"
        ],
        "multiple_properties": [
          "distinct"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to replace a highlighted word with the matched synonym\nBy default, the original words are highlighted even if a synonym matches.\nFor example, with `home` as a synonym for `house` and a search for `home`,\nrecords matching either \"home\" or \"house\" are included in the search results,\nand either \"home\" or \"house\" are highlighted\nWith `replaceSynonymsInHighlight` set to `true`, a search for `home` still matches the same records,\nbut all occurrences of \"house\" are replaced by \"home\" in the highlighted response.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "replaceSynonymsInHighlight"
      }
    },
    "displayName": "Replace Synonyms In Highlight",
    "name": "replaceSynonymsInHighlight_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "replacesynonymsinhighlight_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 1,
    "description": "Minimum proximity score for two matching words\nThis adjusts the [Proximity ranking criterion](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#proximity)\nby equally scoring matches that are farther apart\nFor example, if `minProximity` is 2, neighboring matches and matches with one word between them would have the same score.\n",
    "required": false,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 7
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "minProximity"
      }
    },
    "displayName": "Min Proximity",
    "name": "minProximity_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "minproximity_number"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Response Fields",
    "name": "responseFields_json",
    "default": "[]",
    "description": "Properties to include in the API response of search and browse requests\nBy default, all response properties are included.\nTo reduce the response size, you can select which properties should be included\nAn empty list may lead to an empty API response (except properties you can't exclude)\nYou can't exclude these properties:\n`message`, `warning`, `cursor`, `abTestVariantID`,\nor any property added by setting `getRankingInfo` to true\nYour search depends on the `hits` field. If you omit this field, searches won't return any results.\nYour UI might also depend on other properties, for example, for pagination.\nBefore restricting the response size, check the impact on your search experience.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "responseFields"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "responsefields_json"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 100,
    "description": "Maximum number of facet values to return for each facet.",
    "required": false,
    "typeOptions": {
      "maxValue": 1000
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "maxValuesPerFacet"
      }
    },
    "displayName": "Max Values Per Facet",
    "name": "maxValuesPerFacet_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "maxvaluesperfacet_number"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "count",
    "description": "Order in which to retrieve facet values\n- `count`.\n  Facet values are retrieved by decreasing count.\n  The count is the number of matching records containing this facet value\n- `alpha`.\n  Retrieve facet values alphabetically\nThis setting doesn't influence how facet values are displayed in your UI (see `renderingContent`).\nFor more information, see [facet value display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/js/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "sortFacetValuesBy"
      }
    },
    "displayName": "Sort Facet Values By",
    "name": "sortFacetValuesBy_string",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "sortfacetvaluesby_string"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether the best matching attribute should be determined by minimum proximity\nThis setting only affects ranking if the Attribute ranking criterion comes before Proximity in the `ranking` setting.\nIf true, the best matching attribute is selected based on the minimum proximity of multiple matches.\nOtherwise, the best matching attribute is determined by the order in the `searchableAttributes` setting.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "attributeCriteriaComputedByMinProximity"
      }
    },
    "displayName": "Attribute Criteria Computed By Min Proximity",
    "name": "attributeCriteriaComputedByMinProximity_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "attributecriteriacomputedbyminproximity_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "displayName": "Rendering Content",
    "name": "rendering_content_object",
    "type": "multiOptions",
    "description": "Extra data that can be used in the search UI.\n\nYou can use this to control aspects of your search UI, such as the order of facet names and values\nwithout changing your frontend code.\n",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Facet Ordering",
        "value": "facet_ordering_object_renderingContent"
      },
      {
        "name": "Redirect",
        "value": "redirect_object_renderingContent"
      },
      {
        "name": "Widgets",
        "value": "widgets_object_renderingContent"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "renderingContent",
        "value": "={{ { \"facetOrdering\": { \"facets\": { \"order\": typeof $parameter.order_json_facets_facetOrdering_renderingContent !== \"undefined\" ? JSON.parse($parameter.order_json_facets_facetOrdering_renderingContent) : undefined }, \"values\": typeof $parameter.values_object_facetOrdering_renderingContent !== \"undefined\" ? JSON.parse($parameter.values_object_facetOrdering_renderingContent) : undefined }, \"redirect\": { \"url\": typeof $parameter.url_string_redirect_renderingContent !== \"undefined\" ? $parameter.url_string_redirect_renderingContent : undefined }, \"widgets\": { \"banners\": typeof $parameter.banners_fixedCollection_widgets_renderingContent !== \"undefined\" ? JSON.parse($parameter.banners_fixedCollection_widgets_renderingContent) : undefined } } }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "rendering_content_object"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "displayName": "Facet Ordering",
    "name": "facet_ordering_object_renderingContent",
    "type": "multiOptions",
    "description": "Order of facet names and facet values in your UI.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Facets",
        "value": "facets_object_facetOrdering"
      },
      {
        "name": "Values",
        "value": "values_object_facetOrdering"
      }
    ],
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "facet_ordering_object_renderingContent"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "displayName": "Facets",
    "name": "facets_object_facetOrdering_renderingContent",
    "type": "multiOptions",
    "description": "Order of facet names.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Order",
        "value": "order_json_facets"
      }
    ],
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent": [
          "facets_object_facetOrdering"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Order",
    "name": "order_json_facets_facetOrdering_renderingContent",
    "default": "[]",
    "description": "Explicit order of facets or facet values.\n\nThis setting lets you always show specific facets or facet values at the top of the list.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent": [
          "facets_object_facetOrdering"
        ],
        "facets_object_facetOrdering_renderingContent": [
          "order_json_facets"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "displayName": "Values",
    "name": "values_object_facetOrdering_renderingContent",
    "type": "json",
    "description": "Order of facet values. One object for each facet.",
    "required": false,
    "default": "",
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent": [
          "values_object_facetOrdering"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "displayName": "Redirect",
    "name": "redirect_object_renderingContent",
    "type": "multiOptions",
    "description": "The redirect rule container.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Url",
        "value": "url_string_redirect"
      }
    ],
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "redirect_object_renderingContent"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Url",
    "name": "url_string_redirect_renderingContent",
    "default": "",
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "redirect_object_renderingContent"
        ],
        "redirect_object_renderingContent": [
          "url_string_redirect"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "displayName": "Widgets",
    "name": "widgets_object_renderingContent",
    "type": "multiOptions",
    "description": "Widgets returned from any rules that are applied to the current search.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Banners",
        "value": "banners_fixedCollection_widgets"
      }
    ],
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "widgets_object_renderingContent"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Banners",
    "name": "banners_fixedCollection_widgets_renderingContent",
    "default": "",
    "description": "Banners defined in the Merchandising Studio for a given search.",
    "required": false,
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "widgets_object_renderingContent"
        ],
        "widgets_object_renderingContent": [
          "banners_fixedCollection_widgets"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking/)\nThis setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "enableReRanking"
      }
    },
    "displayName": "Enable Re Ranking",
    "name": "enableReRanking_boolean",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "enablereranking_boolean"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "reRankingApplyFilter",
    "displayName": "Re Ranking Apply Filter",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "reRankingApplyFilter",
        "value": "={{ typeof $parameter.reRankingApplyFilter_json !== \"undefined\" ? JSON.parse($parameter.reRankingApplyFilter_json) : typeof $parameter.reRankingApplyFilter_string !== \"undefined\" ? $parameter.reRankingApplyFilter_string : typeof $parameter.reRankingApplyFilter_null !== \"undefined\" ? JSON.parse($parameter.reRankingApplyFilter_null) : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "rerankingapplyfilter"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Re Ranking Apply Filter",
    "name": "reRankingApplyFilter_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "reRankingApplyFilter": [
          "array"
        ],
        "multiple_properties": [
          "rerankingapplyfilter"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Re Ranking Apply Filter",
    "name": "reRankingApplyFilter_string",
    "default": "",
    "displayOptions": {
      "show": {
        "reRankingApplyFilter": [
          "string"
        ],
        "multiple_properties": [
          "rerankingapplyfilter"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "reRankingApplyFilter",
    "name": "reRankingApplyFilter_null",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "reRankingApplyFilter": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "reRankingApplyFilter": [
          "null"
        ],
        "multiple_properties": [
          "rerankingapplyfilter"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "jMDY3M2MwM2QwMWUxMmQwYWI0ZTN",
    "description": "Cursor to get the next page of the response.\n\nThe parameter must match the value returned in the response of a previous request.\nThe last page of the response does not return a `cursor` attribute.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "cursor"
      }
    },
    "displayName": "Cursor",
    "name": "cursor_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "cursor_string"
        ],
        "selector": [
          "option_2"
        ],
        "resource": [
          "Search"
        ],
        "operation": [
          "browse"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "saveObject"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Indices"
        ],
        "operation": [
          "deleteIndex"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "getObject"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "string",
    "placeholder": "test-record-123",
    "description": "Unique record identifier.",
    "required": true,
    "displayName": "Object ID",
    "name": "objectID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "getObject"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Retrieve",
    "name": "attributesToRetrieve_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "getObject"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "addOrUpdateObject"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "string",
    "placeholder": "test-record-123",
    "description": "Unique record identifier.",
    "required": true,
    "displayName": "Object ID",
    "name": "objectID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "addOrUpdateObject"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteObject"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "string",
    "placeholder": "test-record-123",
    "description": "Unique record identifier.",
    "required": true,
    "displayName": "Object ID",
    "name": "objectID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteObject"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "displayName": "Multiple properties",
    "name": "multiple_properties_object",
    "type": "multiOptions",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Facet Filters",
        "value": "facetFilters"
      },
      {
        "name": "Filters",
        "value": "filters_string"
      },
      {
        "name": "Numeric Filters",
        "value": "numericFilters"
      },
      {
        "name": "Tag Filters",
        "value": "tagFilters"
      },
      {
        "name": "Around Lat Lng",
        "value": "aroundLatLng_string"
      },
      {
        "name": "Around Radius",
        "value": "aroundRadius"
      },
      {
        "name": "Inside Bounding Box",
        "value": "insideBoundingBox"
      },
      {
        "name": "Inside Polygon",
        "value": "insidePolygon_json"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "facetFilters",
    "displayName": "Facet Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "facetFilters",
        "value": "={{ typeof $parameter.facetFilters_json !== \"undefined\" ? JSON.parse($parameter.facetFilters_json) : typeof $parameter.facetFilters_string !== \"undefined\" ? $parameter.facetFilters_string : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "facetFilters"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Facet Filters",
    "name": "facetFilters_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "facetFilters"
        ],
        "facetFilters": [
          "array"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Facet Filters",
    "name": "facetFilters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "facetFilters"
        ],
        "facetFilters": [
          "string"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "(category:Book OR category:Ebook) AND _tags:published",
    "description": "Filter expression to only include items that match the filter criteria in the response.\n\nYou can use these filter expressions:\n\n- **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`.\n- **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive).\n- **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value.\n- **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive).\n- **Boolean filters.** `<facet>: true | false`.\n\nYou can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:\n\n- You can only combine filters of the same type with `OR`.\n  **Not supported:** `facet:value OR num > 3`.\n- You can't use `NOT` with combinations of filters.\n  **Not supported:** `NOT(facet:value OR facet:value)`\n- You can't combine conjunctions (`AND`) with `OR`.\n  **Not supported:** `facet:value OR (facet:value AND facet:value)`\n\nUse quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes.\nIf a facet attribute is an array, the filter matches if it matches at least one element of the array.\n\nFor more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "filters"
      }
    },
    "displayName": "Filters",
    "name": "filters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "filters_string"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "numericFilters",
    "displayName": "Numeric Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "numericFilters",
        "value": "={{ typeof $parameter.numericFilters_json !== \"undefined\" ? JSON.parse($parameter.numericFilters_json) : typeof $parameter.numericFilters_string !== \"undefined\" ? $parameter.numericFilters_string : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "numericFilters"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Numeric Filters",
    "name": "numericFilters_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "numericFilters"
        ],
        "numericFilters": [
          "array"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Numeric Filters",
    "name": "numericFilters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "numericFilters"
        ],
        "numericFilters": [
          "string"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "tagFilters",
    "displayName": "Tag Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "tagFilters",
        "value": "={{ typeof $parameter.tagFilters_json !== \"undefined\" ? JSON.parse($parameter.tagFilters_json) : typeof $parameter.tagFilters_string !== \"undefined\" ? $parameter.tagFilters_string : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "tagFilters"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Tag Filters",
    "name": "tagFilters_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "tagFilters"
        ],
        "tagFilters": [
          "array"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Tag Filters",
    "name": "tagFilters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "tagFilters"
        ],
        "tagFilters": [
          "string"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "40.71,-74.01",
    "description": "Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.\n\nOnly records included within a circle around this central location are included in the results.\nThe radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings.\nThis parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "aroundLatLng"
      }
    },
    "displayName": "Around Lat Lng",
    "name": "aroundLatLng_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "aroundLatLng_string"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "aroundRadius",
    "displayName": "Around Radius",
    "default": "",
    "options": [
      {
        "name": "Integer",
        "value": "integer"
      },
      {
        "name": "All",
        "value": "all"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "aroundRadius",
        "value": "={{ typeof $parameter.aroundRadius_number !== \"undefined\" ? $parameter.aroundRadius_number : typeof $parameter.aroundRadius_options !== \"undefined\" ? $parameter.aroundRadius_options : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "aroundRadius"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Maximum search radius around a central location in meters.",
    "required": false,
    "typeOptions": {
      "minValue": 1
    },
    "displayName": "Around Radius",
    "name": "aroundRadius_number",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "aroundRadius"
        ],
        "aroundRadius": [
          "integer"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "options",
    "description": "Return all records with a valid `_geoloc` attribute. Don't filter by distance.",
    "required": false,
    "options": [
      {
        "name": "all",
        "value": "all"
      }
    ],
    "displayName": "Around Radius",
    "name": "aroundRadius_options",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "aroundRadius"
        ],
        "aroundRadius": [
          "all"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "insideBoundingBox",
    "displayName": "Inside Bounding Box",
    "default": "",
    "options": [
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Null",
        "value": "null"
      },
      {
        "name": "Array",
        "value": "array"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "insideBoundingBox",
        "value": "={{ typeof $parameter.insideBoundingBox_string !== \"undefined\" ? $parameter.insideBoundingBox_string : typeof $parameter.insideBoundingBox_null !== \"undefined\" ? JSON.parse($parameter.insideBoundingBox_null) : typeof $parameter.insideBoundingBox_json !== \"undefined\" ? JSON.parse($parameter.insideBoundingBox_json) : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "insideBoundingBox"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Inside Bounding Box",
    "name": "insideBoundingBox_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "insideBoundingBox"
        ],
        "insideBoundingBox": [
          "string"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "insideBoundingBox",
    "name": "insideBoundingBox_null",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "insideBoundingBox": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "insideBoundingBox"
        ],
        "insideBoundingBox": [
          "null"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Inside Bounding Box",
    "name": "insideBoundingBox_json",
    "default": "[]",
    "description": "Coordinates for a rectangular area in which to search.\n\nEach bounding box is defined by the two opposite points of its diagonal, and expressed as latitude and longitude pair:\n`[p1 lat, p1 long, p2 lat, p2 long]`.\nProvide multiple bounding boxes as nested arrays.\nFor more information, see [rectangular area](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "insideBoundingBox"
        ],
        "insideBoundingBox": [
          "array"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Inside Polygon",
    "name": "insidePolygon_json",
    "default": "[]",
    "description": "Coordinates of a polygon in which to search.\n\nPolygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude.\nProvide multiple polygons as nested arrays.\nFor more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\nThis parameter is ignored if you also specify `insideBoundingBox`.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "insidePolygon"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "insidePolygon_json"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "deleteBy"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "clearObjects"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "partialUpdateObject"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "string",
    "placeholder": "test-record-123",
    "description": "Unique record identifier.",
    "required": true,
    "displayName": "Object ID",
    "name": "objectID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "partialUpdateObject"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "required": false,
    "displayName": "Create If Not Exists",
    "name": "createIfNotExists_boolean",
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "partialUpdateObject"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "batch"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "displayName": "Batch Write Params",
    "name": "batch_write_params_object",
    "type": "multiOptions",
    "description": "Batch parameters.",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Requests",
        "value": "requests_fixedCollection"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "batch"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Requests",
    "name": "requests_fixedCollection",
    "default": "",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "requests"
      }
    },
    "displayOptions": {
      "show": {
        "batch_write_params_object": [
          "requests_fixedCollection"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "batch"
        ]
      }
    }
  },
  {
    "displayName": "Batch Params",
    "name": "batch_params_object",
    "type": "multiOptions",
    "description": "Batch parameters.",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Requests",
        "value": "requests_fixedCollection"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "multipleBatch"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Requests",
    "name": "requests_fixedCollection",
    "default": "",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "requests"
      }
    },
    "displayOptions": {
      "show": {
        "batch_params_object": [
          "requests_fixedCollection"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "multipleBatch"
        ]
      }
    }
  },
  {
    "displayName": "Get Objects Params",
    "name": "get_objects_params_object",
    "type": "multiOptions",
    "description": "Request parameters.",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Requests",
        "value": "requests_fixedCollection"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Records"
        ],
        "operation": [
          "getObjects"
        ]
      }
    }
  },
  {
    "type": "fixedCollection",
    "displayName": "Requests",
    "name": "requests_fixedCollection",
    "default": "",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $parameter.values?.map(item => ({ attributesToRetrieve: typeof item.attributesToRetrieve_json_requests !== \"undefined\" ? JSON.parse(item.attributesToRetrieve_json_requests) : undefined, objectID: typeof item.objectID_string_requests !== \"undefined\" ? item.objectID_string_requests : undefined, indexName: typeof item.indexName_string_requests !== \"undefined\" ? item.indexName_string_requests : undefined })) }}",
        "property": "requests"
      }
    },
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "requests_fixedCollection_values",
        "displayName": "Requests",
        "values": [
          {
            "type": "json",
            "displayName": "Attributes To Retrieve",
            "name": "attributesToRetrieve_json_requests",
            "default": "[]",
            "description": "Attributes to retrieve.\nIf not specified, all retrievable attributes are returned.\n",
            "required": false
          },
          {
            "type": "string",
            "placeholder": "product-1",
            "description": "Object ID for the record to retrieve.",
            "required": false,
            "displayName": "Object ID",
            "name": "objectID_string_requests",
            "default": ""
          },
          {
            "type": "string",
            "placeholder": "books",
            "description": "Index from which to retrieve the records.",
            "required": false,
            "displayName": "Index Name",
            "name": "indexName_string_requests",
            "default": ""
          }
        ]
      }
    ],
    "displayOptions": {
      "show": {
        "get_objects_params_object": [
          "requests_fixedCollection"
        ],
        "resource": [
          "Records"
        ],
        "operation": [
          "getObjects"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Indices"
        ],
        "operation": [
          "getSettings"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "number",
    "default": 1,
    "required": false,
    "displayName": "Get Version",
    "name": "getVersion_number",
    "displayOptions": {
      "show": {
        "resource": [
          "Indices"
        ],
        "operation": [
          "getSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "boolean",
    "required": false,
    "displayName": "Forward To Replicas",
    "name": "forwardToReplicas_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "multiOptions",
    "name": "multiple_properties",
    "displayName": "Multiple properties",
    "description": "Index settings.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Attributes For Faceting",
        "value": "attributesforfaceting_json"
      },
      {
        "name": "Replicas",
        "value": "replicas_json"
      },
      {
        "name": "Pagination Limited To",
        "value": "paginationlimitedto_number"
      },
      {
        "name": "Unretrievable Attributes",
        "value": "unretrievableattributes_json"
      },
      {
        "name": "Disable Typo Tolerance On Words",
        "value": "disabletypotoleranceonwords_json"
      },
      {
        "name": "Attributes To Transliterate",
        "value": "attributestotransliterate_json"
      },
      {
        "name": "Camel Case Attributes",
        "value": "camelcaseattributes_json"
      },
      {
        "name": "Index Languages",
        "value": "indexlanguages_json"
      },
      {
        "name": "Disable Prefix On Attributes",
        "value": "disableprefixonattributes_json"
      },
      {
        "name": "Allow Compression Of Integer Array",
        "value": "allowcompressionofintegerarray_boolean"
      },
      {
        "name": "Numeric Attributes For Filtering",
        "value": "numericattributesforfiltering_json"
      },
      {
        "name": "Separators To Index",
        "value": "separatorstoindex_string"
      },
      {
        "name": "Searchable Attributes",
        "value": "searchableattributes_json"
      },
      {
        "name": "Custom Normalization",
        "value": "customnormalization_string"
      },
      {
        "name": "Attribute For Distinct",
        "value": "attributefordistinct_string"
      },
      {
        "name": "Max Facet Hits",
        "value": "maxfacethits_number"
      },
      {
        "name": "Keep Diacritics On Characters",
        "value": "keepdiacriticsoncharacters_string"
      },
      {
        "name": "Custom Ranking",
        "value": "customranking_json"
      },
      {
        "name": "Attributes To Retrieve",
        "value": "attributestoretrieve_json"
      },
      {
        "name": "Ranking",
        "value": "ranking_json"
      },
      {
        "name": "Relevancy Strictness",
        "value": "relevancystrictness_number"
      },
      {
        "name": "Attributes To Highlight",
        "value": "attributestohighlight_json"
      },
      {
        "name": "Attributes To Snippet",
        "value": "attributestosnippet_json"
      },
      {
        "name": "Highlight Pre Tag",
        "value": "highlightpretag_string"
      },
      {
        "name": "Highlight Post Tag",
        "value": "highlightposttag_string"
      },
      {
        "name": "Snippet Ellipsis Text",
        "value": "snippetellipsistext_string"
      },
      {
        "name": "Restrict Highlight And Snippet Arrays",
        "value": "restricthighlightandsnippetarrays_boolean"
      },
      {
        "name": "Hits Per Page",
        "value": "hitsperpage_number"
      },
      {
        "name": "Min Word Sizefor1Typo",
        "value": "minwordsizefor1typo_number"
      },
      {
        "name": "Min Word Sizefor2Typos",
        "value": "minwordsizefor2typos_number"
      },
      {
        "name": "Typo Tolerance",
        "value": "typotolerance"
      },
      {
        "name": "Allow Typos On Numeric Tokens",
        "value": "allowtyposonnumerictokens_boolean"
      },
      {
        "name": "Disable Typo Tolerance On Attributes",
        "value": "disabletypotoleranceonattributes_json"
      },
      {
        "name": "Ignore Plurals",
        "value": "ignoreplurals"
      },
      {
        "name": "Remove Stop Words",
        "value": "removestopwords"
      },
      {
        "name": "Query Languages",
        "value": "querylanguages_json"
      },
      {
        "name": "Decompound Query",
        "value": "decompoundquery_boolean"
      },
      {
        "name": "Enable Rules",
        "value": "enablerules_boolean"
      },
      {
        "name": "Enable Personalization",
        "value": "enablepersonalization_boolean"
      },
      {
        "name": "Query Type",
        "value": "querytype_options"
      },
      {
        "name": "Remove Words If No Results",
        "value": "removewordsifnoresults_options"
      },
      {
        "name": "Mode",
        "value": "mode_options"
      },
      {
        "name": "Semantic search object",
        "value": "semantic_search_object"
      },
      {
        "name": "Advanced Syntax",
        "value": "advancedsyntax_boolean"
      },
      {
        "name": "Optional Words",
        "value": "optionalwords"
      },
      {
        "name": "Disable Exact On Attributes",
        "value": "disableexactonattributes_json"
      },
      {
        "name": "Exact On Single Word Query",
        "value": "exactonsinglewordquery_options"
      },
      {
        "name": "Alternatives As Exact",
        "value": "alternativesasexact_json"
      },
      {
        "name": "Advanced Syntax Features",
        "value": "advancedsyntaxfeatures_json"
      },
      {
        "name": "Distinct",
        "value": "distinct"
      },
      {
        "name": "Replace Synonyms In Highlight",
        "value": "replacesynonymsinhighlight_boolean"
      },
      {
        "name": "Min Proximity",
        "value": "minproximity_number"
      },
      {
        "name": "Response Fields",
        "value": "responsefields_json"
      },
      {
        "name": "Max Values Per Facet",
        "value": "maxvaluesperfacet_number"
      },
      {
        "name": "Sort Facet Values By",
        "value": "sortfacetvaluesby_string"
      },
      {
        "name": "Attribute Criteria Computed By Min Proximity",
        "value": "attributecriteriacomputedbyminproximity_boolean"
      },
      {
        "name": "Rendering content object",
        "value": "rendering_content_object"
      },
      {
        "name": "Enable Re Ranking",
        "value": "enablereranking_boolean"
      },
      {
        "name": "Re Ranking Apply Filter",
        "value": "rerankingapplyfilter"
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes For Faceting",
    "name": "attributesForFaceting_json",
    "default": "[]",
    "description": "Attributes used for [faceting](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/).\n\nFacets are attributes that let you categorize search results.\nThey can be used for filtering search results.\nBy default, no attribute is used for faceting.\nAttribute names are case-sensitive.\n\n**Modifiers**\n\n- `filterOnly(\"ATTRIBUTE\")`.\n  Allows the attribute to be used as a filter but doesn't evaluate the facet values.\n\n- `searchable(\"ATTRIBUTE\")`.\n  Allows searching for facet values.\n\n- `afterDistinct(\"ATTRIBUTE\")`.\n  Evaluates the facet count _after_ deduplication with `distinct`.\n  This ensures accurate facet counts.\n  You can apply this modifier to searchable facets: `afterDistinct(searchable(ATTRIBUTE))`.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "attributesForFaceting"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "attributesforfaceting_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Replicas",
    "name": "replicas_json",
    "default": "[]",
    "description": "Creates [replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/).\n\nReplicas are copies of a primary index with the same records but different settings, synonyms, or rules.\nIf you want to offer a different ranking or sorting of your search results, you'll use replica indices.\nAll index operations on a primary index are automatically forwarded to its replicas.\nTo add a replica index, you must provide the complete set of replicas to this parameter.\nIf you omit a replica from this list, the replica turns into a regular, standalone index that will no longer be synced with the primary index.\n\n**Modifier**\n\n- `virtual(\"REPLICA\")`.\n  Create a virtual replica,\n  Virtual replicas don't increase the number of records and are optimized for [Relevant sorting](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/relevant-sort/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "replicas"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "replicas_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "number",
    "placeholder": "100",
    "default": 1000,
    "description": "Maximum number of search results that can be obtained through pagination.\n\nHigher pagination limits might slow down your search.\nFor pagination limits above 1,000, the sorting of results beyond the 1,000th hit can't be guaranteed.\n",
    "required": false,
    "typeOptions": {
      "maxValue": 20000
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "paginationLimitedTo"
      }
    },
    "displayName": "Pagination Limited To",
    "name": "paginationLimitedTo_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "paginationlimitedto_number"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Unretrievable Attributes",
    "name": "unretrievableAttributes_json",
    "default": "[]",
    "description": "Attributes that can't be retrieved at query time.\n\nThis can be useful if you want to use an attribute for ranking or to [restrict access](https://www.algolia.com/doc/guides/security/api-keys/how-to/user-restricted-access-to-data/),\nbut don't want to include it in the search results.\nAttribute names are case-sensitive.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "unretrievableAttributes"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "unretrievableattributes_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Disable Typo Tolerance On Words",
    "name": "disableTypoToleranceOnWords_json",
    "default": "[]",
    "description": "Creates a list of [words which require exact matches](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#turn-off-typo-tolerance-for-certain-words).\nThis also turns off [word splitting and concatenation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/splitting-and-concatenation/) for the specified words.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "disableTypoToleranceOnWords"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "disabletypotoleranceonwords_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Transliterate",
    "name": "attributesToTransliterate_json",
    "default": "[]",
    "description": "Attributes, for which you want to support [Japanese transliteration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#japanese-transliteration-and-type-ahead).\n\nTransliteration supports searching in any of the Japanese writing systems.\nTo support transliteration, you must set the indexing language to Japanese.\nAttribute names are case-sensitive.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "attributesToTransliterate"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "attributestotransliterate_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Camel Case Attributes",
    "name": "camelCaseAttributes_json",
    "default": "[]",
    "description": "Attributes for which to split [camel case](https://wikipedia.org/wiki/Camel_case) words.\nAttribute names are case-sensitive.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "camelCaseAttributes"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "camelcaseattributes_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Index Languages",
    "name": "indexLanguages_json",
    "default": "[]",
    "description": "Languages for language-specific processing steps, such as word detection and dictionary settings.\n\n**You should always specify an indexing language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages/),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "indexLanguages"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "indexlanguages_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Disable Prefix On Attributes",
    "name": "disablePrefixOnAttributes_json",
    "default": "[]",
    "description": "Searchable attributes for which you want to turn off [prefix matching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/#adjusting-prefix-search).\nAttribute names are case-sensitive.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "disablePrefixOnAttributes"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "disableprefixonattributes_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether arrays with exclusively non-negative integers should be compressed for better performance.\nIf true, the compressed arrays may be reordered.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "allowCompressionOfIntegerArray"
      }
    },
    "displayName": "Allow Compression Of Integer Array",
    "name": "allowCompressionOfIntegerArray_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "allowcompressionofintegerarray_boolean"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Numeric Attributes For Filtering",
    "name": "numericAttributesForFiltering_json",
    "default": "[]",
    "description": "Numeric attributes that can be used as [numerical filters](https://www.algolia.com/doc/guides/managing-results/rules/detecting-intent/how-to/applying-a-custom-filter-for-a-specific-query/#numerical-filters).\nAttribute names are case-sensitive.\n\nBy default, all numeric attributes are available as numerical filters.\nFor faster indexing, reduce the number of numeric attributes.\n\nTo turn off filtering for all numeric attributes, specify an attribute that doesn't exist in your index, such as `NO_NUMERIC_FILTERING`.\n\n**Modifier**\n\n- `equalOnly(\"ATTRIBUTE\")`.\n  Support only filtering based on equality comparisons `=` and `!=`.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "numericAttributesForFiltering"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "numericattributesforfiltering_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "+#",
    "description": "Control which non-alphanumeric characters are indexed.\n\nBy default, Algolia ignores [non-alphanumeric characters](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes/#handling-non-alphanumeric-characters) like hyphen (`-`), plus (`+`), and parentheses (`(`,`)`).\nTo include such characters, define them with `separatorsToIndex`.\n\nSeparators are all non-letter characters except spaces and currency characters, such as $€£¥.\n\nWith `separatorsToIndex`, Algolia treats separator characters as separate words.\nFor example, in a search for \"Disney+\", Algolia considers \"Disney\" and \"+\" as two separate words.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "separatorsToIndex"
      }
    },
    "displayName": "Separators To Index",
    "name": "separatorsToIndex_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "separatorstoindex_string"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Searchable Attributes",
    "name": "searchableAttributes_json",
    "default": "[]",
    "description": "Attributes used for searching. Attribute names are case-sensitive.\n\nBy default, all attributes are searchable and the [Attribute](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#attribute) ranking criterion is turned off.\nWith a non-empty list, Algolia only returns results with matches in the selected attributes.\nIn addition, the Attribute ranking criterion is turned on: matches in attributes that are higher in the list of `searchableAttributes` rank first.\nTo make matches in two attributes rank equally, include them in a comma-separated string, such as `\"title,alternate_title\"`.\nAttributes with the same priority are always unordered.\n\nFor more information, see [Searchable attributes](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/setting-searchable-attributes/).\n\n**Modifier**\n\n- `unordered(\"ATTRIBUTE\")`.\n  Ignore the position of a match within the attribute.\n\nWithout a modifier, matches at the beginning of an attribute rank higher than matches at the end.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "searchableAttributes"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "searchableattributes_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "fixedCollection",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "property": "customNormalization",
        "value": "={{ undefined }}"
      }
    },
    "displayName": "Custom Normalization",
    "name": "customNormalization_string",
    "default": "",
    "description": "Characters and their normalized replacements.\nThis overrides Algolia's default [normalization](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/).\n",
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "customNormalization_string",
        "displayName": "Custom Normalization",
        "values": []
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "customnormalization_string"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "url",
    "description": "Attribute that should be used to establish groups of results.\nAttribute names are case-sensitive.\n\nAll records with the same value for this attribute are considered a group.\nYou can combine `attributeForDistinct` with the `distinct` search parameter to control\nhow many items per group are included in the search results.\n\nIf you want to use the same attribute also for faceting, use the `afterDistinct` modifier of the `attributesForFaceting` setting.\nThis applies faceting _after_ deduplication, which will result in accurate facet counts.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "attributeForDistinct"
      }
    },
    "displayName": "Attribute For Distinct",
    "name": "attributeForDistinct_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "attributefordistinct_string"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 10,
    "description": "Maximum number of facet values to return when [searching for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).",
    "required": false,
    "typeOptions": {
      "maxValue": 100
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "maxFacetHits"
      }
    },
    "displayName": "Max Facet Hits",
    "name": "maxFacetHits_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "maxfacethits_number"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "øé",
    "description": "Characters for which diacritics should be preserved.\n\nBy default, Algolia removes diacritics from letters.\nFor example, `é` becomes `e`. If this causes issues in your search,\nyou can specify characters that should keep their diacritics.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "keepDiacriticsOnCharacters"
      }
    },
    "displayName": "Keep Diacritics On Characters",
    "name": "keepDiacriticsOnCharacters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "keepdiacriticsoncharacters_string"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Custom Ranking",
    "name": "customRanking_json",
    "default": "[]",
    "description": "Attributes to use as [custom ranking](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/).\nAttribute names are case-sensitive.\n\nThe custom ranking attributes decide which items are shown first if the other ranking criteria are equal.\n\nRecords with missing values for your selected custom ranking attributes are always sorted last.\nBoolean attributes are sorted based on their alphabetical order.\n\n**Modifiers**\n\n- `asc(\"ATTRIBUTE\")`.\n  Sort the index by the values of an attribute, in ascending order.\n\n- `desc(\"ATTRIBUTE\")`.\n  Sort the index by the values of an attribute, in descending order.\n\nIf you use two or more custom ranking attributes,\n[reduce the precision](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/how-to/controlling-custom-ranking-metrics-precision/) of your first attributes,\nor the other attributes will never be applied.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "customRanking"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "customranking_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Retrieve",
    "name": "attributesToRetrieve_json",
    "default": "[]",
    "description": "Attributes to include in the API response\nTo reduce the size of your response, you can retrieve only some of the attributes.\nAttribute names are case-sensitive\n- `*` retrieves all attributes, except attributes included in the `customRanking` and `unretrievableAttributes` settings.\n- To retrieve all attributes except a specific one, prefix the attribute with a dash and combine it with the `*`: `[\"*\", \"-ATTRIBUTE\"]`.\n- The `objectID` attribute is always included.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "attributesToRetrieve"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "attributestoretrieve_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Ranking",
    "name": "ranking_json",
    "default": "[]",
    "description": "Determines the order in which Algolia returns your results.\n\nBy default, each entry corresponds to a [ranking criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/).\nThe tie-breaking algorithm sequentially applies each criterion in the order they're specified.\nIf you configure a replica index for [sorting by an attribute](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute/),\nyou put the sorting attribute at the top of the list.\n\n**Modifiers**\n\n- `asc(\"ATTRIBUTE\")`.\n  Sort the index by the values of an attribute, in ascending order.\n- `desc(\"ATTRIBUTE\")`.\n  Sort the index by the values of an attribute, in descending order.\n\nBefore you modify the default setting,\nyou should test your changes in the dashboard,\nand by [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "ranking"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "ranking_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "number",
    "placeholder": "90",
    "default": 100,
    "description": "Relevancy threshold below which less relevant results aren't included in the results\nYou can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas).\nUse this setting to strike a balance between the relevance and number of returned results.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "relevancyStrictness"
      }
    },
    "displayName": "Relevancy Strictness",
    "name": "relevancyStrictness_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "relevancystrictness_number"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Highlight",
    "name": "attributesToHighlight_json",
    "default": "[]",
    "description": "Attributes to highlight\nBy default, all searchable attributes are highlighted.\nUse `*` to highlight all attributes or use an empty array `[]` to turn off highlighting.\nAttribute names are case-sensitive\nWith highlighting, strings that match the search query are surrounded by HTML tags defined by `highlightPreTag` and `highlightPostTag`.\nYou can use this to visually highlight matching parts of a search query in your UI\nFor more information, see [Highlighting and snippeting](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "attributesToHighlight"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "attributestohighlight_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Snippet",
    "name": "attributesToSnippet_json",
    "default": "[]",
    "description": "Attributes for which to enable snippets.\nAttribute names are case-sensitive\nSnippets provide additional context to matched words.\nIf you enable snippets, they include 10 words, including the matched word.\nThe matched word will also be wrapped by HTML tags for highlighting.\nYou can adjust the number of words with the following notation: `ATTRIBUTE:NUMBER`,\nwhere `NUMBER` is the number of words to be extracted.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "attributesToSnippet"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "attributestosnippet_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "<em>",
    "description": "HTML tag to insert before the highlighted parts in all highlighted results and snippets.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "highlightPreTag"
      }
    },
    "displayName": "Highlight Pre Tag",
    "name": "highlightPreTag_string",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "highlightpretag_string"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "</em>",
    "description": "HTML tag to insert after the highlighted parts in all highlighted results and snippets.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "highlightPostTag"
      }
    },
    "displayName": "Highlight Post Tag",
    "name": "highlightPostTag_string",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "highlightposttag_string"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "…",
    "description": "String used as an ellipsis indicator when a snippet is truncated.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "snippetEllipsisText"
      }
    },
    "displayName": "Snippet Ellipsis Text",
    "name": "snippetEllipsisText_string",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "snippetellipsistext_string"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to restrict highlighting and snippeting to items that at least partially matched the search query.\nBy default, all items are highlighted and snippeted.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "restrictHighlightAndSnippetArrays"
      }
    },
    "displayName": "Restrict Highlight And Snippet Arrays",
    "name": "restrictHighlightAndSnippetArrays_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "restricthighlightandsnippetarrays_boolean"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 20,
    "description": "Number of hits per page.",
    "required": false,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 1000
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "hitsPerPage"
      }
    },
    "displayName": "Hits Per Page",
    "name": "hitsPerPage_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "hitsperpage_number"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 4,
    "description": "Minimum number of characters a word in the search query must contain to accept matches with [one typo](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "minWordSizefor1Typo"
      }
    },
    "displayName": "Min Word Sizefor1Typo",
    "name": "minWordSizefor1Typo_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "minwordsizefor1typo_number"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 8,
    "description": "Minimum number of characters a word in the search query must contain to accept matches with [two typos](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "minWordSizefor2Typos"
      }
    },
    "displayName": "Min Word Sizefor2Typos",
    "name": "minWordSizefor2Typos_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "minwordsizefor2typos_number"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "typoTolerance",
    "displayName": "Typo Tolerance",
    "default": "",
    "options": [
      {
        "name": "Boolean",
        "value": "boolean"
      },
      {
        "name": "Typo tolerance",
        "value": "typo_tolerance"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "typoTolerance",
        "value": "={{ typeof $parameter.typoTolerance_boolean !== \"undefined\" ? $parameter.typoTolerance_boolean : typeof $parameter.typoTolerance_options !== \"undefined\" ? $parameter.typoTolerance_options : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "typotolerance"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether typo tolerance is active. If true, matches with typos are included in the search results and rank after exact matches.",
    "required": false,
    "displayName": "Typo Tolerance",
    "name": "typoTolerance_boolean",
    "displayOptions": {
      "show": {
        "typoTolerance": [
          "boolean"
        ],
        "multiple_properties": [
          "typotolerance"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "description": "- `min`. Return matches with the lowest number of typos.\n  For example, if you have matches without typos, only include those.\n  But if there are no matches without typos (with 1 typo), include matches with 1 typo (2 typos).\n- `strict`. Return matches with the two lowest numbers of typos.\n  With `strict`, the Typo ranking criterion is applied first in the `ranking` setting.\n",
    "required": false,
    "options": [
      {
        "name": "min",
        "value": "min"
      },
      {
        "name": "strict",
        "value": "strict"
      },
      {
        "name": "true",
        "value": "true"
      },
      {
        "name": "false",
        "value": "false"
      }
    ],
    "displayName": "Typo Tolerance",
    "name": "typoTolerance_options",
    "default": "",
    "displayOptions": {
      "show": {
        "typoTolerance": [
          "typo_tolerance"
        ],
        "multiple_properties": [
          "typotolerance"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to allow typos on numbers in the search query\nTurn off this setting to reduce the number of irrelevant matches\nwhen searching in large sets of similar numbers.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "allowTyposOnNumericTokens"
      }
    },
    "displayName": "Allow Typos On Numeric Tokens",
    "name": "allowTyposOnNumericTokens_boolean",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "allowtyposonnumerictokens_boolean"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Disable Typo Tolerance On Attributes",
    "name": "disableTypoToleranceOnAttributes_json",
    "default": "[]",
    "description": "Attributes for which you want to turn off [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/).\nAttribute names are case-sensitive\nReturning only exact matches can help when\n- [Searching in hyphenated attributes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes/).\n- Reducing the number of matches when you have too many.\n  This can happen with attributes that are long blocks of text, such as product descriptions\nConsider alternatives such as `disableTypoToleranceOnWords` or adding synonyms if your attributes have intentional unusual spellings that might look like typos.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "disableTypoToleranceOnAttributes"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "disabletypotoleranceonattributes_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "ignorePlurals",
    "displayName": "Ignore Plurals",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Boolean",
        "value": "boolean"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "ignorePlurals",
        "value": "={{ typeof $parameter.ignorePlurals_json !== \"undefined\" ? JSON.parse($parameter.ignorePlurals_json) : typeof $parameter.ignorePlurals_options !== \"undefined\" ? $parameter.ignorePlurals_options : typeof $parameter.ignorePlurals_boolean !== \"undefined\" ? $parameter.ignorePlurals_boolean : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "ignoreplurals"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Ignore Plurals",
    "name": "ignorePlurals_json",
    "default": "[]",
    "description": "ISO code for languages for which this feature should be active.\nThis overrides languages you set with `queryLanguages`.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "ignorePlurals": [
          "array"
        ],
        "multiple_properties": [
          "ignoreplurals"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "required": false,
    "options": [
      {
        "name": "true",
        "value": "true"
      },
      {
        "name": "false",
        "value": "false"
      }
    ],
    "displayName": "Ignore Plurals",
    "name": "ignorePlurals_options",
    "default": "",
    "displayOptions": {
      "show": {
        "ignorePlurals": [
          "string"
        ],
        "multiple_properties": [
          "ignoreplurals"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "If true, `ignorePlurals` is active for all languages included in `queryLanguages`, or for all supported languages, if `queryLanguges` is empty.\nIf false, singulars, plurals, and other declensions won't be considered equivalent.\n",
    "required": false,
    "displayName": "Ignore Plurals",
    "name": "ignorePlurals_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "ignorePlurals": [
          "boolean"
        ],
        "multiple_properties": [
          "ignoreplurals"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "removeStopWords",
    "displayName": "Remove Stop Words",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "Boolean",
        "value": "boolean"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "removeStopWords",
        "value": "={{ typeof $parameter.removeStopWords_json !== \"undefined\" ? JSON.parse($parameter.removeStopWords_json) : typeof $parameter.removeStopWords_boolean !== \"undefined\" ? $parameter.removeStopWords_boolean : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "removestopwords"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Remove Stop Words",
    "name": "removeStopWords_json",
    "default": "[]",
    "description": "ISO code for languages for which stop words should be removed. This overrides languages you set in `queryLanguges`.",
    "required": false,
    "displayOptions": {
      "show": {
        "removeStopWords": [
          "array"
        ],
        "multiple_properties": [
          "removestopwords"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "If true, stop words are removed for all languages you included in `queryLanguages`, or for all supported languages, if `queryLanguages` is empty.\nIf false, stop words are not removed.\n",
    "required": false,
    "displayName": "Remove Stop Words",
    "name": "removeStopWords_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "removeStopWords": [
          "boolean"
        ],
        "multiple_properties": [
          "removestopwords"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Query Languages",
    "name": "queryLanguages_json",
    "default": "[]",
    "description": "Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries \nThis setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings.\nThis setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages.\nTo support this, you must place the CJK language **first** \n**You should always specify a query language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages/),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "queryLanguages"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "querylanguages_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to split compound words in the query into their building blocks\nFor more information, see [Word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#splitting-compound-words).\nWord segmentation is supported for these languages: German, Dutch, Finnish, Swedish, and Norwegian.\nDecompounding doesn't work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark).\nFor example, `Gartenstühle` won't be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "decompoundQuery"
      }
    },
    "displayName": "Decompound Query",
    "name": "decompoundQuery_boolean",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "decompoundquery_boolean"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to enable rules.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "enableRules"
      }
    },
    "displayName": "Enable Rules",
    "name": "enableRules_boolean",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "enablerules_boolean"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to enable Personalization.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "enablePersonalization"
      }
    },
    "displayName": "Enable Personalization",
    "name": "enablePersonalization_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "enablepersonalization_boolean"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "default": "prefixLast",
    "description": "Determines if and how query words are interpreted as prefixes.\n\nBy default, only the last query word is treated as a prefix (`prefixLast`).\nTo turn off prefix search, use `prefixNone`.\nAvoid `prefixAll`, which treats all query words as prefixes.\nThis might lead to counterintuitive results and makes your search slower.\n\nFor more information, see [Prefix searching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/prefix-searching/).\n",
    "required": false,
    "options": [
      {
        "name": "prefixLast",
        "value": "prefixLast"
      },
      {
        "name": "prefixAll",
        "value": "prefixAll"
      },
      {
        "name": "prefixNone",
        "value": "prefixNone"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "queryType"
      }
    },
    "displayName": "Query Type",
    "name": "queryType_options",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "querytype_options"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "firstWords",
    "default": "none",
    "description": "Strategy for removing words from the query when it doesn't return any results.\nThis helps to avoid returning empty search results.\n\n- `none`.\n  No words are removed when a query doesn't return results.\n\n- `lastWords`.\n  Treat the last (then second to last, then third to last) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `firstWords`.\n  Treat the first (then second, then third) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `allOptional`.\n  Treat all words as optional.\n\nFor more information, see [Remove words to improve results](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/in-depth/why-use-remove-words-if-no-results/).\n",
    "required": false,
    "options": [
      {
        "name": "none",
        "value": "none"
      },
      {
        "name": "lastWords",
        "value": "lastWords"
      },
      {
        "name": "firstWords",
        "value": "firstWords"
      },
      {
        "name": "allOptional",
        "value": "allOptional"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "removeWordsIfNoResults"
      }
    },
    "displayName": "Remove Words If No Results",
    "name": "removeWordsIfNoResults_options",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "removewordsifnoresults_options"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "default": "keywordSearch",
    "description": "Search mode the index will use to query for results.\n\nThis setting only applies to indices, for which Algolia enabled NeuralSearch for you.\n",
    "required": false,
    "options": [
      {
        "name": "neuralSearch",
        "value": "neuralSearch"
      },
      {
        "name": "keywordSearch",
        "value": "keywordSearch"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "mode"
      }
    },
    "displayName": "Mode",
    "name": "mode_options",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "mode_options"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "displayName": "Semantic Search",
    "name": "semantic_search_object",
    "type": "multiOptions",
    "description": "Settings for the semantic search part of NeuralSearch.\nOnly used when `mode` is `neuralSearch`.\n",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Event Sources",
        "value": "eventSources_semanticSearch"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "semanticSearch",
        "value": "={{ { \"eventSources\": typeof $parameter.eventSources_json_semanticSearch !== \"undefined\" ? JSON.parse($parameter.eventSources_json_semanticSearch) : typeof $parameter.eventSources_null_semanticSearch !== \"undefined\" ? JSON.parse($parameter.eventSources_null_semanticSearch) : undefined } }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "semantic_search_object"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "eventSources_semanticSearch",
    "displayName": "Event Sources",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "displayOptions": {
      "show": {
        "semantic_search_object": [
          "eventSources_semanticSearch"
        ],
        "multiple_properties": [
          "semantic_search_object"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Event Sources",
    "name": "eventSources_json_semanticSearch",
    "default": "[]",
    "description": "Indices from which to collect click and conversion events.\n\nIf null, the current index and all its replicas are used.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "semantic_search_object": [
          "eventSources_semanticSearch"
        ],
        "eventSources_semanticSearch": [
          "array"
        ],
        "multiple_properties": [
          "semantic_search_object"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "eventSources",
    "name": "eventSources_null_semanticSearch",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "eventSources": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "semantic_search_object": [
          "eventSources_semanticSearch"
        ],
        "eventSources_semanticSearch": [
          "null"
        ],
        "multiple_properties": [
          "semantic_search_object"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to support phrase matching and excluding words from search queries\nUse the `advancedSyntaxFeatures` parameter to control which feature is supported.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "advancedSyntax"
      }
    },
    "displayName": "Advanced Syntax",
    "name": "advancedSyntax_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "advancedsyntax_boolean"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "optionalWords",
    "displayName": "Optional Words",
    "default": "",
    "options": [
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Null",
        "value": "null"
      },
      {
        "name": "Array",
        "value": "array"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "optionalWords",
        "value": "={{ typeof $parameter.optionalWords_string !== \"undefined\" ? $parameter.optionalWords_string : typeof $parameter.optionalWords_null !== \"undefined\" ? JSON.parse($parameter.optionalWords_null) : typeof $parameter.optionalWords_json !== \"undefined\" ? JSON.parse($parameter.optionalWords_json) : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "optionalwords"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Optional Words",
    "name": "optionalWords_string",
    "default": "",
    "displayOptions": {
      "show": {
        "optionalWords": [
          "string"
        ],
        "multiple_properties": [
          "optionalwords"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "optionalWords",
    "name": "optionalWords_null",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "optionalWords": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "optionalWords": [
          "null"
        ],
        "multiple_properties": [
          "optionalwords"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Optional Words",
    "name": "optionalWords_json",
    "default": "[]",
    "description": "List of [optional words](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/#creating-a-list-of-optional-words).",
    "required": false,
    "displayOptions": {
      "show": {
        "optionalWords": [
          "array"
        ],
        "multiple_properties": [
          "optionalwords"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Disable Exact On Attributes",
    "name": "disableExactOnAttributes_json",
    "default": "[]",
    "description": "Searchable attributes for which you want to [turn off the Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes).\nAttribute names are case-sensitive\nThis can be useful for attributes with long values, where the likelihood of an exact match is high,\nsuch as product descriptions.\nTurning off the Exact ranking criterion for these attributes favors exact matching on other attributes.\nThis reduces the impact of individual attributes with a lot of content on ranking.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "disableExactOnAttributes"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "disableexactonattributes_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "default": "attribute",
    "description": "Determines how the [Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes) is computed when the search query has only one word.\n\n- `attribute`.\n  The Exact ranking criterion is 1 if the query word and attribute value are the same.\n  For example, a search for \"road\" will match the value \"road\", but not \"road trip\".\n\n- `none`.\n  The Exact ranking criterion is ignored on single-word searches.\n\n- `word`.\n  The Exact ranking criterion is 1 if the query word is found in the attribute value.\n  The query word must have at least 3 characters and must not be a stop word.\n  Only exact matches will be highlighted,\n  partial and prefix matches won't.\n",
    "required": false,
    "options": [
      {
        "name": "attribute",
        "value": "attribute"
      },
      {
        "name": "none",
        "value": "none"
      },
      {
        "name": "word",
        "value": "word"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "exactOnSingleWordQuery"
      }
    },
    "displayName": "Exact On Single Word Query",
    "name": "exactOnSingleWordQuery_options",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "exactonsinglewordquery_options"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Alternatives As Exact",
    "name": "alternativesAsExact_json",
    "default": "[]",
    "description": "Determine which plurals and synonyms should be considered an exact matches\nBy default, Algolia treats singular and plural forms of a word, and single-word synonyms, as [exact](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#exact) matches when searching.\nFor example\n- \"swimsuit\" and \"swimsuits\" are treated the same\n- \"swimsuit\" and \"swimwear\" are treated the same (if they are [synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#regular-synonyms))\n- `ignorePlurals`.\n  Plurals and similar declensions added by the `ignorePlurals` setting are considered exact matches\n- `singleWordSynonym`.\n  Single-word synonyms, such as \"NY\" = \"NYC\", are considered exact matches\n- `multiWordsSynonym`.\n  Multi-word synonyms, such as \"NY\" = \"New York\", are considered exact matches.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "alternativesAsExact"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "alternativesasexact_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Advanced Syntax Features",
    "name": "advancedSyntaxFeatures_json",
    "default": "[]",
    "description": "Advanced search syntax features you want to support\n- `exactPhrase`.\n  Phrases in quotes must match exactly.\n  For example, `sparkly blue \"iPhone case\"` only returns records with the exact string \"iPhone case\"\n- `excludeWords`.\n  Query words prefixed with a `-` must not occur in a record.\n  For example, `search -engine` matches records that contain \"search\" but not \"engine\"\nThis setting only has an effect if `advancedSyntax` is true.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "advancedSyntaxFeatures"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "advancedsyntaxfeatures_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "distinct",
    "displayName": "Distinct",
    "default": "",
    "options": [
      {
        "name": "Boolean",
        "value": "boolean"
      },
      {
        "name": "Integer",
        "value": "integer"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "distinct",
        "value": "={{ typeof $parameter.distinct_boolean !== \"undefined\" ? $parameter.distinct_boolean : typeof $parameter.distinct_number !== \"undefined\" ? $parameter.distinct_number : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "distinct"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether deduplication is turned on. If true, only one member of a group is shown in the search results.",
    "required": false,
    "displayName": "Distinct",
    "name": "distinct_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "distinct": [
          "boolean"
        ],
        "multiple_properties": [
          "distinct"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Number of members of a group of records to include in the search results.\n\n- Don't use `distinct > 1` for records that might be [promoted by rules](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/promote-hits/).\n  The number of hits won't be correct and faceting won't work as expected.\n- With `distinct > 1`, the `hitsPerPage` parameter controls the number of returned groups.\n  For example, with `hitsPerPage: 10` and `distinct: 2`, up to 20 records are returned.\n  Likewise, the `nbHits` response attribute contains the number of returned groups.\n",
    "required": false,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 4
    },
    "displayName": "Distinct",
    "name": "distinct_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "distinct": [
          "integer"
        ],
        "multiple_properties": [
          "distinct"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to replace a highlighted word with the matched synonym\nBy default, the original words are highlighted even if a synonym matches.\nFor example, with `home` as a synonym for `house` and a search for `home`,\nrecords matching either \"home\" or \"house\" are included in the search results,\nand either \"home\" or \"house\" are highlighted\nWith `replaceSynonymsInHighlight` set to `true`, a search for `home` still matches the same records,\nbut all occurrences of \"house\" are replaced by \"home\" in the highlighted response.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "replaceSynonymsInHighlight"
      }
    },
    "displayName": "Replace Synonyms In Highlight",
    "name": "replaceSynonymsInHighlight_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "replacesynonymsinhighlight_boolean"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 1,
    "description": "Minimum proximity score for two matching words\nThis adjusts the [Proximity ranking criterion](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#proximity)\nby equally scoring matches that are farther apart\nFor example, if `minProximity` is 2, neighboring matches and matches with one word between them would have the same score.\n",
    "required": false,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 7
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "minProximity"
      }
    },
    "displayName": "Min Proximity",
    "name": "minProximity_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "minproximity_number"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Response Fields",
    "name": "responseFields_json",
    "default": "[]",
    "description": "Properties to include in the API response of search and browse requests\nBy default, all response properties are included.\nTo reduce the response size, you can select which properties should be included\nAn empty list may lead to an empty API response (except properties you can't exclude)\nYou can't exclude these properties:\n`message`, `warning`, `cursor`, `abTestVariantID`,\nor any property added by setting `getRankingInfo` to true\nYour search depends on the `hits` field. If you omit this field, searches won't return any results.\nYour UI might also depend on other properties, for example, for pagination.\nBefore restricting the response size, check the impact on your search experience.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "responseFields"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "responsefields_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 100,
    "description": "Maximum number of facet values to return for each facet.",
    "required": false,
    "typeOptions": {
      "maxValue": 1000
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "maxValuesPerFacet"
      }
    },
    "displayName": "Max Values Per Facet",
    "name": "maxValuesPerFacet_number",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "maxvaluesperfacet_number"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "count",
    "description": "Order in which to retrieve facet values\n- `count`.\n  Facet values are retrieved by decreasing count.\n  The count is the number of matching records containing this facet value\n- `alpha`.\n  Retrieve facet values alphabetically\nThis setting doesn't influence how facet values are displayed in your UI (see `renderingContent`).\nFor more information, see [facet value display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/js/).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "sortFacetValuesBy"
      }
    },
    "displayName": "Sort Facet Values By",
    "name": "sortFacetValuesBy_string",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "sortfacetvaluesby_string"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether the best matching attribute should be determined by minimum proximity\nThis setting only affects ranking if the Attribute ranking criterion comes before Proximity in the `ranking` setting.\nIf true, the best matching attribute is selected based on the minimum proximity of multiple matches.\nOtherwise, the best matching attribute is determined by the order in the `searchableAttributes` setting.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "attributeCriteriaComputedByMinProximity"
      }
    },
    "displayName": "Attribute Criteria Computed By Min Proximity",
    "name": "attributeCriteriaComputedByMinProximity_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "attributecriteriacomputedbyminproximity_boolean"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "displayName": "Rendering Content",
    "name": "rendering_content_object",
    "type": "multiOptions",
    "description": "Extra data that can be used in the search UI.\n\nYou can use this to control aspects of your search UI, such as the order of facet names and values\nwithout changing your frontend code.\n",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Facet Ordering",
        "value": "facet_ordering_object_renderingContent"
      },
      {
        "name": "Redirect",
        "value": "redirect_object_renderingContent"
      },
      {
        "name": "Widgets",
        "value": "widgets_object_renderingContent"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "renderingContent",
        "value": "={{ { \"facetOrdering\": { \"facets\": { \"order\": typeof $parameter.order_json_facets_facetOrdering_renderingContent !== \"undefined\" ? JSON.parse($parameter.order_json_facets_facetOrdering_renderingContent) : undefined }, \"values\": typeof $parameter.values_object_facetOrdering_renderingContent !== \"undefined\" ? JSON.parse($parameter.values_object_facetOrdering_renderingContent) : undefined }, \"redirect\": { \"url\": typeof $parameter.url_string_redirect_renderingContent !== \"undefined\" ? $parameter.url_string_redirect_renderingContent : undefined }, \"widgets\": { \"banners\": typeof $parameter.banners_fixedCollection_widgets_renderingContent !== \"undefined\" ? JSON.parse($parameter.banners_fixedCollection_widgets_renderingContent) : undefined } } }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "rendering_content_object"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "displayName": "Facet Ordering",
    "name": "facet_ordering_object_renderingContent",
    "type": "multiOptions",
    "description": "Order of facet names and facet values in your UI.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Facets",
        "value": "facets_object_facetOrdering"
      },
      {
        "name": "Values",
        "value": "values_object_facetOrdering"
      }
    ],
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "facet_ordering_object_renderingContent"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "displayName": "Facets",
    "name": "facets_object_facetOrdering_renderingContent",
    "type": "multiOptions",
    "description": "Order of facet names.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Order",
        "value": "order_json_facets"
      }
    ],
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent": [
          "facets_object_facetOrdering"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Order",
    "name": "order_json_facets_facetOrdering_renderingContent",
    "default": "[]",
    "description": "Explicit order of facets or facet values.\n\nThis setting lets you always show specific facets or facet values at the top of the list.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent": [
          "facets_object_facetOrdering"
        ],
        "facets_object_facetOrdering_renderingContent": [
          "order_json_facets"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "displayName": "Values",
    "name": "values_object_facetOrdering_renderingContent",
    "type": "json",
    "description": "Order of facet values. One object for each facet.",
    "required": false,
    "default": "",
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent": [
          "values_object_facetOrdering"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "displayName": "Redirect",
    "name": "redirect_object_renderingContent",
    "type": "multiOptions",
    "description": "The redirect rule container.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Url",
        "value": "url_string_redirect"
      }
    ],
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "redirect_object_renderingContent"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Url",
    "name": "url_string_redirect_renderingContent",
    "default": "",
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "redirect_object_renderingContent"
        ],
        "redirect_object_renderingContent": [
          "url_string_redirect"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "displayName": "Widgets",
    "name": "widgets_object_renderingContent",
    "type": "multiOptions",
    "description": "Widgets returned from any rules that are applied to the current search.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Banners",
        "value": "banners_fixedCollection_widgets"
      }
    ],
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "widgets_object_renderingContent"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Banners",
    "name": "banners_fixedCollection_widgets_renderingContent",
    "default": "",
    "description": "Banners defined in the Merchandising Studio for a given search.",
    "required": false,
    "displayOptions": {
      "show": {
        "rendering_content_object": [
          "widgets_object_renderingContent"
        ],
        "widgets_object_renderingContent": [
          "banners_fixedCollection_widgets"
        ],
        "multiple_properties": [
          "rendering_content_object"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking/)\nThis setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "enableReRanking"
      }
    },
    "displayName": "Enable Re Ranking",
    "name": "enableReRanking_boolean",
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "enablereranking_boolean"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "reRankingApplyFilter",
    "displayName": "Re Ranking Apply Filter",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "reRankingApplyFilter",
        "value": "={{ typeof $parameter.reRankingApplyFilter_json !== \"undefined\" ? JSON.parse($parameter.reRankingApplyFilter_json) : typeof $parameter.reRankingApplyFilter_string !== \"undefined\" ? $parameter.reRankingApplyFilter_string : typeof $parameter.reRankingApplyFilter_null !== \"undefined\" ? JSON.parse($parameter.reRankingApplyFilter_null) : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties": [
          "rerankingapplyfilter"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Re Ranking Apply Filter",
    "name": "reRankingApplyFilter_json",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "reRankingApplyFilter": [
          "array"
        ],
        "multiple_properties": [
          "rerankingapplyfilter"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Re Ranking Apply Filter",
    "name": "reRankingApplyFilter_string",
    "default": "",
    "displayOptions": {
      "show": {
        "reRankingApplyFilter": [
          "string"
        ],
        "multiple_properties": [
          "rerankingapplyfilter"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "reRankingApplyFilter",
    "name": "reRankingApplyFilter_null",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "reRankingApplyFilter": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "reRankingApplyFilter": [
          "null"
        ],
        "multiple_properties": [
          "rerankingapplyfilter"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "setSettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "getSynonym"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "string",
    "placeholder": "synonymID",
    "required": true,
    "displayName": "Object ID",
    "name": "objectID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "getSynonym"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonym"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "string",
    "placeholder": "synonymID",
    "required": true,
    "displayName": "Object ID",
    "name": "objectID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonym"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "required": false,
    "displayName": "Forward To Replicas",
    "name": "forwardToReplicas_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonym"
        ]
      }
    }
  },
  {
    "displayName": "Multiple properties",
    "name": "multiple_properties_object",
    "type": "multiOptions",
    "description": "Synonym object.",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Object ID",
        "value": "objectID_string"
      },
      {
        "name": "Type",
        "value": "type_options"
      },
      {
        "name": "Synonyms",
        "value": "synonyms_json"
      },
      {
        "name": "Input",
        "value": "input_string"
      },
      {
        "name": "Word",
        "value": "word_string"
      },
      {
        "name": "Corrections",
        "value": "corrections_json"
      },
      {
        "name": "Placeholder",
        "value": "placeholder_string"
      },
      {
        "name": "Replacements",
        "value": "replacements_json"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonym"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "synonymID",
    "description": "Unique identifier of a synonym object.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "objectID"
      }
    },
    "displayName": "Object ID",
    "name": "objectID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "objectID_string"
        ],
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonym"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "onewaysynonym",
    "description": "Synonym type.",
    "required": false,
    "options": [
      {
        "name": "synonym",
        "value": "synonym"
      },
      {
        "name": "onewaysynonym",
        "value": "onewaysynonym"
      },
      {
        "name": "altcorrection1",
        "value": "altcorrection1"
      },
      {
        "name": "altcorrection2",
        "value": "altcorrection2"
      },
      {
        "name": "placeholder",
        "value": "placeholder"
      },
      {
        "name": "oneWaySynonym",
        "value": "oneWaySynonym"
      },
      {
        "name": "altCorrection1",
        "value": "altCorrection1"
      },
      {
        "name": "altCorrection2",
        "value": "altCorrection2"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "type"
      }
    },
    "displayName": "Type",
    "name": "type_options",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "type_options"
        ],
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonym"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Synonyms",
    "name": "synonyms_json",
    "default": "[]",
    "description": "Words or phrases considered equivalent.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "synonyms"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "synonyms_json"
        ],
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonym"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "car",
    "description": "Word or phrase to appear in query strings (for [`onewaysynonym`s](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/one-way-synonyms/)).",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "input"
      }
    },
    "displayName": "Input",
    "name": "input_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "input_string"
        ],
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonym"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "car",
    "description": "Word or phrase to appear in query strings (for [`altcorrection1` and `altcorrection2`](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-alternative-corrections/)).",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "word"
      }
    },
    "displayName": "Word",
    "name": "word_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "word_string"
        ],
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonym"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Corrections",
    "name": "corrections_json",
    "default": "[]",
    "description": "Words to be matched in records.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "corrections"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "corrections_json"
        ],
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonym"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "<Street>",
    "description": "[Placeholder token](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-placeholders/) to be put inside records.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "placeholder"
      }
    },
    "displayName": "Placeholder",
    "name": "placeholder_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "placeholder_string"
        ],
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonym"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Replacements",
    "name": "replacements_json",
    "default": "[]",
    "description": "Query words that will match the [placeholder token](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-placeholders/).",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "replacements"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "replacements_json"
        ],
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonym"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "deleteSynonym"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "string",
    "placeholder": "synonymID",
    "required": true,
    "displayName": "Object ID",
    "name": "objectID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "deleteSynonym"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "required": false,
    "displayName": "Forward To Replicas",
    "name": "forwardToReplicas_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "deleteSynonym"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonyms"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "boolean",
    "required": false,
    "displayName": "Forward To Replicas",
    "name": "forwardToReplicas_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonyms"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "required": false,
    "displayName": "Replace Existing Synonyms",
    "name": "replaceExistingSynonyms_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonyms"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Fixed Collection",
    "name": "undefined_fixedCollection",
    "default": "",
    "description": "Matching synonyms.",
    "required": false,
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "saveSynonyms"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "clearSynonyms"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "boolean",
    "required": false,
    "displayName": "Forward To Replicas",
    "name": "forwardToReplicas_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "clearSynonyms"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "searchSynonyms"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "displayName": "Search Synonyms Params",
    "name": "search_synonyms_params_object",
    "type": "multiOptions",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Query",
        "value": "query_string"
      },
      {
        "name": "Type",
        "value": "type_options"
      },
      {
        "name": "Page",
        "value": "page_number"
      },
      {
        "name": "Hits Per Page",
        "value": "hitsPerPage_number"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "searchSynonyms"
        ]
      }
    }
  },
  {
    "type": "string",
    "description": "Search query.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "query"
      }
    },
    "displayName": "Query",
    "name": "query_string",
    "default": "",
    "displayOptions": {
      "show": {
        "search_synonyms_params_object": [
          "query_string"
        ],
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "searchSynonyms"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "onewaysynonym",
    "description": "Synonym type.",
    "required": false,
    "options": [
      {
        "name": "synonym",
        "value": "synonym"
      },
      {
        "name": "onewaysynonym",
        "value": "onewaysynonym"
      },
      {
        "name": "altcorrection1",
        "value": "altcorrection1"
      },
      {
        "name": "altcorrection2",
        "value": "altcorrection2"
      },
      {
        "name": "placeholder",
        "value": "placeholder"
      },
      {
        "name": "oneWaySynonym",
        "value": "oneWaySynonym"
      },
      {
        "name": "altCorrection1",
        "value": "altCorrection1"
      },
      {
        "name": "altCorrection2",
        "value": "altCorrection2"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "type"
      }
    },
    "displayName": "Type",
    "name": "type_options",
    "default": "",
    "displayOptions": {
      "show": {
        "search_synonyms_params_object": [
          "type_options"
        ],
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "searchSynonyms"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Page of search results to retrieve.",
    "required": false,
    "typeOptions": {
      "minValue": 0
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "page"
      }
    },
    "displayName": "Page",
    "name": "page_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "search_synonyms_params_object": [
          "page_number"
        ],
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "searchSynonyms"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 20,
    "description": "Number of hits per page.",
    "required": false,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 1000
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "hitsPerPage"
      }
    },
    "displayName": "Hits Per Page",
    "name": "hitsPerPage_number",
    "displayOptions": {
      "show": {
        "search_synonyms_params_object": [
          "hitsPerPage_number"
        ],
        "resource": [
          "Synonyms"
        ],
        "operation": [
          "searchSynonyms"
        ]
      }
    }
  },
  {
    "displayName": "Multiple properties",
    "name": "multiple_properties_object",
    "type": "multiOptions",
    "description": "API key object.",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Acl",
        "value": "acl_json"
      },
      {
        "name": "Description",
        "value": "description_string"
      },
      {
        "name": "Indexes",
        "value": "indexes_json"
      },
      {
        "name": "Max Hits Per Query",
        "value": "maxHitsPerQuery_number"
      },
      {
        "name": "Max Queries Per IPPer Hour",
        "value": "maxQueriesPerIPPerHour_number"
      },
      {
        "name": "Query Parameters",
        "value": "queryParameters_string"
      },
      {
        "name": "Referers",
        "value": "referers_json"
      },
      {
        "name": "Validity",
        "value": "validity_number"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "addApiKey"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Acl",
    "name": "acl_json",
    "default": "[]",
    "description": "Permissions that determine the type of API requests this key can make.\nThe required ACL is listed in each endpoint's reference.\nFor more information, see [access control list](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "acl"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "acl_json"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "addApiKey"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "Used for indexing by the CLI",
    "description": "Description of an API key to help you identify this API key.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "description"
      }
    },
    "displayName": "Description",
    "name": "description_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "description_string"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "addApiKey"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Indexes",
    "name": "indexes_json",
    "default": "[]",
    "description": "Index names or patterns that this API key can access.\nBy default, an API key can access all indices in the same application.\n\nYou can use leading and trailing wildcard characters (`*`):\n\n- `dev_*` matches all indices starting with \"dev_\".\n- `*_dev` matches all indices ending with \"_dev\".\n- `*_products_*` matches all indices containing \"_products_\".\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "indexes"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "indexes_json"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "addApiKey"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Maximum number of results this API key can retrieve in one query.\nBy default, there's no limit.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "maxHitsPerQuery"
      }
    },
    "displayName": "Max Hits Per Query",
    "name": "maxHitsPerQuery_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "maxHitsPerQuery_number"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "addApiKey"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Maximum number of API requests allowed per IP address or [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken/) per hour.\n\nIf this limit is reached, the API returns an error with status code `429`.\nBy default, there's no limit.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "maxQueriesPerIPPerHour"
      }
    },
    "displayName": "Max Queries Per IPPer Hour",
    "name": "maxQueriesPerIPPerHour_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "maxQueriesPerIPPerHour_number"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "addApiKey"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "typoTolerance=strict&restrictSources=192.168.1.0/24",
    "description": "Query parameters to add when making API requests with this API key.\n\nTo restrict this API key to specific IP addresses, add the `restrictSources` parameter.\nYou can only add a single source, but you can provide a range of IP addresses.\n\nCreating an API key fails if the request is made from an IP address outside the restricted range.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "queryParameters"
      }
    },
    "displayName": "Query Parameters",
    "name": "queryParameters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "queryParameters_string"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "addApiKey"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Referers",
    "name": "referers_json",
    "default": "[]",
    "description": "Allowed HTTP referrers for this API key.\n\nBy default, all referrers are allowed.\nYou can use leading and trailing wildcard characters (`*`):\n\n- `https://algolia.com/*` allows all referrers starting with \"https://algolia.com/\"\n- `*.algolia.com` allows all referrers ending with \".algolia.com\"\n- `*algolia.com*` allows all referrers in the domain \"algolia.com\".\n\nLike all HTTP headers, referrers can be spoofed. Don't rely on them to secure your data.\nFor more information, see [HTTP referrer restrictions](https://www.algolia.com/doc/guides/security/security-best-practices/#http-referrers-restrictions).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "referers"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "referers_json"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "addApiKey"
        ]
      }
    }
  },
  {
    "type": "number",
    "placeholder": "86400",
    "description": "Duration (in seconds) after which the API key expires.\nBy default, API keys don't expire.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "validity"
      }
    },
    "displayName": "Validity",
    "name": "validity_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "validity_number"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "addApiKey"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "ALGOLIA_API_KEY",
    "required": true,
    "displayName": "Key",
    "name": "key_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "getApiKey"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "ALGOLIA_API_KEY",
    "required": true,
    "displayName": "Key",
    "name": "key_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "updateApiKey"
        ]
      }
    }
  },
  {
    "displayName": "Multiple properties",
    "name": "multiple_properties_object",
    "type": "multiOptions",
    "description": "API key object.",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Acl",
        "value": "acl_json"
      },
      {
        "name": "Description",
        "value": "description_string"
      },
      {
        "name": "Indexes",
        "value": "indexes_json"
      },
      {
        "name": "Max Hits Per Query",
        "value": "maxHitsPerQuery_number"
      },
      {
        "name": "Max Queries Per IPPer Hour",
        "value": "maxQueriesPerIPPerHour_number"
      },
      {
        "name": "Query Parameters",
        "value": "queryParameters_string"
      },
      {
        "name": "Referers",
        "value": "referers_json"
      },
      {
        "name": "Validity",
        "value": "validity_number"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "updateApiKey"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Acl",
    "name": "acl_json",
    "default": "[]",
    "description": "Permissions that determine the type of API requests this key can make.\nThe required ACL is listed in each endpoint's reference.\nFor more information, see [access control list](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "acl"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "acl_json"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "updateApiKey"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "Used for indexing by the CLI",
    "description": "Description of an API key to help you identify this API key.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "description"
      }
    },
    "displayName": "Description",
    "name": "description_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "description_string"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "updateApiKey"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Indexes",
    "name": "indexes_json",
    "default": "[]",
    "description": "Index names or patterns that this API key can access.\nBy default, an API key can access all indices in the same application.\n\nYou can use leading and trailing wildcard characters (`*`):\n\n- `dev_*` matches all indices starting with \"dev_\".\n- `*_dev` matches all indices ending with \"_dev\".\n- `*_products_*` matches all indices containing \"_products_\".\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "indexes"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "indexes_json"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "updateApiKey"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Maximum number of results this API key can retrieve in one query.\nBy default, there's no limit.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "maxHitsPerQuery"
      }
    },
    "displayName": "Max Hits Per Query",
    "name": "maxHitsPerQuery_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "maxHitsPerQuery_number"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "updateApiKey"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Maximum number of API requests allowed per IP address or [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken/) per hour.\n\nIf this limit is reached, the API returns an error with status code `429`.\nBy default, there's no limit.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "maxQueriesPerIPPerHour"
      }
    },
    "displayName": "Max Queries Per IPPer Hour",
    "name": "maxQueriesPerIPPerHour_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "maxQueriesPerIPPerHour_number"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "updateApiKey"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "typoTolerance=strict&restrictSources=192.168.1.0/24",
    "description": "Query parameters to add when making API requests with this API key.\n\nTo restrict this API key to specific IP addresses, add the `restrictSources` parameter.\nYou can only add a single source, but you can provide a range of IP addresses.\n\nCreating an API key fails if the request is made from an IP address outside the restricted range.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "queryParameters"
      }
    },
    "displayName": "Query Parameters",
    "name": "queryParameters_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "queryParameters_string"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "updateApiKey"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Referers",
    "name": "referers_json",
    "default": "[]",
    "description": "Allowed HTTP referrers for this API key.\n\nBy default, all referrers are allowed.\nYou can use leading and trailing wildcard characters (`*`):\n\n- `https://algolia.com/*` allows all referrers starting with \"https://algolia.com/\"\n- `*.algolia.com` allows all referrers ending with \".algolia.com\"\n- `*algolia.com*` allows all referrers in the domain \"algolia.com\".\n\nLike all HTTP headers, referrers can be spoofed. Don't rely on them to secure your data.\nFor more information, see [HTTP referrer restrictions](https://www.algolia.com/doc/guides/security/security-best-practices/#http-referrers-restrictions).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "referers"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "referers_json"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "updateApiKey"
        ]
      }
    }
  },
  {
    "type": "number",
    "placeholder": "86400",
    "description": "Duration (in seconds) after which the API key expires.\nBy default, API keys don't expire.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "validity"
      }
    },
    "displayName": "Validity",
    "name": "validity_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "validity_number"
        ],
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "updateApiKey"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "ALGOLIA_API_KEY",
    "required": true,
    "displayName": "Key",
    "name": "key_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "deleteApiKey"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "ALGOLIA_API_KEY",
    "required": true,
    "displayName": "Key",
    "name": "key_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Api Keys"
        ],
        "operation": [
          "restoreApiKey"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "getRule"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "string",
    "description": "Unique identifier of a rule object.",
    "required": true,
    "displayName": "Object ID",
    "name": "objectID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "getRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "string",
    "description": "Unique identifier of a rule object.",
    "required": true,
    "displayName": "Object ID",
    "name": "objectID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "required": false,
    "displayName": "Forward To Replicas",
    "name": "forwardToReplicas_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Multiple properties",
    "name": "multiple_properties_object",
    "type": "multiOptions",
    "description": "Rule object.",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Object ID",
        "value": "objectID_string"
      },
      {
        "name": "Conditions",
        "value": "conditions_fixedCollection"
      },
      {
        "name": "Consequence",
        "value": "consequence_object"
      },
      {
        "name": "Description",
        "value": "description_string"
      },
      {
        "name": "Enabled",
        "value": "enabled_boolean"
      },
      {
        "name": "Validity",
        "value": "validity_fixedCollection"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "description": "Unique identifier of a rule object.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "objectID"
      }
    },
    "displayName": "Object ID",
    "name": "objectID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "objectID_string"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Conditions",
    "name": "conditions_fixedCollection",
    "default": "",
    "description": "Conditions that trigger a rule.\n\nSome consequences require specific conditions or don't require any condition.\nFor more information, see [Conditions](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#conditions).\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "conditions"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "conditions_fixedCollection"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Consequence",
    "name": "consequence_object",
    "type": "multiOptions",
    "description": "Effect of the rule.\n\nFor more information, see [Consequences](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#consequences).\n",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Params",
        "value": "params_consequence"
      },
      {
        "name": "Filter Promotes",
        "value": "filterPromotes_boolean_consequence"
      },
      {
        "name": "Hide",
        "value": "hide_fixedCollection_consequence"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "consequence",
        "value": "={{ { \"similarQuery\": typeof $parameter.similarQuery_string_params_consequence !== \"undefined\" ? $parameter.similarQuery_string_params_consequence : undefined, \"filters\": typeof $parameter.filters_string_params_consequence !== \"undefined\" ? $parameter.filters_string_params_consequence : undefined, \"facetFilters\": typeof $parameter.facetFilters_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.facetFilters_json_params_consequence) : typeof $parameter.facetFilters_string_params_consequence !== \"undefined\" ? $parameter.facetFilters_string_params_consequence : undefined, \"optionalFilters\": typeof $parameter.optionalFilters_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.optionalFilters_json_params_consequence) : typeof $parameter.optionalFilters_string_params_consequence !== \"undefined\" ? $parameter.optionalFilters_string_params_consequence : undefined, \"numericFilters\": typeof $parameter.numericFilters_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.numericFilters_json_params_consequence) : typeof $parameter.numericFilters_string_params_consequence !== \"undefined\" ? $parameter.numericFilters_string_params_consequence : undefined, \"tagFilters\": typeof $parameter.tagFilters_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.tagFilters_json_params_consequence) : typeof $parameter.tagFilters_string_params_consequence !== \"undefined\" ? $parameter.tagFilters_string_params_consequence : undefined, \"sumOrFiltersScores\": typeof $parameter.sumOrFiltersScores_boolean_params_consequence !== \"undefined\" ? $parameter.sumOrFiltersScores_boolean_params_consequence : undefined, \"restrictSearchableAttributes\": typeof $parameter.restrictSearchableAttributes_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.restrictSearchableAttributes_json_params_consequence) : undefined, \"facets\": typeof $parameter.facets_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.facets_json_params_consequence) : undefined, \"facetingAfterDistinct\": typeof $parameter.facetingAfterDistinct_boolean_params_consequence !== \"undefined\" ? $parameter.facetingAfterDistinct_boolean_params_consequence : undefined, \"page\": typeof $parameter.page_number_params_consequence !== \"undefined\" ? $parameter.page_number_params_consequence : undefined, \"offset\": typeof $parameter.offset_number_params_consequence !== \"undefined\" ? $parameter.offset_number_params_consequence : undefined, \"length\": typeof $parameter.length_number_params_consequence !== \"undefined\" ? $parameter.length_number_params_consequence : undefined, \"aroundLatLng\": typeof $parameter.aroundLatLng_string_params_consequence !== \"undefined\" ? $parameter.aroundLatLng_string_params_consequence : undefined, \"aroundLatLngViaIP\": typeof $parameter.aroundLatLngViaIP_boolean_params_consequence !== \"undefined\" ? $parameter.aroundLatLngViaIP_boolean_params_consequence : undefined, \"aroundRadius\": typeof $parameter.aroundRadius_number_params_consequence !== \"undefined\" ? $parameter.aroundRadius_number_params_consequence : typeof $parameter.aroundRadius_options_params_consequence !== \"undefined\" ? $parameter.aroundRadius_options_params_consequence : undefined, \"aroundPrecision\": typeof $parameter.aroundPrecision_number_params_consequence !== \"undefined\" ? $parameter.aroundPrecision_number_params_consequence : typeof $parameter.aroundPrecision_fixedCollection_params_consequence.aroundPrecision_fixedCollection_values !== \"undefined\" ? $parameter.aroundPrecision_fixedCollection_params_consequence.aroundPrecision_fixedCollection_values?.map(item => ({ from: typeof item.from_number_aroundPrecision !== \"undefined\" ? item.from_number_aroundPrecision : undefined, value: typeof item.value_number_aroundPrecision !== \"undefined\" ? item.value_number_aroundPrecision : undefined })) : undefined, \"minimumAroundRadius\": typeof $parameter.minimumAroundRadius_number_params_consequence !== \"undefined\" ? $parameter.minimumAroundRadius_number_params_consequence : undefined, \"insideBoundingBox\": typeof $parameter.insideBoundingBox_string_params_consequence !== \"undefined\" ? $parameter.insideBoundingBox_string_params_consequence : typeof $parameter.insideBoundingBox_null_params_consequence !== \"undefined\" ? JSON.parse($parameter.insideBoundingBox_null_params_consequence) : typeof $parameter.insideBoundingBox_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.insideBoundingBox_json_params_consequence) : undefined, \"insidePolygon\": typeof $parameter.insidePolygon_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.insidePolygon_json_params_consequence) : undefined, \"naturalLanguages\": typeof $parameter.naturalLanguages_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.naturalLanguages_json_params_consequence) : undefined, \"ruleContexts\": typeof $parameter.ruleContexts_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.ruleContexts_json_params_consequence) : undefined, \"personalizationImpact\": typeof $parameter.personalizationImpact_number_params_consequence !== \"undefined\" ? $parameter.personalizationImpact_number_params_consequence : undefined, \"userToken\": typeof $parameter.userToken_string_params_consequence !== \"undefined\" ? $parameter.userToken_string_params_consequence : undefined, \"getRankingInfo\": typeof $parameter.getRankingInfo_boolean_params_consequence !== \"undefined\" ? $parameter.getRankingInfo_boolean_params_consequence : undefined, \"synonyms\": typeof $parameter.synonyms_boolean_params_consequence !== \"undefined\" ? $parameter.synonyms_boolean_params_consequence : undefined, \"clickAnalytics\": typeof $parameter.clickAnalytics_boolean_params_consequence !== \"undefined\" ? $parameter.clickAnalytics_boolean_params_consequence : undefined, \"analytics\": typeof $parameter.analytics_boolean_params_consequence !== \"undefined\" ? $parameter.analytics_boolean_params_consequence : undefined, \"analyticsTags\": typeof $parameter.analyticsTags_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.analyticsTags_json_params_consequence) : undefined, \"percentileComputation\": typeof $parameter.percentileComputation_boolean_params_consequence !== \"undefined\" ? $parameter.percentileComputation_boolean_params_consequence : undefined, \"enableABTest\": typeof $parameter.enableABTest_boolean_params_consequence !== \"undefined\" ? $parameter.enableABTest_boolean_params_consequence : undefined, \"attributesToRetrieve\": typeof $parameter.attributesToRetrieve_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.attributesToRetrieve_json_params_consequence) : undefined, \"ranking\": typeof $parameter.ranking_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.ranking_json_params_consequence) : undefined, \"relevancyStrictness\": typeof $parameter.relevancyStrictness_number_params_consequence !== \"undefined\" ? $parameter.relevancyStrictness_number_params_consequence : undefined, \"attributesToHighlight\": typeof $parameter.attributesToHighlight_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.attributesToHighlight_json_params_consequence) : undefined, \"attributesToSnippet\": typeof $parameter.attributesToSnippet_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.attributesToSnippet_json_params_consequence) : undefined, \"highlightPreTag\": typeof $parameter.highlightPreTag_string_params_consequence !== \"undefined\" ? $parameter.highlightPreTag_string_params_consequence : undefined, \"highlightPostTag\": typeof $parameter.highlightPostTag_string_params_consequence !== \"undefined\" ? $parameter.highlightPostTag_string_params_consequence : undefined, \"snippetEllipsisText\": typeof $parameter.snippetEllipsisText_string_params_consequence !== \"undefined\" ? $parameter.snippetEllipsisText_string_params_consequence : undefined, \"restrictHighlightAndSnippetArrays\": typeof $parameter.restrictHighlightAndSnippetArrays_boolean_params_consequence !== \"undefined\" ? $parameter.restrictHighlightAndSnippetArrays_boolean_params_consequence : undefined, \"hitsPerPage\": typeof $parameter.hitsPerPage_number_params_consequence !== \"undefined\" ? $parameter.hitsPerPage_number_params_consequence : undefined, \"minWordSizefor1Typo\": typeof $parameter.minWordSizefor1Typo_number_params_consequence !== \"undefined\" ? $parameter.minWordSizefor1Typo_number_params_consequence : undefined, \"minWordSizefor2Typos\": typeof $parameter.minWordSizefor2Typos_number_params_consequence !== \"undefined\" ? $parameter.minWordSizefor2Typos_number_params_consequence : undefined, \"typoTolerance\": typeof $parameter.typoTolerance_boolean_params_consequence !== \"undefined\" ? $parameter.typoTolerance_boolean_params_consequence : typeof $parameter.typoTolerance_options_params_consequence !== \"undefined\" ? $parameter.typoTolerance_options_params_consequence : undefined, \"allowTyposOnNumericTokens\": typeof $parameter.allowTyposOnNumericTokens_boolean_params_consequence !== \"undefined\" ? $parameter.allowTyposOnNumericTokens_boolean_params_consequence : undefined, \"disableTypoToleranceOnAttributes\": typeof $parameter.disableTypoToleranceOnAttributes_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.disableTypoToleranceOnAttributes_json_params_consequence) : undefined, \"ignorePlurals\": typeof $parameter.ignorePlurals_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.ignorePlurals_json_params_consequence) : typeof $parameter.ignorePlurals_options_params_consequence !== \"undefined\" ? $parameter.ignorePlurals_options_params_consequence : typeof $parameter.ignorePlurals_boolean_params_consequence !== \"undefined\" ? $parameter.ignorePlurals_boolean_params_consequence : undefined, \"removeStopWords\": typeof $parameter.removeStopWords_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.removeStopWords_json_params_consequence) : typeof $parameter.removeStopWords_boolean_params_consequence !== \"undefined\" ? $parameter.removeStopWords_boolean_params_consequence : undefined, \"queryLanguages\": typeof $parameter.queryLanguages_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.queryLanguages_json_params_consequence) : undefined, \"decompoundQuery\": typeof $parameter.decompoundQuery_boolean_params_consequence !== \"undefined\" ? $parameter.decompoundQuery_boolean_params_consequence : undefined, \"enableRules\": typeof $parameter.enableRules_boolean_params_consequence !== \"undefined\" ? $parameter.enableRules_boolean_params_consequence : undefined, \"enablePersonalization\": typeof $parameter.enablePersonalization_boolean_params_consequence !== \"undefined\" ? $parameter.enablePersonalization_boolean_params_consequence : undefined, \"queryType\": typeof $parameter.queryType_options_params_consequence !== \"undefined\" ? $parameter.queryType_options_params_consequence : undefined, \"removeWordsIfNoResults\": typeof $parameter.removeWordsIfNoResults_options_params_consequence !== \"undefined\" ? $parameter.removeWordsIfNoResults_options_params_consequence : undefined, \"mode\": typeof $parameter.mode_options_params_consequence !== \"undefined\" ? $parameter.mode_options_params_consequence : undefined, \"semanticSearch\": { \"eventSources\": typeof $parameter.eventSources_json_semanticSearch_params_consequence !== \"undefined\" ? JSON.parse($parameter.eventSources_json_semanticSearch_params_consequence) : typeof $parameter.eventSources_null_semanticSearch_params_consequence !== \"undefined\" ? JSON.parse($parameter.eventSources_null_semanticSearch_params_consequence) : undefined }, \"advancedSyntax\": typeof $parameter.advancedSyntax_boolean_params_consequence !== \"undefined\" ? $parameter.advancedSyntax_boolean_params_consequence : undefined, \"optionalWords\": typeof $parameter.optionalWords_string_params_consequence !== \"undefined\" ? $parameter.optionalWords_string_params_consequence : typeof $parameter.optionalWords_null_params_consequence !== \"undefined\" ? JSON.parse($parameter.optionalWords_null_params_consequence) : typeof $parameter.optionalWords_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.optionalWords_json_params_consequence) : undefined, \"disableExactOnAttributes\": typeof $parameter.disableExactOnAttributes_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.disableExactOnAttributes_json_params_consequence) : undefined, \"exactOnSingleWordQuery\": typeof $parameter.exactOnSingleWordQuery_options_params_consequence !== \"undefined\" ? $parameter.exactOnSingleWordQuery_options_params_consequence : undefined, \"alternativesAsExact\": typeof $parameter.alternativesAsExact_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.alternativesAsExact_json_params_consequence) : undefined, \"advancedSyntaxFeatures\": typeof $parameter.advancedSyntaxFeatures_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.advancedSyntaxFeatures_json_params_consequence) : undefined, \"distinct\": typeof $parameter.distinct_boolean_params_consequence !== \"undefined\" ? $parameter.distinct_boolean_params_consequence : typeof $parameter.distinct_number_params_consequence !== \"undefined\" ? $parameter.distinct_number_params_consequence : undefined, \"replaceSynonymsInHighlight\": typeof $parameter.replaceSynonymsInHighlight_boolean_params_consequence !== \"undefined\" ? $parameter.replaceSynonymsInHighlight_boolean_params_consequence : undefined, \"minProximity\": typeof $parameter.minProximity_number_params_consequence !== \"undefined\" ? $parameter.minProximity_number_params_consequence : undefined, \"responseFields\": typeof $parameter.responseFields_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.responseFields_json_params_consequence) : undefined, \"maxValuesPerFacet\": typeof $parameter.maxValuesPerFacet_number_params_consequence !== \"undefined\" ? $parameter.maxValuesPerFacet_number_params_consequence : undefined, \"sortFacetValuesBy\": typeof $parameter.sortFacetValuesBy_string_params_consequence !== \"undefined\" ? $parameter.sortFacetValuesBy_string_params_consequence : undefined, \"attributeCriteriaComputedByMinProximity\": typeof $parameter.attributeCriteriaComputedByMinProximity_boolean_params_consequence !== \"undefined\" ? $parameter.attributeCriteriaComputedByMinProximity_boolean_params_consequence : undefined, \"renderingContent\": {  }, \"enableReRanking\": typeof $parameter.enableReRanking_boolean_params_consequence !== \"undefined\" ? $parameter.enableReRanking_boolean_params_consequence : undefined, \"reRankingApplyFilter\": typeof $parameter.reRankingApplyFilter_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.reRankingApplyFilter_json_params_consequence) : typeof $parameter.reRankingApplyFilter_string_params_consequence !== \"undefined\" ? $parameter.reRankingApplyFilter_string_params_consequence : typeof $parameter.reRankingApplyFilter_null_params_consequence !== \"undefined\" ? JSON.parse($parameter.reRankingApplyFilter_null_params_consequence) : undefined, \"query\": typeof $parameter.query_object_params_consequence !== \"undefined\" ? { \"remove\": typeof $parameter.remove_json_query_params_consequence !== \"undefined\" ? JSON.parse($parameter.remove_json_query_params_consequence) : undefined, \"edits\": typeof $parameter.edits_fixedCollection_query_params_consequence !== \"undefined\" ? JSON.parse($parameter.edits_fixedCollection_query_params_consequence) : undefined } : typeof $parameter.remove_json_query_params_consequence !== \"undefined\" ? JSON.parse($parameter.remove_json_query_params_consequence) : typeof $parameter.edits_fixedCollection_query_params_consequence !== \"undefined\" ? JSON.parse($parameter.edits_fixedCollection_query_params_consequence) : typeof $parameter.query_string_params_consequence !== \"undefined\" ? $parameter.query_string_params_consequence : undefined, \"automaticFacetFilters\": typeof $parameter.automaticFacetFilters_fixedCollection_params_consequence.automaticFacetFilters_fixedCollection_values !== \"undefined\" ? $parameter.automaticFacetFilters_fixedCollection_params_consequence.automaticFacetFilters_fixedCollection_values?.map(item => ({ facet: typeof item.facet_string_automaticFacetFilters !== \"undefined\" ? item.facet_string_automaticFacetFilters : undefined, score: typeof item.score_number_automaticFacetFilters !== \"undefined\" ? item.score_number_automaticFacetFilters : undefined, disjunctive: typeof item.disjunctive_boolean_automaticFacetFilters !== \"undefined\" ? item.disjunctive_boolean_automaticFacetFilters : undefined })) : typeof $parameter.automaticFacetFilters_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.automaticFacetFilters_json_params_consequence) : undefined, \"automaticOptionalFacetFilters\": typeof $parameter.automaticOptionalFacetFilters_fixedCollection_params_consequence.automaticOptionalFacetFilters_fixedCollection_values !== \"undefined\" ? $parameter.automaticOptionalFacetFilters_fixedCollection_params_consequence.automaticOptionalFacetFilters_fixedCollection_values?.map(item => ({ facet: typeof item.facet_string_automaticOptionalFacetFilters !== \"undefined\" ? item.facet_string_automaticOptionalFacetFilters : undefined, score: typeof item.score_number_automaticOptionalFacetFilters !== \"undefined\" ? item.score_number_automaticOptionalFacetFilters : undefined, disjunctive: typeof item.disjunctive_boolean_automaticOptionalFacetFilters !== \"undefined\" ? item.disjunctive_boolean_automaticOptionalFacetFilters : undefined })) : typeof $parameter.automaticOptionalFacetFilters_json_params_consequence !== \"undefined\" ? JSON.parse($parameter.automaticOptionalFacetFilters_json_params_consequence) : undefined, \"renderingContent\": {  }, \"filterPromotes\": typeof $parameter.filterPromotes_boolean_consequence !== \"undefined\" ? $parameter.filterPromotes_boolean_consequence : undefined, \"hide\": $parameter.hide_fixedCollection_consequence.hide_fixedCollection_values?.map(item => ({ objectID: typeof item.objectID_string_hide !== \"undefined\" ? item.objectID_string_hide : undefined })) } }}"
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "multiOptions",
    "name": "params_consequence",
    "displayName": "Params",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Similar Query",
        "value": "similarquery_string_params"
      },
      {
        "name": "Filters",
        "value": "filters_string_params"
      },
      {
        "name": "Facet Filters params",
        "value": "facetfilters_params"
      },
      {
        "name": "Optional Filters params",
        "value": "optionalfilters_params"
      },
      {
        "name": "Numeric Filters params",
        "value": "numericfilters_params"
      },
      {
        "name": "Tag Filters params",
        "value": "tagfilters_params"
      },
      {
        "name": "Sum Or Filters Scores",
        "value": "sumorfiltersscores_boolean_params"
      },
      {
        "name": "Restrict Searchable Attributes",
        "value": "restrictsearchableattributes_json_params"
      },
      {
        "name": "Facets",
        "value": "facets_json_params"
      },
      {
        "name": "Faceting After Distinct",
        "value": "facetingafterdistinct_boolean_params"
      },
      {
        "name": "Page",
        "value": "page_number_params"
      },
      {
        "name": "Offset",
        "value": "offset_number_params"
      },
      {
        "name": "Length",
        "value": "length_number_params"
      },
      {
        "name": "Around Lat Lng",
        "value": "aroundlatlng_string_params"
      },
      {
        "name": "Around Lat Lng Via IP",
        "value": "aroundlatlngviaip_boolean_params"
      },
      {
        "name": "Around Radius params",
        "value": "aroundradius_params"
      },
      {
        "name": "Around Precision params",
        "value": "aroundprecision_params"
      },
      {
        "name": "Minimum Around Radius",
        "value": "minimumaroundradius_number_params"
      },
      {
        "name": "Inside Bounding Box params",
        "value": "insideboundingbox_params"
      },
      {
        "name": "Inside Polygon",
        "value": "insidepolygon_json_params"
      },
      {
        "name": "Natural Languages",
        "value": "naturallanguages_json_params"
      },
      {
        "name": "Rule Contexts",
        "value": "rulecontexts_json_params"
      },
      {
        "name": "Personalization Impact",
        "value": "personalizationimpact_number_params"
      },
      {
        "name": "User Token",
        "value": "usertoken_string_params"
      },
      {
        "name": "Get Ranking Info",
        "value": "getrankinginfo_boolean_params"
      },
      {
        "name": "Synonyms",
        "value": "synonyms_boolean_params"
      },
      {
        "name": "Click Analytics",
        "value": "clickanalytics_boolean_params"
      },
      {
        "name": "Analytics",
        "value": "analytics_boolean_params"
      },
      {
        "name": "Analytics Tags",
        "value": "analyticstags_json_params"
      },
      {
        "name": "Percentile Computation",
        "value": "percentilecomputation_boolean_params"
      },
      {
        "name": "Enable ABTest",
        "value": "enableabtest_boolean_params"
      },
      {
        "name": "Attributes To Retrieve",
        "value": "attributestoretrieve_json_params"
      },
      {
        "name": "Ranking",
        "value": "ranking_json_params"
      },
      {
        "name": "Relevancy Strictness",
        "value": "relevancystrictness_number_params"
      },
      {
        "name": "Attributes To Highlight",
        "value": "attributestohighlight_json_params"
      },
      {
        "name": "Attributes To Snippet",
        "value": "attributestosnippet_json_params"
      },
      {
        "name": "Highlight Pre Tag",
        "value": "highlightpretag_string_params"
      },
      {
        "name": "Highlight Post Tag",
        "value": "highlightposttag_string_params"
      },
      {
        "name": "Snippet Ellipsis Text",
        "value": "snippetellipsistext_string_params"
      },
      {
        "name": "Restrict Highlight And Snippet Arrays",
        "value": "restricthighlightandsnippetarrays_boolean_params"
      },
      {
        "name": "Hits Per Page",
        "value": "hitsperpage_number_params"
      },
      {
        "name": "Min Word Sizefor1Typo",
        "value": "minwordsizefor1typo_number_params"
      },
      {
        "name": "Min Word Sizefor2Typos",
        "value": "minwordsizefor2typos_number_params"
      },
      {
        "name": "Typo Tolerance params",
        "value": "typotolerance_params"
      },
      {
        "name": "Allow Typos On Numeric Tokens",
        "value": "allowtyposonnumerictokens_boolean_params"
      },
      {
        "name": "Disable Typo Tolerance On Attributes",
        "value": "disabletypotoleranceonattributes_json_params"
      },
      {
        "name": "Ignore Plurals params",
        "value": "ignoreplurals_params"
      },
      {
        "name": "Remove Stop Words params",
        "value": "removestopwords_params"
      },
      {
        "name": "Query Languages",
        "value": "querylanguages_json_params"
      },
      {
        "name": "Decompound Query",
        "value": "decompoundquery_boolean_params"
      },
      {
        "name": "Enable Rules",
        "value": "enablerules_boolean_params"
      },
      {
        "name": "Enable Personalization",
        "value": "enablepersonalization_boolean_params"
      },
      {
        "name": "Query Type",
        "value": "querytype_options_params"
      },
      {
        "name": "Remove Words If No Results",
        "value": "removewordsifnoresults_options_params"
      },
      {
        "name": "Mode",
        "value": "mode_options_params"
      },
      {
        "name": "Semantic search object params",
        "value": "semantic_search_object_params"
      },
      {
        "name": "Advanced Syntax",
        "value": "advancedsyntax_boolean_params"
      },
      {
        "name": "Optional Words params",
        "value": "optionalwords_params"
      },
      {
        "name": "Disable Exact On Attributes",
        "value": "disableexactonattributes_json_params"
      },
      {
        "name": "Exact On Single Word Query",
        "value": "exactonsinglewordquery_options_params"
      },
      {
        "name": "Alternatives As Exact",
        "value": "alternativesasexact_json_params"
      },
      {
        "name": "Advanced Syntax Features",
        "value": "advancedsyntaxfeatures_json_params"
      },
      {
        "name": "Distinct params",
        "value": "distinct_params"
      },
      {
        "name": "Replace Synonyms In Highlight",
        "value": "replacesynonymsinhighlight_boolean_params"
      },
      {
        "name": "Min Proximity",
        "value": "minproximity_number_params"
      },
      {
        "name": "Response Fields",
        "value": "responsefields_json_params"
      },
      {
        "name": "Max Values Per Facet",
        "value": "maxvaluesperfacet_number_params"
      },
      {
        "name": "Sort Facet Values By",
        "value": "sortfacetvaluesby_string_params"
      },
      {
        "name": "Attribute Criteria Computed By Min Proximity",
        "value": "attributecriteriacomputedbyminproximity_boolean_params"
      },
      {
        "name": "Rendering content object params",
        "value": "rendering_content_object_params"
      },
      {
        "name": "Enable Re Ranking",
        "value": "enablereranking_boolean_params"
      },
      {
        "name": "Re Ranking Apply Filter params",
        "value": "rerankingapplyfilter_params"
      },
      {
        "name": "Query params",
        "value": "query_params"
      },
      {
        "name": "Automatic Facet Filters params",
        "value": "automaticfacetfilters_params"
      },
      {
        "name": "Automatic Optional Facet Filters params",
        "value": "automaticoptionalfacetfilters_params"
      },
      {
        "name": "Rendering content object params",
        "value": "rendering_content_object_params"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "comedy drama crime Macy Buscemi",
    "description": "Keywords to be used instead of the search query to conduct a more broader search\nUsing the `similarQuery` parameter changes other settings\n- `queryType` is set to `prefixNone`.\n- `removeStopWords` is set to true.\n- `words` is set as the first ranking criterion.\n- All remaining words are treated as `optionalWords`\nSince the `similarQuery` is supposed to do a broad search, they usually return many results.\nCombine it with `filters` to narrow down the list of results.\n",
    "required": false,
    "displayName": "Similar Query",
    "name": "similarQuery_string_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "similarquery_string_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "(category:Book OR category:Ebook) AND _tags:published",
    "description": "Filter expression to only include items that match the filter criteria in the response.\n\nYou can use these filter expressions:\n\n- **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`.\n- **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive).\n- **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value.\n- **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive).\n- **Boolean filters.** `<facet>: true | false`.\n\nYou can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:\n\n- You can only combine filters of the same type with `OR`.\n  **Not supported:** `facet:value OR num > 3`.\n- You can't use `NOT` with combinations of filters.\n  **Not supported:** `NOT(facet:value OR facet:value)`\n- You can't combine conjunctions (`AND`) with `OR`.\n  **Not supported:** `facet:value OR (facet:value AND facet:value)`\n\nUse quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes.\nIf a facet attribute is an array, the filter matches if it matches at least one element of the array.\n\nFor more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/).\n",
    "required": false,
    "displayName": "Filters",
    "name": "filters_string_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "filters_string_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "facetFilters_params_consequence",
    "displayName": "Facet Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "facetfilters_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Facet Filters",
    "name": "facetFilters_json_params_consequence",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "facetfilters_params"
        ],
        "facetFilters_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Facet Filters",
    "name": "facetFilters_string_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "facetfilters_params"
        ],
        "facetFilters_params_consequence": [
          "string"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "optionalFilters_params_consequence",
    "displayName": "Optional Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "optionalfilters_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Optional Filters",
    "name": "optionalFilters_json_params_consequence",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "optionalfilters_params"
        ],
        "optionalFilters_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Optional Filters",
    "name": "optionalFilters_string_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "optionalfilters_params"
        ],
        "optionalFilters_params_consequence": [
          "string"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "numericFilters_params_consequence",
    "displayName": "Numeric Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "numericfilters_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Numeric Filters",
    "name": "numericFilters_json_params_consequence",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "numericfilters_params"
        ],
        "numericFilters_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Numeric Filters",
    "name": "numericFilters_string_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "numericfilters_params"
        ],
        "numericFilters_params_consequence": [
          "string"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "tagFilters_params_consequence",
    "displayName": "Tag Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "tagfilters_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Tag Filters",
    "name": "tagFilters_json_params_consequence",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "tagfilters_params"
        ],
        "tagFilters_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Tag Filters",
    "name": "tagFilters_string_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "tagfilters_params"
        ],
        "tagFilters_params_consequence": [
          "string"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to sum all filter scores\nIf true, all filter scores are summed.\nOtherwise, the maximum filter score is kept.\nFor more information, see [filter scores](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/in-depth/filter-scoring/#accumulating-scores-with-sumorfiltersscores).\n",
    "required": false,
    "displayName": "Sum Or Filters Scores",
    "name": "sumOrFiltersScores_boolean_params_consequence",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "sumorfiltersscores_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Restrict Searchable Attributes",
    "name": "restrictSearchableAttributes_json_params_consequence",
    "default": "[]",
    "description": "Restricts a search to a subset of your searchable attributes.\nAttribute names are case-sensitive.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "restrictsearchableattributes_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Facets",
    "name": "facets_json_params_consequence",
    "default": "[]",
    "description": "Facets for which to retrieve facet values that match the search criteria and the number of matching facet values\nTo retrieve all facets, use the wildcard character `*`.\nFor more information, see [facets](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#contextual-facet-values-and-counts).\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "facets_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether faceting should be applied after deduplication with `distinct`\nThis leads to accurate facet counts when using faceting in combination with `distinct`.\nIt's usually better to use `afterDistinct` modifiers in the `attributesForFaceting` setting,\nas `facetingAfterDistinct` only computes correct facet counts if all records have the same facet values for the `attributeForDistinct`.\n",
    "required": false,
    "displayName": "Faceting After Distinct",
    "name": "facetingAfterDistinct_boolean_params_consequence",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "facetingafterdistinct_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Page of search results to retrieve.",
    "required": false,
    "typeOptions": {
      "minValue": 0
    },
    "displayName": "Page",
    "name": "page_number_params_consequence",
    "default": 0,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "page_number_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Position of the first hit to retrieve.",
    "required": false,
    "displayName": "Offset",
    "name": "offset_number_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "offset_number_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Number of hits to retrieve (used in combination with `offset`).",
    "required": false,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 1000
    },
    "displayName": "Length",
    "name": "length_number_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "length_number_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "40.71,-74.01",
    "description": "Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.\n\nOnly records included within a circle around this central location are included in the results.\nThe radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings.\nThis parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.\n",
    "required": false,
    "displayName": "Around Lat Lng",
    "name": "aroundLatLng_string_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "aroundlatlng_string_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to obtain the coordinates from the request's IP address.",
    "required": false,
    "displayName": "Around Lat Lng Via IP",
    "name": "aroundLatLngViaIP_boolean_params_consequence",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "aroundlatlngviaip_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "aroundRadius_params_consequence",
    "displayName": "Around Radius",
    "default": "",
    "options": [
      {
        "name": "Integer",
        "value": "integer"
      },
      {
        "name": "All",
        "value": "all"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "aroundradius_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Maximum search radius around a central location in meters.",
    "required": false,
    "typeOptions": {
      "minValue": 1
    },
    "displayName": "Around Radius",
    "name": "aroundRadius_number_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "aroundradius_params"
        ],
        "aroundRadius_params_consequence": [
          "integer"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "description": "Return all records with a valid `_geoloc` attribute. Don't filter by distance.",
    "required": false,
    "options": [
      {
        "name": "all",
        "value": "all"
      }
    ],
    "displayName": "Around Radius",
    "name": "aroundRadius_options_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "aroundradius_params"
        ],
        "aroundRadius_params_consequence": [
          "all"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "aroundPrecision_params_consequence",
    "displayName": "Around Precision",
    "default": "",
    "options": [
      {
        "name": "Integer",
        "value": "integer"
      },
      {
        "name": "Range objects",
        "value": "range_objects"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "aroundprecision_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 10,
    "description": "Distance in meters to group results by similar distances.\n\nFor example, if you set `aroundPrecision` to 100, records wihin 100 meters to the central coordinate are considered to have the same distance,\nas are records between 100 and 199 meters.\n",
    "required": false,
    "displayName": "Around Precision",
    "name": "aroundPrecision_number_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "aroundprecision_params"
        ],
        "aroundPrecision_params_consequence": [
          "integer"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "fixedCollection",
    "displayName": "Around Precision",
    "name": "aroundPrecision_fixedCollection_params_consequence",
    "default": "",
    "required": false,
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "aroundPrecision_fixedCollection_values",
        "displayName": "Around Precision",
        "values": [
          {
            "type": "number",
            "placeholder": "20",
            "description": "Lower boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.",
            "required": false,
            "displayName": "From",
            "name": "from_number_aroundPrecision",
            "default": ""
          },
          {
            "type": "number",
            "description": "Upper boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.",
            "required": false,
            "displayName": "Value",
            "name": "value_number_aroundPrecision",
            "default": ""
          }
        ]
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "aroundprecision_params"
        ],
        "aroundPrecision_params_consequence": [
          "range_objects"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Minimum radius (in meters) for a search around a location when `aroundRadius` isn't set.",
    "required": false,
    "typeOptions": {
      "minValue": 1
    },
    "displayName": "Minimum Around Radius",
    "name": "minimumAroundRadius_number_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "minimumaroundradius_number_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "insideBoundingBox_params_consequence",
    "displayName": "Inside Bounding Box",
    "default": "",
    "options": [
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Null",
        "value": "null"
      },
      {
        "name": "Array",
        "value": "array"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "insideboundingbox_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Inside Bounding Box",
    "name": "insideBoundingBox_string_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "insideboundingbox_params"
        ],
        "insideBoundingBox_params_consequence": [
          "string"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "insideBoundingBox",
    "name": "insideBoundingBox_null_params_consequence",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "insideBoundingBox": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "insideboundingbox_params"
        ],
        "insideBoundingBox_params_consequence": [
          "null"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Inside Bounding Box",
    "name": "insideBoundingBox_json_params_consequence",
    "default": "[]",
    "description": "Coordinates for a rectangular area in which to search.\n\nEach bounding box is defined by the two opposite points of its diagonal, and expressed as latitude and longitude pair:\n`[p1 lat, p1 long, p2 lat, p2 long]`.\nProvide multiple bounding boxes as nested arrays.\nFor more information, see [rectangular area](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "insideboundingbox_params"
        ],
        "insideBoundingBox_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Inside Polygon",
    "name": "insidePolygon_json_params_consequence",
    "default": "[]",
    "description": "Coordinates of a polygon in which to search.\n\nPolygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude.\nProvide multiple polygons as nested arrays.\nFor more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\nThis parameter is ignored if you also specify `insideBoundingBox`.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "insidepolygon_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Natural Languages",
    "name": "naturalLanguages_json_params_consequence",
    "default": "[]",
    "description": "ISO language codes that adjust settings that are useful for processing natural language queries (as opposed to keyword searches)\n- Sets `removeStopWords` and `ignorePlurals` to the list of provided languages.\n- Sets `removeWordsIfNoResults` to `allOptional`.\n- Adds a `natural_language` attribute to `ruleContexts` and `analyticsTags`.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "naturallanguages_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Rule Contexts",
    "name": "ruleContexts_json_params_consequence",
    "default": "[]",
    "description": "Assigns a rule context to the search query\n[Rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/how-to/customize-search-results-by-platform/#whats-a-context) are strings that you can use to trigger matching rules.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rulecontexts_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 100,
    "description": "Impact that Personalization should have on this search\nThe higher this value is, the more Personalization determines the ranking compared to other factors.\nFor more information, see [Understanding Personalization impact](https://www.algolia.com/doc/guides/personalization/personalizing-results/in-depth/configuring-personalization/#understanding-personalization-impact).\n",
    "required": false,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 100
    },
    "displayName": "Personalization Impact",
    "name": "personalizationImpact_number_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "personalizationimpact_number_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "test-user-123",
    "description": "Unique pseudonymous or anonymous user identifier.\n\nThis helps with analytics and click and conversion events.\nFor more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken/).\n",
    "required": false,
    "displayName": "User Token",
    "name": "userToken_string_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "usertoken_string_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether the search response should include detailed ranking information.",
    "required": false,
    "displayName": "Get Ranking Info",
    "name": "getRankingInfo_boolean_params_consequence",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "getrankinginfo_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to take into account an index's synonyms for this search.",
    "required": false,
    "displayName": "Synonyms",
    "name": "synonyms_boolean_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "synonyms_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to include a `queryID` attribute in the response\nThe query ID is a unique identifier for a search query and is required for tracking [click and conversion events](https://www.algolia.com/guides/sending-events/getting-started/).\n",
    "required": false,
    "displayName": "Click Analytics",
    "name": "clickAnalytics_boolean_params_consequence",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "clickanalytics_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether this search will be included in Analytics.",
    "required": false,
    "displayName": "Analytics",
    "name": "analytics_boolean_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "analytics_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Analytics Tags",
    "name": "analyticsTags_json_params_consequence",
    "default": "[]",
    "description": "Tags to apply to the query for [segmenting analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "analyticstags_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to include this search when calculating processing-time percentiles.",
    "required": false,
    "displayName": "Percentile Computation",
    "name": "percentileComputation_boolean_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "percentilecomputation_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to enable A/B testing for this search.",
    "required": false,
    "displayName": "Enable ABTest",
    "name": "enableABTest_boolean_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "enableabtest_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Retrieve",
    "name": "attributesToRetrieve_json_params_consequence",
    "default": "[]",
    "description": "Attributes to include in the API response\nTo reduce the size of your response, you can retrieve only some of the attributes.\nAttribute names are case-sensitive\n- `*` retrieves all attributes, except attributes included in the `customRanking` and `unretrievableAttributes` settings.\n- To retrieve all attributes except a specific one, prefix the attribute with a dash and combine it with the `*`: `[\"*\", \"-ATTRIBUTE\"]`.\n- The `objectID` attribute is always included.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "attributestoretrieve_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Ranking",
    "name": "ranking_json_params_consequence",
    "default": "[]",
    "description": "Determines the order in which Algolia returns your results.\n\nBy default, each entry corresponds to a [ranking criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/).\nThe tie-breaking algorithm sequentially applies each criterion in the order they're specified.\nIf you configure a replica index for [sorting by an attribute](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute/),\nyou put the sorting attribute at the top of the list.\n\n**Modifiers**\n\n- `asc(\"ATTRIBUTE\")`.\n  Sort the index by the values of an attribute, in ascending order.\n- `desc(\"ATTRIBUTE\")`.\n  Sort the index by the values of an attribute, in descending order.\n\nBefore you modify the default setting,\nyou should test your changes in the dashboard,\nand by [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing/).\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "ranking_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "placeholder": "90",
    "default": 100,
    "description": "Relevancy threshold below which less relevant results aren't included in the results\nYou can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas).\nUse this setting to strike a balance between the relevance and number of returned results.\n",
    "required": false,
    "displayName": "Relevancy Strictness",
    "name": "relevancyStrictness_number_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "relevancystrictness_number_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Highlight",
    "name": "attributesToHighlight_json_params_consequence",
    "default": "[]",
    "description": "Attributes to highlight\nBy default, all searchable attributes are highlighted.\nUse `*` to highlight all attributes or use an empty array `[]` to turn off highlighting.\nAttribute names are case-sensitive\nWith highlighting, strings that match the search query are surrounded by HTML tags defined by `highlightPreTag` and `highlightPostTag`.\nYou can use this to visually highlight matching parts of a search query in your UI\nFor more information, see [Highlighting and snippeting](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js/).\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "attributestohighlight_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Attributes To Snippet",
    "name": "attributesToSnippet_json_params_consequence",
    "default": "[]",
    "description": "Attributes for which to enable snippets.\nAttribute names are case-sensitive\nSnippets provide additional context to matched words.\nIf you enable snippets, they include 10 words, including the matched word.\nThe matched word will also be wrapped by HTML tags for highlighting.\nYou can adjust the number of words with the following notation: `ATTRIBUTE:NUMBER`,\nwhere `NUMBER` is the number of words to be extracted.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "attributestosnippet_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "<em>",
    "description": "HTML tag to insert before the highlighted parts in all highlighted results and snippets.",
    "required": false,
    "displayName": "Highlight Pre Tag",
    "name": "highlightPreTag_string_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "highlightpretag_string_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "</em>",
    "description": "HTML tag to insert after the highlighted parts in all highlighted results and snippets.",
    "required": false,
    "displayName": "Highlight Post Tag",
    "name": "highlightPostTag_string_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "highlightposttag_string_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "…",
    "description": "String used as an ellipsis indicator when a snippet is truncated.",
    "required": false,
    "displayName": "Snippet Ellipsis Text",
    "name": "snippetEllipsisText_string_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "snippetellipsistext_string_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to restrict highlighting and snippeting to items that at least partially matched the search query.\nBy default, all items are highlighted and snippeted.\n",
    "required": false,
    "displayName": "Restrict Highlight And Snippet Arrays",
    "name": "restrictHighlightAndSnippetArrays_boolean_params_consequence",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "restricthighlightandsnippetarrays_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 20,
    "description": "Number of hits per page.",
    "required": false,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 1000
    },
    "displayName": "Hits Per Page",
    "name": "hitsPerPage_number_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "hitsperpage_number_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 4,
    "description": "Minimum number of characters a word in the search query must contain to accept matches with [one typo](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).",
    "required": false,
    "displayName": "Min Word Sizefor1Typo",
    "name": "minWordSizefor1Typo_number_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "minwordsizefor1typo_number_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 8,
    "description": "Minimum number of characters a word in the search query must contain to accept matches with [two typos](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).",
    "required": false,
    "displayName": "Min Word Sizefor2Typos",
    "name": "minWordSizefor2Typos_number_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "minwordsizefor2typos_number_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "typoTolerance_params_consequence",
    "displayName": "Typo Tolerance",
    "default": "",
    "options": [
      {
        "name": "Boolean",
        "value": "boolean"
      },
      {
        "name": "Typo tolerance",
        "value": "typo_tolerance"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "typotolerance_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether typo tolerance is active. If true, matches with typos are included in the search results and rank after exact matches.",
    "required": false,
    "displayName": "Typo Tolerance",
    "name": "typoTolerance_boolean_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "typotolerance_params"
        ],
        "typoTolerance_params_consequence": [
          "boolean"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "description": "- `min`. Return matches with the lowest number of typos.\n  For example, if you have matches without typos, only include those.\n  But if there are no matches without typos (with 1 typo), include matches with 1 typo (2 typos).\n- `strict`. Return matches with the two lowest numbers of typos.\n  With `strict`, the Typo ranking criterion is applied first in the `ranking` setting.\n",
    "required": false,
    "options": [
      {
        "name": "min",
        "value": "min"
      },
      {
        "name": "strict",
        "value": "strict"
      },
      {
        "name": "true",
        "value": "true"
      },
      {
        "name": "false",
        "value": "false"
      }
    ],
    "displayName": "Typo Tolerance",
    "name": "typoTolerance_options_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "typotolerance_params"
        ],
        "typoTolerance_params_consequence": [
          "typo_tolerance"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to allow typos on numbers in the search query\nTurn off this setting to reduce the number of irrelevant matches\nwhen searching in large sets of similar numbers.\n",
    "required": false,
    "displayName": "Allow Typos On Numeric Tokens",
    "name": "allowTyposOnNumericTokens_boolean_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "allowtyposonnumerictokens_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Disable Typo Tolerance On Attributes",
    "name": "disableTypoToleranceOnAttributes_json_params_consequence",
    "default": "[]",
    "description": "Attributes for which you want to turn off [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/).\nAttribute names are case-sensitive\nReturning only exact matches can help when\n- [Searching in hyphenated attributes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes/).\n- Reducing the number of matches when you have too many.\n  This can happen with attributes that are long blocks of text, such as product descriptions\nConsider alternatives such as `disableTypoToleranceOnWords` or adding synonyms if your attributes have intentional unusual spellings that might look like typos.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "disabletypotoleranceonattributes_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "ignorePlurals_params_consequence",
    "displayName": "Ignore Plurals",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Boolean",
        "value": "boolean"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "ignoreplurals_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Ignore Plurals",
    "name": "ignorePlurals_json_params_consequence",
    "default": "[]",
    "description": "ISO code for languages for which this feature should be active.\nThis overrides languages you set with `queryLanguages`.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "ignoreplurals_params"
        ],
        "ignorePlurals_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "required": false,
    "options": [
      {
        "name": "true",
        "value": "true"
      },
      {
        "name": "false",
        "value": "false"
      }
    ],
    "displayName": "Ignore Plurals",
    "name": "ignorePlurals_options_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "ignoreplurals_params"
        ],
        "ignorePlurals_params_consequence": [
          "string"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "If true, `ignorePlurals` is active for all languages included in `queryLanguages`, or for all supported languages, if `queryLanguges` is empty.\nIf false, singulars, plurals, and other declensions won't be considered equivalent.\n",
    "required": false,
    "displayName": "Ignore Plurals",
    "name": "ignorePlurals_boolean_params_consequence",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "ignoreplurals_params"
        ],
        "ignorePlurals_params_consequence": [
          "boolean"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "removeStopWords_params_consequence",
    "displayName": "Remove Stop Words",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "Boolean",
        "value": "boolean"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "removestopwords_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Remove Stop Words",
    "name": "removeStopWords_json_params_consequence",
    "default": "[]",
    "description": "ISO code for languages for which stop words should be removed. This overrides languages you set in `queryLanguges`.",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "removestopwords_params"
        ],
        "removeStopWords_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "If true, stop words are removed for all languages you included in `queryLanguages`, or for all supported languages, if `queryLanguages` is empty.\nIf false, stop words are not removed.\n",
    "required": false,
    "displayName": "Remove Stop Words",
    "name": "removeStopWords_boolean_params_consequence",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "removestopwords_params"
        ],
        "removeStopWords_params_consequence": [
          "boolean"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Query Languages",
    "name": "queryLanguages_json_params_consequence",
    "default": "[]",
    "description": "Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries \nThis setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings.\nThis setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages.\nTo support this, you must place the CJK language **first** \n**You should always specify a query language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages/),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/).\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "querylanguages_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to split compound words in the query into their building blocks\nFor more information, see [Word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#splitting-compound-words).\nWord segmentation is supported for these languages: German, Dutch, Finnish, Swedish, and Norwegian.\nDecompounding doesn't work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark).\nFor example, `Gartenstühle` won't be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).\n",
    "required": false,
    "displayName": "Decompound Query",
    "name": "decompoundQuery_boolean_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "decompoundquery_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether to enable rules.",
    "required": false,
    "displayName": "Enable Rules",
    "name": "enableRules_boolean_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "enablerules_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to enable Personalization.",
    "required": false,
    "displayName": "Enable Personalization",
    "name": "enablePersonalization_boolean_params_consequence",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "enablepersonalization_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "default": "prefixLast",
    "description": "Determines if and how query words are interpreted as prefixes.\n\nBy default, only the last query word is treated as a prefix (`prefixLast`).\nTo turn off prefix search, use `prefixNone`.\nAvoid `prefixAll`, which treats all query words as prefixes.\nThis might lead to counterintuitive results and makes your search slower.\n\nFor more information, see [Prefix searching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/prefix-searching/).\n",
    "required": false,
    "options": [
      {
        "name": "prefixLast",
        "value": "prefixLast"
      },
      {
        "name": "prefixAll",
        "value": "prefixAll"
      },
      {
        "name": "prefixNone",
        "value": "prefixNone"
      }
    ],
    "displayName": "Query Type",
    "name": "queryType_options_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "querytype_options_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "firstWords",
    "default": "none",
    "description": "Strategy for removing words from the query when it doesn't return any results.\nThis helps to avoid returning empty search results.\n\n- `none`.\n  No words are removed when a query doesn't return results.\n\n- `lastWords`.\n  Treat the last (then second to last, then third to last) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `firstWords`.\n  Treat the first (then second, then third) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `allOptional`.\n  Treat all words as optional.\n\nFor more information, see [Remove words to improve results](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/in-depth/why-use-remove-words-if-no-results/).\n",
    "required": false,
    "options": [
      {
        "name": "none",
        "value": "none"
      },
      {
        "name": "lastWords",
        "value": "lastWords"
      },
      {
        "name": "firstWords",
        "value": "firstWords"
      },
      {
        "name": "allOptional",
        "value": "allOptional"
      }
    ],
    "displayName": "Remove Words If No Results",
    "name": "removeWordsIfNoResults_options_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "removewordsifnoresults_options_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "default": "keywordSearch",
    "description": "Search mode the index will use to query for results.\n\nThis setting only applies to indices, for which Algolia enabled NeuralSearch for you.\n",
    "required": false,
    "options": [
      {
        "name": "neuralSearch",
        "value": "neuralSearch"
      },
      {
        "name": "keywordSearch",
        "value": "keywordSearch"
      }
    ],
    "displayName": "Mode",
    "name": "mode_options_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "mode_options_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Semantic Search",
    "name": "semantic_search_object_params_consequence",
    "type": "multiOptions",
    "description": "Settings for the semantic search part of NeuralSearch.\nOnly used when `mode` is `neuralSearch`.\n",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Event Sources",
        "value": "eventSources_semanticSearch"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "semantic_search_object_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "eventSources_semanticSearch_params_consequence",
    "displayName": "Event Sources",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "semantic_search_object_params"
        ],
        "semantic_search_object_params_consequence": [
          "eventSources_semanticSearch"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Event Sources",
    "name": "eventSources_json_semanticSearch_params_consequence",
    "default": "[]",
    "description": "Indices from which to collect click and conversion events.\n\nIf null, the current index and all its replicas are used.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "semantic_search_object_params"
        ],
        "semantic_search_object_params_consequence": [
          "eventSources_semanticSearch"
        ],
        "eventSources_semanticSearch_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "eventSources",
    "name": "eventSources_null_semanticSearch_params_consequence",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "eventSources": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "semantic_search_object_params"
        ],
        "semantic_search_object_params_consequence": [
          "eventSources_semanticSearch"
        ],
        "eventSources_semanticSearch_params_consequence": [
          "null"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to support phrase matching and excluding words from search queries\nUse the `advancedSyntaxFeatures` parameter to control which feature is supported.\n",
    "required": false,
    "displayName": "Advanced Syntax",
    "name": "advancedSyntax_boolean_params_consequence",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "advancedsyntax_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "optionalWords_params_consequence",
    "displayName": "Optional Words",
    "default": "",
    "options": [
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Null",
        "value": "null"
      },
      {
        "name": "Array",
        "value": "array"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "optionalwords_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Optional Words",
    "name": "optionalWords_string_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "optionalwords_params"
        ],
        "optionalWords_params_consequence": [
          "string"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "optionalWords",
    "name": "optionalWords_null_params_consequence",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "optionalWords": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "optionalwords_params"
        ],
        "optionalWords_params_consequence": [
          "null"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Optional Words",
    "name": "optionalWords_json_params_consequence",
    "default": "[]",
    "description": "List of [optional words](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/#creating-a-list-of-optional-words).",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "optionalwords_params"
        ],
        "optionalWords_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Disable Exact On Attributes",
    "name": "disableExactOnAttributes_json_params_consequence",
    "default": "[]",
    "description": "Searchable attributes for which you want to [turn off the Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes).\nAttribute names are case-sensitive\nThis can be useful for attributes with long values, where the likelihood of an exact match is high,\nsuch as product descriptions.\nTurning off the Exact ranking criterion for these attributes favors exact matching on other attributes.\nThis reduces the impact of individual attributes with a lot of content on ranking.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "disableexactonattributes_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "default": "attribute",
    "description": "Determines how the [Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes) is computed when the search query has only one word.\n\n- `attribute`.\n  The Exact ranking criterion is 1 if the query word and attribute value are the same.\n  For example, a search for \"road\" will match the value \"road\", but not \"road trip\".\n\n- `none`.\n  The Exact ranking criterion is ignored on single-word searches.\n\n- `word`.\n  The Exact ranking criterion is 1 if the query word is found in the attribute value.\n  The query word must have at least 3 characters and must not be a stop word.\n  Only exact matches will be highlighted,\n  partial and prefix matches won't.\n",
    "required": false,
    "options": [
      {
        "name": "attribute",
        "value": "attribute"
      },
      {
        "name": "none",
        "value": "none"
      },
      {
        "name": "word",
        "value": "word"
      }
    ],
    "displayName": "Exact On Single Word Query",
    "name": "exactOnSingleWordQuery_options_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "exactonsinglewordquery_options_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Alternatives As Exact",
    "name": "alternativesAsExact_json_params_consequence",
    "default": "[]",
    "description": "Determine which plurals and synonyms should be considered an exact matches\nBy default, Algolia treats singular and plural forms of a word, and single-word synonyms, as [exact](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#exact) matches when searching.\nFor example\n- \"swimsuit\" and \"swimsuits\" are treated the same\n- \"swimsuit\" and \"swimwear\" are treated the same (if they are [synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#regular-synonyms))\n- `ignorePlurals`.\n  Plurals and similar declensions added by the `ignorePlurals` setting are considered exact matches\n- `singleWordSynonym`.\n  Single-word synonyms, such as \"NY\" = \"NYC\", are considered exact matches\n- `multiWordsSynonym`.\n  Multi-word synonyms, such as \"NY\" = \"New York\", are considered exact matches.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "alternativesasexact_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Advanced Syntax Features",
    "name": "advancedSyntaxFeatures_json_params_consequence",
    "default": "[]",
    "description": "Advanced search syntax features you want to support\n- `exactPhrase`.\n  Phrases in quotes must match exactly.\n  For example, `sparkly blue \"iPhone case\"` only returns records with the exact string \"iPhone case\"\n- `excludeWords`.\n  Query words prefixed with a `-` must not occur in a record.\n  For example, `search -engine` matches records that contain \"search\" but not \"engine\"\nThis setting only has an effect if `advancedSyntax` is true.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "advancedsyntaxfeatures_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "distinct_params_consequence",
    "displayName": "Distinct",
    "default": "",
    "options": [
      {
        "name": "Boolean",
        "value": "boolean"
      },
      {
        "name": "Integer",
        "value": "integer"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "distinct_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether deduplication is turned on. If true, only one member of a group is shown in the search results.",
    "required": false,
    "displayName": "Distinct",
    "name": "distinct_boolean_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "distinct_params"
        ],
        "distinct_params_consequence": [
          "boolean"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Number of members of a group of records to include in the search results.\n\n- Don't use `distinct > 1` for records that might be [promoted by rules](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/promote-hits/).\n  The number of hits won't be correct and faceting won't work as expected.\n- With `distinct > 1`, the `hitsPerPage` parameter controls the number of returned groups.\n  For example, with `hitsPerPage: 10` and `distinct: 2`, up to 20 records are returned.\n  Likewise, the `nbHits` response attribute contains the number of returned groups.\n",
    "required": false,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 4
    },
    "displayName": "Distinct",
    "name": "distinct_number_params_consequence",
    "default": 0,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "distinct_params"
        ],
        "distinct_params_consequence": [
          "integer"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to replace a highlighted word with the matched synonym\nBy default, the original words are highlighted even if a synonym matches.\nFor example, with `home` as a synonym for `house` and a search for `home`,\nrecords matching either \"home\" or \"house\" are included in the search results,\nand either \"home\" or \"house\" are highlighted\nWith `replaceSynonymsInHighlight` set to `true`, a search for `home` still matches the same records,\nbut all occurrences of \"house\" are replaced by \"home\" in the highlighted response.\n",
    "required": false,
    "displayName": "Replace Synonyms In Highlight",
    "name": "replaceSynonymsInHighlight_boolean_params_consequence",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "replacesynonymsinhighlight_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 1,
    "description": "Minimum proximity score for two matching words\nThis adjusts the [Proximity ranking criterion](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#proximity)\nby equally scoring matches that are farther apart\nFor example, if `minProximity` is 2, neighboring matches and matches with one word between them would have the same score.\n",
    "required": false,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 7
    },
    "displayName": "Min Proximity",
    "name": "minProximity_number_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "minproximity_number_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Response Fields",
    "name": "responseFields_json_params_consequence",
    "default": "[]",
    "description": "Properties to include in the API response of search and browse requests\nBy default, all response properties are included.\nTo reduce the response size, you can select which properties should be included\nAn empty list may lead to an empty API response (except properties you can't exclude)\nYou can't exclude these properties:\n`message`, `warning`, `cursor`, `abTestVariantID`,\nor any property added by setting `getRankingInfo` to true\nYour search depends on the `hits` field. If you omit this field, searches won't return any results.\nYour UI might also depend on other properties, for example, for pagination.\nBefore restricting the response size, check the impact on your search experience.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "responsefields_json_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 100,
    "description": "Maximum number of facet values to return for each facet.",
    "required": false,
    "typeOptions": {
      "maxValue": 1000
    },
    "displayName": "Max Values Per Facet",
    "name": "maxValuesPerFacet_number_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "maxvaluesperfacet_number_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "default": "count",
    "description": "Order in which to retrieve facet values\n- `count`.\n  Facet values are retrieved by decreasing count.\n  The count is the number of matching records containing this facet value\n- `alpha`.\n  Retrieve facet values alphabetically\nThis setting doesn't influence how facet values are displayed in your UI (see `renderingContent`).\nFor more information, see [facet value display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/js/).\n",
    "required": false,
    "displayName": "Sort Facet Values By",
    "name": "sortFacetValuesBy_string_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "sortfacetvaluesby_string_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether the best matching attribute should be determined by minimum proximity\nThis setting only affects ranking if the Attribute ranking criterion comes before Proximity in the `ranking` setting.\nIf true, the best matching attribute is selected based on the minimum proximity of multiple matches.\nOtherwise, the best matching attribute is determined by the order in the `searchableAttributes` setting.\n",
    "required": false,
    "displayName": "Attribute Criteria Computed By Min Proximity",
    "name": "attributeCriteriaComputedByMinProximity_boolean_params_consequence",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "attributecriteriacomputedbyminproximity_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Rendering Content",
    "name": "rendering_content_object_params_consequence",
    "type": "multiOptions",
    "description": "Extra data that can be used in the search UI.\n\nYou can use this to control aspects of your search UI, such as the order of facet names and values\nwithout changing your frontend code.\n",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Facet Ordering",
        "value": "facet_ordering_object_renderingContent"
      },
      {
        "name": "Redirect",
        "value": "redirect_object_renderingContent"
      },
      {
        "name": "Widgets",
        "value": "widgets_object_renderingContent"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Facet Ordering",
    "name": "facet_ordering_object_renderingContent_params_consequence",
    "type": "multiOptions",
    "description": "Order of facet names and facet values in your UI.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Facets",
        "value": "facets_object_facetOrdering"
      },
      {
        "name": "Values",
        "value": "values_object_facetOrdering"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "facet_ordering_object_renderingContent"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Facets",
    "name": "facets_object_facetOrdering_renderingContent_params_consequence",
    "type": "multiOptions",
    "description": "Order of facet names.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Order",
        "value": "order_json_facets"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent_params_consequence": [
          "facets_object_facetOrdering"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Order",
    "name": "order_json_facets_facetOrdering_renderingContent_params_consequence",
    "default": "[]",
    "description": "Explicit order of facets or facet values.\n\nThis setting lets you always show specific facets or facet values at the top of the list.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent_params_consequence": [
          "facets_object_facetOrdering"
        ],
        "facets_object_facetOrdering_renderingContent_params_consequence": [
          "order_json_facets"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Values",
    "name": "values_object_facetOrdering_renderingContent_params_consequence",
    "type": "json",
    "description": "Order of facet values. One object for each facet.",
    "required": false,
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent_params_consequence": [
          "values_object_facetOrdering"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Redirect",
    "name": "redirect_object_renderingContent_params_consequence",
    "type": "multiOptions",
    "description": "The redirect rule container.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Url",
        "value": "url_string_redirect"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "redirect_object_renderingContent"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Url",
    "name": "url_string_redirect_renderingContent_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "redirect_object_renderingContent"
        ],
        "redirect_object_renderingContent_params_consequence": [
          "url_string_redirect"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Widgets",
    "name": "widgets_object_renderingContent_params_consequence",
    "type": "multiOptions",
    "description": "Widgets returned from any rules that are applied to the current search.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Banners",
        "value": "banners_fixedCollection_widgets"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "widgets_object_renderingContent"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Banners",
    "name": "banners_fixedCollection_widgets_renderingContent_params_consequence",
    "default": "",
    "description": "Banners defined in the Merchandising Studio for a given search.",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "widgets_object_renderingContent"
        ],
        "widgets_object_renderingContent_params_consequence": [
          "banners_fixedCollection_widgets"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking/)\nThis setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.\n",
    "required": false,
    "displayName": "Enable Re Ranking",
    "name": "enableReRanking_boolean_params_consequence",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "enablereranking_boolean_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "reRankingApplyFilter_params_consequence",
    "displayName": "Re Ranking Apply Filter",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rerankingapplyfilter_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Re Ranking Apply Filter",
    "name": "reRankingApplyFilter_json_params_consequence",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rerankingapplyfilter_params"
        ],
        "reRankingApplyFilter_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Re Ranking Apply Filter",
    "name": "reRankingApplyFilter_string_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rerankingapplyfilter_params"
        ],
        "reRankingApplyFilter_params_consequence": [
          "string"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "reRankingApplyFilter",
    "name": "reRankingApplyFilter_null_params_consequence",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "reRankingApplyFilter": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rerankingapplyfilter_params"
        ],
        "reRankingApplyFilter_params_consequence": [
          "null"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "query_params_consequence",
    "displayName": "Query",
    "default": "",
    "options": [
      {
        "name": "Object",
        "value": "object"
      },
      {
        "name": "String",
        "value": "string"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "query_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Query",
    "name": "query_object_params_consequence",
    "type": "multiOptions",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Remove",
        "value": "remove_json_query"
      },
      {
        "name": "Edits",
        "value": "edits_fixedCollection_query"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "query_params"
        ],
        "query_params_consequence": [
          "object"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Remove",
    "name": "remove_json_query_params_consequence",
    "default": "[]",
    "description": "Words to remove from the search query.",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "query_params"
        ],
        "query_params_consequence": [
          "object"
        ],
        "query_object_params_consequence": [
          "remove_json_query"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Edits",
    "name": "edits_fixedCollection_query_params_consequence",
    "default": "",
    "description": "Changes to make to the search query.",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "query_params"
        ],
        "query_params_consequence": [
          "object"
        ],
        "query_object_params_consequence": [
          "edits_fixedCollection_query"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Query",
    "name": "query_string_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "query_params"
        ],
        "query_params_consequence": [
          "string"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "automaticFacetFilters_params_consequence",
    "displayName": "Automatic Facet Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "Array",
        "value": "array"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "automaticfacetfilters_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "fixedCollection",
    "displayName": "Automatic Facet Filters",
    "name": "automaticFacetFilters_fixedCollection_params_consequence",
    "default": "",
    "required": false,
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "automaticFacetFilters_fixedCollection_values",
        "displayName": "Automatic Facet Filters",
        "values": [
          {
            "type": "string",
            "description": "Facet name to be applied as filter.\nThe name must match placeholders in the `pattern` parameter.\nFor example, with `pattern: {facet:genre}`, `automaticFacetFilters` must be `genre`.\n",
            "required": false,
            "displayName": "Facet",
            "name": "facet_string_automaticFacetFilters",
            "default": ""
          },
          {
            "type": "number",
            "default": 1,
            "description": "Filter scores to give different weights to individual filters.",
            "required": false,
            "displayName": "Score",
            "name": "score_number_automaticFacetFilters"
          },
          {
            "type": "boolean",
            "description": "Whether the filter is disjunctive or conjunctive.\n\nIf true the filter has multiple matches, multiple occurences are combined with the logical `OR` operation.\nIf false, multiple occurences are combined with the logical `AND` operation.\n",
            "required": false,
            "displayName": "Disjunctive",
            "name": "disjunctive_boolean_automaticFacetFilters",
            "default": false
          }
        ]
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "automaticfacetfilters_params"
        ],
        "automaticFacetFilters_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Automatic Facet Filters",
    "name": "automaticFacetFilters_json_params_consequence",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "automaticfacetfilters_params"
        ],
        "automaticFacetFilters_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "automaticOptionalFacetFilters_params_consequence",
    "displayName": "Automatic Optional Facet Filters",
    "default": "",
    "options": [
      {
        "name": "Array",
        "value": "array"
      },
      {
        "name": "Array",
        "value": "array"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "automaticoptionalfacetfilters_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "fixedCollection",
    "displayName": "Automatic Optional Facet Filters",
    "name": "automaticOptionalFacetFilters_fixedCollection_params_consequence",
    "default": "",
    "required": false,
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "automaticOptionalFacetFilters_fixedCollection_values",
        "displayName": "Automatic Optional Facet Filters",
        "values": [
          {
            "type": "string",
            "description": "Facet name to be applied as filter.\nThe name must match placeholders in the `pattern` parameter.\nFor example, with `pattern: {facet:genre}`, `automaticFacetFilters` must be `genre`.\n",
            "required": false,
            "displayName": "Facet",
            "name": "facet_string_automaticOptionalFacetFilters",
            "default": ""
          },
          {
            "type": "number",
            "default": 1,
            "description": "Filter scores to give different weights to individual filters.",
            "required": false,
            "displayName": "Score",
            "name": "score_number_automaticOptionalFacetFilters"
          },
          {
            "type": "boolean",
            "description": "Whether the filter is disjunctive or conjunctive.\n\nIf true the filter has multiple matches, multiple occurences are combined with the logical `OR` operation.\nIf false, multiple occurences are combined with the logical `AND` operation.\n",
            "required": false,
            "displayName": "Disjunctive",
            "name": "disjunctive_boolean_automaticOptionalFacetFilters",
            "default": false
          }
        ]
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "automaticoptionalfacetfilters_params"
        ],
        "automaticOptionalFacetFilters_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Automatic Optional Facet Filters",
    "name": "automaticOptionalFacetFilters_json_params_consequence",
    "default": "[]",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "automaticoptionalfacetfilters_params"
        ],
        "automaticOptionalFacetFilters_params_consequence": [
          "array"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Rendering Content",
    "name": "rendering_content_object_params_consequence",
    "type": "multiOptions",
    "description": "Extra data that can be used in the search UI.\n\nYou can use this to control aspects of your search UI, such as the order of facet names and values\nwithout changing your frontend code.\n",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Facet Ordering",
        "value": "facet_ordering_object_renderingContent"
      },
      {
        "name": "Redirect",
        "value": "redirect_object_renderingContent"
      },
      {
        "name": "Widgets",
        "value": "widgets_object_renderingContent"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Facet Ordering",
    "name": "facet_ordering_object_renderingContent_params_consequence",
    "type": "multiOptions",
    "description": "Order of facet names and facet values in your UI.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Facets",
        "value": "facets_object_facetOrdering"
      },
      {
        "name": "Values",
        "value": "values_object_facetOrdering"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "facet_ordering_object_renderingContent"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Facets",
    "name": "facets_object_facetOrdering_renderingContent_params_consequence",
    "type": "multiOptions",
    "description": "Order of facet names.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Order",
        "value": "order_json_facets"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent_params_consequence": [
          "facets_object_facetOrdering"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Order",
    "name": "order_json_facets_facetOrdering_renderingContent_params_consequence",
    "default": "[]",
    "description": "Explicit order of facets or facet values.\n\nThis setting lets you always show specific facets or facet values at the top of the list.\n",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent_params_consequence": [
          "facets_object_facetOrdering"
        ],
        "facets_object_facetOrdering_renderingContent_params_consequence": [
          "order_json_facets"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Values",
    "name": "values_object_facetOrdering_renderingContent_params_consequence",
    "type": "json",
    "description": "Order of facet values. One object for each facet.",
    "required": false,
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "facet_ordering_object_renderingContent"
        ],
        "facet_ordering_object_renderingContent_params_consequence": [
          "values_object_facetOrdering"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Redirect",
    "name": "redirect_object_renderingContent_params_consequence",
    "type": "multiOptions",
    "description": "The redirect rule container.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Url",
        "value": "url_string_redirect"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "redirect_object_renderingContent"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "required": false,
    "displayName": "Url",
    "name": "url_string_redirect_renderingContent_params_consequence",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "redirect_object_renderingContent"
        ],
        "redirect_object_renderingContent_params_consequence": [
          "url_string_redirect"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "displayName": "Widgets",
    "name": "widgets_object_renderingContent_params_consequence",
    "type": "multiOptions",
    "description": "Widgets returned from any rules that are applied to the current search.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Banners",
        "value": "banners_fixedCollection_widgets"
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "widgets_object_renderingContent"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Banners",
    "name": "banners_fixedCollection_widgets_renderingContent_params_consequence",
    "default": "",
    "description": "Banners defined in the Merchandising Studio for a given search.",
    "required": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "params_consequence"
        ],
        "params_consequence": [
          "rendering_content_object_params"
        ],
        "rendering_content_object_params_consequence": [
          "widgets_object_renderingContent"
        ],
        "widgets_object_renderingContent_params_consequence": [
          "banners_fixedCollection_widgets"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Determines whether promoted records must also match active filters for the consequence to apply.\n\nThis ensures user-applied filters take priority and irrelevant matches aren't shown.\nFor example, if you promote a record with `color: red` but the user filters for `color: blue`,\nthe \"red\" record won't be shown.\n\n> In the Algolia dashboard, when you use the **Pin an item** consequence, `filterPromotes` appears as the checkbox: **Pinned items must match active filters to be displayed.** For examples, see [Promote results with rules](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/promote-hits/#promote-results-matching-active-filters).\n",
    "required": false,
    "displayName": "Filter Promotes",
    "name": "filterPromotes_boolean_consequence",
    "default": false,
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "filterPromotes_boolean_consequence"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "fixedCollection",
    "displayName": "Hide",
    "name": "hide_fixedCollection_consequence",
    "default": "",
    "description": "Records you want to hide from the search results.",
    "required": false,
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "hide_fixedCollection_values",
        "displayName": "Hide",
        "values": [
          {
            "type": "string",
            "placeholder": "test-record-123",
            "description": "Unique record identifier.",
            "required": false,
            "displayName": "Object ID",
            "name": "objectID_string_hide",
            "default": ""
          }
        ]
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "consequence_object"
        ],
        "consequence_object": [
          "hide_fixedCollection_consequence"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "Display a promotional banner",
    "description": "Description of the rule's purpose to help you distinguish between different rules.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "description"
      }
    },
    "displayName": "Description",
    "name": "description_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "description_string"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "default": true,
    "description": "Whether the rule is active.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "enabled"
      }
    },
    "displayName": "Enabled",
    "name": "enabled_boolean",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "enabled_boolean"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "fixedCollection",
    "displayName": "Validity",
    "name": "validity_fixedCollection",
    "default": "",
    "description": "Time periods when the rule is active.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $parameter.values?.map(item => ({ from: typeof item.from_number_validity !== \"undefined\" ? item.from_number_validity : undefined, until: typeof item.until_number_validity !== \"undefined\" ? item.until_number_validity : undefined })) }}",
        "property": "validity"
      }
    },
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "validity_fixedCollection_values",
        "displayName": "Validity",
        "values": [
          {
            "type": "number",
            "description": "When the rule should start to be active, in Unix epoch time.",
            "required": false,
            "displayName": "From",
            "name": "from_number_validity",
            "default": ""
          },
          {
            "type": "number",
            "description": "When the rule should stop to be active, in Unix epoch time.",
            "required": false,
            "displayName": "Until",
            "name": "until_number_validity",
            "default": ""
          }
        ]
      }
    ],
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "validity_fixedCollection"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "deleteRule"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "string",
    "description": "Unique identifier of a rule object.",
    "required": true,
    "displayName": "Object ID",
    "name": "objectID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "deleteRule"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "required": false,
    "displayName": "Forward To Replicas",
    "name": "forwardToReplicas_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "deleteRule"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRules"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "boolean",
    "required": false,
    "displayName": "Forward To Replicas",
    "name": "forwardToReplicas_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRules"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "required": false,
    "displayName": "Clear Existing Rules",
    "name": "clearExistingRules_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRules"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Fixed Collection",
    "name": "undefined_fixedCollection",
    "default": "",
    "description": "Rules to add or replace.",
    "required": false,
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "saveRules"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "clearRules"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "boolean",
    "required": false,
    "displayName": "Forward To Replicas",
    "name": "forwardToReplicas_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "clearRules"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "searchRules"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "displayName": "Search Rules Params",
    "name": "search_rules_params_object",
    "type": "multiOptions",
    "description": "Rules search parameters.",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Query",
        "value": "query_string"
      },
      {
        "name": "Anchoring",
        "value": "anchoring_options"
      },
      {
        "name": "Context",
        "value": "context_string"
      },
      {
        "name": "Page",
        "value": "page_number"
      },
      {
        "name": "Hits Per Page",
        "value": "hitsPerPage_number"
      },
      {
        "name": "Enabled",
        "value": "enabled"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Rules"
        ],
        "operation": [
          "searchRules"
        ]
      }
    }
  },
  {
    "type": "string",
    "description": "Search query for rules.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "query"
      }
    },
    "displayName": "Query",
    "name": "query_string",
    "default": "",
    "displayOptions": {
      "show": {
        "search_rules_params_object": [
          "query_string"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "searchRules"
        ]
      }
    }
  },
  {
    "type": "options",
    "description": "Which part of the search query the pattern should match:\n\n- `startsWith`. The pattern must match the beginning of the query.\n- `endsWith`. The pattern must match the end of the query.\n- `is`. The pattern must match the query exactly.\n- `contains`. The pattern must match anywhere in the query.\n\nEmpty queries are only allowed as patterns with `anchoring: is`.\n",
    "required": false,
    "options": [
      {
        "name": "is",
        "value": "is"
      },
      {
        "name": "startsWith",
        "value": "startsWith"
      },
      {
        "name": "endsWith",
        "value": "endsWith"
      },
      {
        "name": "contains",
        "value": "contains"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "anchoring"
      }
    },
    "displayName": "Anchoring",
    "name": "anchoring_options",
    "default": "",
    "displayOptions": {
      "show": {
        "search_rules_params_object": [
          "anchoring_options"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "searchRules"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "mobile",
    "description": "Only return rules that match the context (exact match).",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "context"
      }
    },
    "displayName": "Context",
    "name": "context_string",
    "default": "",
    "displayOptions": {
      "show": {
        "search_rules_params_object": [
          "context_string"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "searchRules"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Requested page of the API response.\n\nAlgolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js/)).\n\n- `hitsPerPage`: sets the number of search results (_hits_) displayed per page.\n- `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.\n\nFor example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.\n",
    "required": false,
    "typeOptions": {
      "minValue": 0
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "page"
      }
    },
    "displayName": "Page",
    "name": "page_number",
    "default": "",
    "displayOptions": {
      "show": {
        "search_rules_params_object": [
          "page_number"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "searchRules"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 20,
    "description": "Maximum number of hits per page.\n\nAlgolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js/)).\n\n- `hitsPerPage`: sets the number of search results (_hits_) displayed per page.\n- `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.\n\nFor example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.\n",
    "required": false,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 1000
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "hitsPerPage"
      }
    },
    "displayName": "Hits Per Page",
    "name": "hitsPerPage_number",
    "displayOptions": {
      "show": {
        "search_rules_params_object": [
          "hitsPerPage_number"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "searchRules"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "enabled",
    "displayName": "Enabled",
    "default": "",
    "options": [
      {
        "name": "Boolean",
        "value": "boolean"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "enabled",
        "value": "={{ typeof $parameter.enabled_boolean !== \"undefined\" ? $parameter.enabled_boolean : typeof $parameter.enabled_null !== \"undefined\" ? JSON.parse($parameter.enabled_null) : undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "search_rules_params_object": [
          "enabled"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "searchRules"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "If `true`, return only enabled rules.\nIf `false`, return only inactive rules.\nBy default, _all_ rules are returned.\n",
    "required": false,
    "displayName": "Enabled",
    "name": "enabled_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "search_rules_params_object": [
          "enabled"
        ],
        "enabled": [
          "boolean"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "searchRules"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "enabled",
    "name": "enabled_null",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "enabled": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "search_rules_params_object": [
          "enabled"
        ],
        "enabled": [
          "null"
        ],
        "resource": [
          "Rules"
        ],
        "operation": [
          "searchRules"
        ]
      }
    }
  },
  {
    "type": "options",
    "required": true,
    "options": [
      {
        "name": "plurals",
        "value": "plurals"
      },
      {
        "name": "stopwords",
        "value": "stopwords"
      },
      {
        "name": "compounds",
        "value": "compounds"
      }
    ],
    "displayName": "Dictionary Name",
    "name": "dictionaryName_options",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "batchDictionaryEntries"
        ]
      }
    }
  },
  {
    "displayName": "Batch Dictionary Entries Params",
    "name": "batch_dictionary_entries_params_object",
    "type": "multiOptions",
    "description": "Request body for updating dictionary entries.",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Clear Existing Dictionary Entries",
        "value": "clearExistingDictionaryEntries_boolean"
      },
      {
        "name": "Requests",
        "value": "requests_fixedCollection"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "batchDictionaryEntries"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "description": "Whether to replace all custom entries in the dictionary with the ones sent with this request.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "clearExistingDictionaryEntries"
      }
    },
    "displayName": "Clear Existing Dictionary Entries",
    "name": "clearExistingDictionaryEntries_boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "batch_dictionary_entries_params_object": [
          "clearExistingDictionaryEntries_boolean"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "batchDictionaryEntries"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Requests",
    "name": "requests_fixedCollection",
    "default": "",
    "description": "List of additions and deletions to your dictionaries.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "requests"
      }
    },
    "displayOptions": {
      "show": {
        "batch_dictionary_entries_params_object": [
          "requests_fixedCollection"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "batchDictionaryEntries"
        ]
      }
    }
  },
  {
    "type": "options",
    "required": true,
    "options": [
      {
        "name": "plurals",
        "value": "plurals"
      },
      {
        "name": "stopwords",
        "value": "stopwords"
      },
      {
        "name": "compounds",
        "value": "compounds"
      }
    ],
    "displayName": "Dictionary Name",
    "name": "dictionaryName_options",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "searchDictionaryEntries"
        ]
      }
    }
  },
  {
    "displayName": "Search Dictionary Entries Params",
    "name": "search_dictionary_entries_params_object",
    "type": "multiOptions",
    "description": "Search parameter.",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Query",
        "value": "query_string"
      },
      {
        "name": "Page",
        "value": "page_number"
      },
      {
        "name": "Hits Per Page",
        "value": "hitsPerPage_number"
      },
      {
        "name": "Language",
        "value": "language_options"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "searchDictionaryEntries"
        ]
      }
    }
  },
  {
    "type": "string",
    "description": "Search query.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "query"
      }
    },
    "displayName": "Query",
    "name": "query_string",
    "default": "",
    "displayOptions": {
      "show": {
        "search_dictionary_entries_params_object": [
          "query_string"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "searchDictionaryEntries"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Page of search results to retrieve.",
    "required": false,
    "typeOptions": {
      "minValue": 0
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "page"
      }
    },
    "displayName": "Page",
    "name": "page_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "search_dictionary_entries_params_object": [
          "page_number"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "searchDictionaryEntries"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 20,
    "description": "Number of hits per page.",
    "required": false,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 1000
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "hitsPerPage"
      }
    },
    "displayName": "Hits Per Page",
    "name": "hitsPerPage_number",
    "displayOptions": {
      "show": {
        "search_dictionary_entries_params_object": [
          "hitsPerPage_number"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "searchDictionaryEntries"
        ]
      }
    }
  },
  {
    "type": "options",
    "description": "ISO code for a supported language.",
    "required": false,
    "options": [
      {
        "name": "af",
        "value": "af"
      },
      {
        "name": "ar",
        "value": "ar"
      },
      {
        "name": "az",
        "value": "az"
      },
      {
        "name": "bg",
        "value": "bg"
      },
      {
        "name": "bn",
        "value": "bn"
      },
      {
        "name": "ca",
        "value": "ca"
      },
      {
        "name": "cs",
        "value": "cs"
      },
      {
        "name": "cy",
        "value": "cy"
      },
      {
        "name": "da",
        "value": "da"
      },
      {
        "name": "de",
        "value": "de"
      },
      {
        "name": "el",
        "value": "el"
      },
      {
        "name": "en",
        "value": "en"
      },
      {
        "name": "eo",
        "value": "eo"
      },
      {
        "name": "es",
        "value": "es"
      },
      {
        "name": "et",
        "value": "et"
      },
      {
        "name": "eu",
        "value": "eu"
      },
      {
        "name": "fa",
        "value": "fa"
      },
      {
        "name": "fi",
        "value": "fi"
      },
      {
        "name": "fo",
        "value": "fo"
      },
      {
        "name": "fr",
        "value": "fr"
      },
      {
        "name": "ga",
        "value": "ga"
      },
      {
        "name": "gl",
        "value": "gl"
      },
      {
        "name": "he",
        "value": "he"
      },
      {
        "name": "hi",
        "value": "hi"
      },
      {
        "name": "hu",
        "value": "hu"
      },
      {
        "name": "hy",
        "value": "hy"
      },
      {
        "name": "id",
        "value": "id"
      },
      {
        "name": "is",
        "value": "is"
      },
      {
        "name": "it",
        "value": "it"
      },
      {
        "name": "ja",
        "value": "ja"
      },
      {
        "name": "ka",
        "value": "ka"
      },
      {
        "name": "kk",
        "value": "kk"
      },
      {
        "name": "ko",
        "value": "ko"
      },
      {
        "name": "ku",
        "value": "ku"
      },
      {
        "name": "ky",
        "value": "ky"
      },
      {
        "name": "lt",
        "value": "lt"
      },
      {
        "name": "lv",
        "value": "lv"
      },
      {
        "name": "mi",
        "value": "mi"
      },
      {
        "name": "mn",
        "value": "mn"
      },
      {
        "name": "mr",
        "value": "mr"
      },
      {
        "name": "ms",
        "value": "ms"
      },
      {
        "name": "mt",
        "value": "mt"
      },
      {
        "name": "nb",
        "value": "nb"
      },
      {
        "name": "nl",
        "value": "nl"
      },
      {
        "name": "no",
        "value": "no"
      },
      {
        "name": "ns",
        "value": "ns"
      },
      {
        "name": "pl",
        "value": "pl"
      },
      {
        "name": "ps",
        "value": "ps"
      },
      {
        "name": "pt",
        "value": "pt"
      },
      {
        "name": "pt-br",
        "value": "pt-br"
      },
      {
        "name": "qu",
        "value": "qu"
      },
      {
        "name": "ro",
        "value": "ro"
      },
      {
        "name": "ru",
        "value": "ru"
      },
      {
        "name": "sk",
        "value": "sk"
      },
      {
        "name": "sq",
        "value": "sq"
      },
      {
        "name": "sv",
        "value": "sv"
      },
      {
        "name": "sw",
        "value": "sw"
      },
      {
        "name": "ta",
        "value": "ta"
      },
      {
        "name": "te",
        "value": "te"
      },
      {
        "name": "th",
        "value": "th"
      },
      {
        "name": "tl",
        "value": "tl"
      },
      {
        "name": "tn",
        "value": "tn"
      },
      {
        "name": "tr",
        "value": "tr"
      },
      {
        "name": "tt",
        "value": "tt"
      },
      {
        "name": "uk",
        "value": "uk"
      },
      {
        "name": "ur",
        "value": "ur"
      },
      {
        "name": "uz",
        "value": "uz"
      },
      {
        "name": "zh",
        "value": "zh"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "language"
      }
    },
    "displayName": "Language",
    "name": "language_options",
    "default": "",
    "displayOptions": {
      "show": {
        "search_dictionary_entries_params_object": [
          "language_options"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "searchDictionaryEntries"
        ]
      }
    }
  },
  {
    "displayName": "Dictionary Settings Params",
    "name": "dictionary_settings_params_object",
    "type": "multiOptions",
    "description": "Turn on or off the built-in Algolia stop words for a specific language.\n",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Disable Standard Entries",
        "value": "disable_standard_entries_object"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "setDictionarySettings"
        ]
      }
    }
  },
  {
    "displayName": "Disable Standard Entries",
    "name": "disable_standard_entries_object",
    "type": "multiOptions",
    "description": "Key-value pairs of [supported language ISO codes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages/) and boolean values.\n",
    "required": false,
    "default": [],
    "options": [
      {
        "name": "Plurals",
        "value": "plurals_disableStandardEntries"
      },
      {
        "name": "Stopwords",
        "value": "stopwords_disableStandardEntries"
      },
      {
        "name": "Compounds",
        "value": "compounds_disableStandardEntries"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "property": "disableStandardEntries",
        "value": "={{ { \"plurals\": typeof $parameter.plurals_boolean_disableStandardEntries !== \"undefined\" ? $parameter.plurals_boolean_disableStandardEntries : typeof $parameter.plurals_null_disableStandardEntries !== \"undefined\" ? JSON.parse($parameter.plurals_null_disableStandardEntries) : undefined, \"stopwords\": typeof $parameter.stopwords_boolean_disableStandardEntries !== \"undefined\" ? $parameter.stopwords_boolean_disableStandardEntries : typeof $parameter.stopwords_null_disableStandardEntries !== \"undefined\" ? JSON.parse($parameter.stopwords_null_disableStandardEntries) : undefined, \"compounds\": typeof $parameter.compounds_boolean_disableStandardEntries !== \"undefined\" ? $parameter.compounds_boolean_disableStandardEntries : typeof $parameter.compounds_null_disableStandardEntries !== \"undefined\" ? JSON.parse($parameter.compounds_null_disableStandardEntries) : undefined } }}"
      }
    },
    "displayOptions": {
      "show": {
        "dictionary_settings_params_object": [
          "disable_standard_entries_object"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "setDictionarySettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "plurals_disableStandardEntries",
    "displayName": "Plurals",
    "default": "",
    "options": [
      {
        "name": "Object",
        "value": "object"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "displayOptions": {
      "show": {
        "dictionary_settings_params_object": [
          "disable_standard_entries_object"
        ],
        "disable_standard_entries_object": [
          "plurals_disableStandardEntries"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "setDictionarySettings"
        ]
      }
    }
  },
  {
    "type": "fixedCollection",
    "required": false,
    "displayName": "Plurals",
    "name": "plurals_boolean_disableStandardEntries",
    "default": "",
    "description": "Key-value pair of a language ISO code and a boolean value.",
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "plurals_boolean",
        "displayName": "Plurals",
        "values": []
      }
    ],
    "displayOptions": {
      "show": {
        "dictionary_settings_params_object": [
          "disable_standard_entries_object"
        ],
        "disable_standard_entries_object": [
          "plurals_disableStandardEntries"
        ],
        "plurals_disableStandardEntries": [
          "object"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "setDictionarySettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "plurals",
    "name": "plurals_null_disableStandardEntries",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "plurals": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "dictionary_settings_params_object": [
          "disable_standard_entries_object"
        ],
        "disable_standard_entries_object": [
          "plurals_disableStandardEntries"
        ],
        "plurals_disableStandardEntries": [
          "null"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "setDictionarySettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "stopwords_disableStandardEntries",
    "displayName": "Stopwords",
    "default": "",
    "options": [
      {
        "name": "Object",
        "value": "object"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "displayOptions": {
      "show": {
        "dictionary_settings_params_object": [
          "disable_standard_entries_object"
        ],
        "disable_standard_entries_object": [
          "stopwords_disableStandardEntries"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "setDictionarySettings"
        ]
      }
    }
  },
  {
    "type": "fixedCollection",
    "required": false,
    "displayName": "Stopwords",
    "name": "stopwords_boolean_disableStandardEntries",
    "default": "",
    "description": "Key-value pair of a language ISO code and a boolean value.",
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "stopwords_boolean",
        "displayName": "Stopwords",
        "values": []
      }
    ],
    "displayOptions": {
      "show": {
        "dictionary_settings_params_object": [
          "disable_standard_entries_object"
        ],
        "disable_standard_entries_object": [
          "stopwords_disableStandardEntries"
        ],
        "stopwords_disableStandardEntries": [
          "object"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "setDictionarySettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "stopwords",
    "name": "stopwords_null_disableStandardEntries",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "stopwords": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "dictionary_settings_params_object": [
          "disable_standard_entries_object"
        ],
        "disable_standard_entries_object": [
          "stopwords_disableStandardEntries"
        ],
        "stopwords_disableStandardEntries": [
          "null"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "setDictionarySettings"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "compounds_disableStandardEntries",
    "displayName": "Compounds",
    "default": "",
    "options": [
      {
        "name": "Object",
        "value": "object"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "displayOptions": {
      "show": {
        "dictionary_settings_params_object": [
          "disable_standard_entries_object"
        ],
        "disable_standard_entries_object": [
          "compounds_disableStandardEntries"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "setDictionarySettings"
        ]
      }
    }
  },
  {
    "type": "fixedCollection",
    "required": false,
    "displayName": "Compounds",
    "name": "compounds_boolean_disableStandardEntries",
    "default": "",
    "description": "Key-value pair of a language ISO code and a boolean value.",
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "compounds_boolean",
        "displayName": "Compounds",
        "values": []
      }
    ],
    "displayOptions": {
      "show": {
        "dictionary_settings_params_object": [
          "disable_standard_entries_object"
        ],
        "disable_standard_entries_object": [
          "compounds_disableStandardEntries"
        ],
        "compounds_disableStandardEntries": [
          "object"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "setDictionarySettings"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "compounds",
    "name": "compounds_null_disableStandardEntries",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "compounds": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "dictionary_settings_params_object": [
          "disable_standard_entries_object"
        ],
        "disable_standard_entries_object": [
          "compounds_disableStandardEntries"
        ],
        "compounds_disableStandardEntries": [
          "null"
        ],
        "resource": [
          "Dictionaries"
        ],
        "operation": [
          "setDictionarySettings"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "user1",
    "description": "Unique identifier of the user who makes the search request.",
    "typeOptions": {
      "pattern": "^[a-zA-Z0-9 \\-*.]+$"
    },
    "required": true,
    "displayName": "X-Algolia-User-ID",
    "name": "X-Algolia-User-ID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Clusters"
        ],
        "operation": [
          "assignUserId"
        ]
      }
    }
  },
  {
    "displayName": "Assign User Id Params",
    "name": "assign_user_id_params_object",
    "type": "multiOptions",
    "description": "Assign userID parameters.",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Cluster",
        "value": "cluster_string"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Clusters"
        ],
        "operation": [
          "assignUserId"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "c11-test",
    "description": "Cluster name.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "cluster"
      }
    },
    "displayName": "Cluster",
    "name": "cluster_string",
    "default": "",
    "displayOptions": {
      "show": {
        "assign_user_id_params_object": [
          "cluster_string"
        ],
        "resource": [
          "Clusters"
        ],
        "operation": [
          "assignUserId"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "page",
    "displayName": "Page",
    "default": "",
    "options": [
      {
        "name": "Integer",
        "value": "integer"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "page": "={{$value}}"
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Clusters"
        ],
        "operation": [
          "listUserIds"
        ]
      }
    }
  },
  {
    "type": "number",
    "required": false,
    "typeOptions": {
      "minValue": 0
    },
    "displayName": "Page",
    "name": "page_number",
    "default": "",
    "displayOptions": {
      "show": {
        "page": [
          "integer"
        ],
        "resource": [
          "Clusters"
        ],
        "operation": [
          "listUserIds"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "page",
    "name": "page_null",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "page": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "page": [
          "null"
        ],
        "resource": [
          "Clusters"
        ],
        "operation": [
          "listUserIds"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 100,
    "required": false,
    "displayName": "Hits Per Page",
    "name": "hitsPerPage_number",
    "displayOptions": {
      "show": {
        "resource": [
          "Clusters"
        ],
        "operation": [
          "listUserIds"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "user1",
    "description": "Unique identifier of the user who makes the search request.",
    "typeOptions": {
      "pattern": "^[a-zA-Z0-9 \\-*.]+$"
    },
    "required": true,
    "displayName": "X-Algolia-User-ID",
    "name": "X-Algolia-User-ID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Clusters"
        ],
        "operation": [
          "batchAssignUserIds"
        ]
      }
    }
  },
  {
    "displayName": "Batch Assign User Ids Params",
    "name": "batch_assign_user_ids_params_object",
    "type": "multiOptions",
    "description": "Assign userID parameters.",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Cluster",
        "value": "cluster_string"
      },
      {
        "name": "Users",
        "value": "users_json"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Clusters"
        ],
        "operation": [
          "batchAssignUserIds"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "c11-test",
    "description": "Cluster name.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "cluster"
      }
    },
    "displayName": "Cluster",
    "name": "cluster_string",
    "default": "",
    "displayOptions": {
      "show": {
        "batch_assign_user_ids_params_object": [
          "cluster_string"
        ],
        "resource": [
          "Clusters"
        ],
        "operation": [
          "batchAssignUserIds"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Users",
    "name": "users_json",
    "default": "[]",
    "description": "User IDs to assign.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "users"
      }
    },
    "displayOptions": {
      "show": {
        "batch_assign_user_ids_params_object": [
          "users_json"
        ],
        "resource": [
          "Clusters"
        ],
        "operation": [
          "batchAssignUserIds"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "user1",
    "description": "Unique identifier of the user who makes the search request.",
    "typeOptions": {
      "pattern": "^[a-zA-Z0-9 \\-*.]+$"
    },
    "required": true,
    "displayName": "User ID",
    "name": "userID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Clusters"
        ],
        "operation": [
          "getUserId"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "user1",
    "description": "Unique identifier of the user who makes the search request.",
    "typeOptions": {
      "pattern": "^[a-zA-Z0-9 \\-*.]+$"
    },
    "required": true,
    "displayName": "User ID",
    "name": "userID_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Clusters"
        ],
        "operation": [
          "removeUserId"
        ]
      }
    }
  },
  {
    "displayName": "Search User Ids Params",
    "name": "search_user_ids_params_object",
    "type": "multiOptions",
    "description": "OK",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Query",
        "value": "query_string"
      },
      {
        "name": "Cluster Name",
        "value": "clusterName_string"
      },
      {
        "name": "Page",
        "value": "page_number"
      },
      {
        "name": "Hits Per Page",
        "value": "hitsPerPage_number"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Clusters"
        ],
        "operation": [
          "searchUserIds"
        ]
      }
    }
  },
  {
    "type": "string",
    "description": "Query to search. The search is a prefix search with [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/) enabled. An empty query will retrieve all users.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "query"
      }
    },
    "displayName": "Query",
    "name": "query_string",
    "default": "",
    "displayOptions": {
      "show": {
        "search_user_ids_params_object": [
          "query_string"
        ],
        "resource": [
          "Clusters"
        ],
        "operation": [
          "searchUserIds"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "c11-test",
    "description": "Cluster name.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "clusterName"
      }
    },
    "displayName": "Cluster Name",
    "name": "clusterName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "search_user_ids_params_object": [
          "clusterName_string"
        ],
        "resource": [
          "Clusters"
        ],
        "operation": [
          "searchUserIds"
        ]
      }
    }
  },
  {
    "type": "number",
    "description": "Page of search results to retrieve.",
    "required": false,
    "typeOptions": {
      "minValue": 0
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "page"
      }
    },
    "displayName": "Page",
    "name": "page_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "search_user_ids_params_object": [
          "page_number"
        ],
        "resource": [
          "Clusters"
        ],
        "operation": [
          "searchUserIds"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 20,
    "description": "Number of hits per page.",
    "required": false,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 1000
    },
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "hitsPerPage"
      }
    },
    "displayName": "Hits Per Page",
    "name": "hitsPerPage_number",
    "displayOptions": {
      "show": {
        "search_user_ids_params_object": [
          "hitsPerPage_number"
        ],
        "resource": [
          "Clusters"
        ],
        "operation": [
          "searchUserIds"
        ]
      }
    }
  },
  {
    "type": "boolean",
    "required": false,
    "displayName": "Get Clusters",
    "name": "getClusters_boolean",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Clusters"
        ],
        "operation": [
          "hasPendingMappings"
        ]
      }
    }
  },
  {
    "type": "fixedCollection",
    "displayName": "Fixed Collection",
    "name": "undefined_fixedCollection",
    "default": "",
    "description": "Sources.",
    "required": false,
    "typeOptions": {
      "multipleValues": true
    },
    "options": [
      {
        "name": "undefined_fixedCollection_values",
        "displayName": "Fixed Collection",
        "values": [
          {
            "type": "string",
            "placeholder": "10.0.0.1/32",
            "description": "IP address range of the source.",
            "required": false,
            "routing": {
              "send": {
                "type": "body",
                "value": "={{ $value }}",
                "property": "source"
              }
            },
            "displayName": "Source",
            "name": "source_string",
            "default": ""
          },
          {
            "type": "string",
            "placeholder": "Server subnet",
            "description": "Source description.",
            "required": false,
            "routing": {
              "send": {
                "type": "body",
                "value": "={{ $value }}",
                "property": "description"
              }
            },
            "displayName": "Description",
            "name": "description_string",
            "default": ""
          }
        ]
      }
    ],
    "displayOptions": {
      "show": {
        "resource": [
          "Vaults"
        ],
        "operation": [
          "replaceSources"
        ]
      }
    }
  },
  {
    "displayName": "Multiple properties",
    "name": "multiple_properties_object",
    "type": "multiOptions",
    "description": "Source.",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Source",
        "value": "source_string"
      },
      {
        "name": "Description",
        "value": "description_string"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Vaults"
        ],
        "operation": [
          "appendSource"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "10.0.0.1/32",
    "description": "IP address range of the source.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "source"
      }
    },
    "displayName": "Source",
    "name": "source_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "source_string"
        ],
        "resource": [
          "Vaults"
        ],
        "operation": [
          "appendSource"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "Server subnet",
    "description": "Source description.",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "description"
      }
    },
    "displayName": "Description",
    "name": "description_string",
    "default": "",
    "displayOptions": {
      "show": {
        "multiple_properties_object": [
          "description_string"
        ],
        "resource": [
          "Vaults"
        ],
        "operation": [
          "appendSource"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "10.0.0.1/32",
    "required": true,
    "displayName": "Source",
    "name": "source_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Vaults"
        ],
        "operation": [
          "deleteSource"
        ]
      }
    }
  },
  {
    "type": "number",
    "required": false,
    "displayName": "Offset",
    "name": "offset_number",
    "default": 0,
    "displayOptions": {
      "show": {
        "resource": [
          "Advanced"
        ],
        "operation": [
          "getLogs"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 10,
    "required": false,
    "typeOptions": {
      "maxValue": 1000
    },
    "displayName": "Length",
    "name": "length_number",
    "displayOptions": {
      "show": {
        "resource": [
          "Advanced"
        ],
        "operation": [
          "getLogs"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "indexName",
    "displayName": "Index Name",
    "default": "",
    "options": [
      {
        "name": "String",
        "value": "string"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "indexName": "={{$value}}"
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Advanced"
        ],
        "operation": [
          "getLogs"
        ]
      }
    }
  },
  {
    "type": "options",
    "required": false,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "indexName": [
          "string"
        ],
        "resource": [
          "Advanced"
        ],
        "operation": [
          "getLogs"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "json",
    "displayName": "indexName",
    "name": "indexName_null",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "indexName": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "indexName": [
          "null"
        ],
        "resource": [
          "Advanced"
        ],
        "operation": [
          "getLogs"
        ]
      }
    }
  },
  {
    "type": "options",
    "default": "all",
    "required": false,
    "options": [
      {
        "name": "all",
        "value": "all"
      },
      {
        "name": "query",
        "value": "query"
      },
      {
        "name": "build",
        "value": "build"
      },
      {
        "name": "error",
        "value": "error"
      }
    ],
    "displayName": "Type",
    "name": "type_options",
    "displayOptions": {
      "show": {
        "resource": [
          "Advanced"
        ],
        "operation": [
          "getLogs"
        ]
      }
    }
  },
  {
    "type": "number",
    "placeholder": "1506303845001",
    "required": true,
    "displayName": "Task ID",
    "name": "taskID_number",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Advanced"
        ],
        "operation": [
          "getAppTask"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Indices"
        ],
        "operation": [
          "getTask"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "type": "number",
    "placeholder": "1506303845001",
    "required": true,
    "displayName": "Task ID",
    "name": "taskID_number",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Indices"
        ],
        "operation": [
          "getTask"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "ALGOLIA_INDEX_NAME",
    "required": true,
    "displayName": "Index Name",
    "name": "indexName_string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "Indices"
        ],
        "operation": [
          "operationIndex"
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": "GET",
            "url": "/1/indexes"
          },
          "output": {
            "postReceive": [
              {
                "type": "rootProperty",
                "properties": {
                  "property": "items"
                }
              },
              {
                "type": "setKeyValue",
                "properties": {
                  "name": "={{ $responseItem.name }}",
                  "value": "={{ $responseItem.name }}"
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "displayName": "Operation Index Params",
    "name": "operation_index_params_object",
    "type": "multiOptions",
    "required": true,
    "default": [],
    "options": [
      {
        "name": "Operation",
        "value": "operation_options"
      },
      {
        "name": "Destination",
        "value": "destination_string"
      },
      {
        "name": "Scope",
        "value": "scope_json"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ undefined }}"
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Indices"
        ],
        "operation": [
          "operationIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "placeholder": "copy",
    "description": "Operation to perform on the index.",
    "required": false,
    "options": [
      {
        "name": "move",
        "value": "move"
      },
      {
        "name": "copy",
        "value": "copy"
      }
    ],
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "operation"
      }
    },
    "displayName": "Operation",
    "name": "operation_options",
    "default": "",
    "displayOptions": {
      "show": {
        "operation_index_params_object": [
          "operation_options"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "operationIndex"
        ]
      }
    }
  },
  {
    "type": "string",
    "placeholder": "products",
    "description": "Index name (case-sensitive).",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ $value }}",
        "property": "destination"
      }
    },
    "displayName": "Destination",
    "name": "destination_string",
    "default": "",
    "displayOptions": {
      "show": {
        "operation_index_params_object": [
          "destination_string"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "operationIndex"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "Scope",
    "name": "scope_json",
    "default": "[]",
    "description": "**Only for copying.**\n\nIf you specify a scope, only the selected scopes are copied. Records and the other scopes are left unchanged.\nIf you omit the `scope` parameter, everything is copied: records, settings, synonyms, and rules.\n",
    "required": false,
    "routing": {
      "send": {
        "type": "body",
        "value": "={{ JSON.parse($value) }}",
        "property": "scope"
      }
    },
    "displayOptions": {
      "show": {
        "operation_index_params_object": [
          "scope_json"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "operationIndex"
        ]
      }
    }
  },
  {
    "type": "options",
    "name": "page",
    "displayName": "Page",
    "default": "",
    "options": [
      {
        "name": "Integer",
        "value": "integer"
      },
      {
        "name": "Null",
        "value": "null"
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "page": "={{$value}}"
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          "Indices"
        ],
        "operation": [
          "listIndices"
        ]
      }
    }
  },
  {
    "type": "number",
    "required": false,
    "typeOptions": {
      "minValue": 0
    },
    "displayName": "Page",
    "name": "page_number",
    "default": "",
    "displayOptions": {
      "show": {
        "page": [
          "integer"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "listIndices"
        ]
      }
    }
  },
  {
    "type": "json",
    "displayName": "page",
    "name": "page_null",
    "default": "null",
    "required": false,
    "disabledOptions": {
      "show": {
        "page": [
          "null"
        ]
      }
    },
    "displayOptions": {
      "show": {
        "page": [
          "null"
        ],
        "resource": [
          "Indices"
        ],
        "operation": [
          "listIndices"
        ]
      }
    }
  },
  {
    "type": "number",
    "default": 100,
    "required": false,
    "displayName": "Hits Per Page",
    "name": "hitsPerPage_number",
    "displayOptions": {
      "show": {
        "resource": [
          "Indices"
        ],
        "operation": [
          "listIndices"
        ]
      }
    }
  }
];

export default properties;
