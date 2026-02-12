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
        resource: ['Search'],
        operation: ['searchSingleIndex'],
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
        type: 'options',
        displayName: 'Search Params',
        name: 'searchParams_options',
        default: 'search_parameters_as_query_string_object',
        options: [
          {
            name: 'Search Parameters As Query String',
            value: 'search_parameters_as_query_string_object',
          },
          {
            name: 'Search Parameters As Object',
            value: 'search_parameters_as_object',
          },
        ],
        required: false,
      },
      {
        type: 'string',
        placeholder: 'hitsPerPage=2&getRankingInfo=1',
        default: '',
        description: 'Search parameters as a URL-encoded query string.',
        displayName: 'Params',
        name: 'params_string',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_query_string_object'],
          },
        },
      },
      {
        type: 'string',
        default: '',
        description: 'Search query.',
        displayName: 'Query',
        name: 'query_string',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'string',
        placeholder: 'comedy drama crime Macy Buscemi',
        default: '',
        description:
          'Keywords to be used instead of the search query to conduct a more broader search\nUsing the `similarQuery` parameter changes other settings\n- `queryType` is set to `prefixNone`.\n- `removeStopWords` is set to true.\n- `words` is set as the first ranking criterion.\n- All remaining words are treated as `optionalWords`\nSince the `similarQuery` is supposed to do a broad search, they usually return many results.\nCombine it with `filters` to narrow down the list of results.\n',
        displayName: 'Similar Query',
        name: 'similarQuery_string',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'string',
        placeholder: '(category:Book OR category:Ebook) AND _tags:published',
        default: '',
        description:
          "Filter expression to only include items that match the filter criteria in the response.\n\nYou can use these filter expressions:\n\n- **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`.\n- **Ranges.** `<facet>:<lower> TO <upper>`, where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive).\n- **Facet filters.** `<facet>:<value>`, where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value.\n- **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive).\n- **Boolean filters.** `<facet>: true | false`.\n\nYou can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:\n\n- You can only combine filters of the same type with `OR`.\n  **Not supported:** `facet:value OR num > 3`.\n- You can't use `NOT` with combinations of filters.\n  **Not supported:** `NOT(facet:value OR facet:value)`\n- You can't combine conjunctions (`AND`) with `OR`.\n  **Not supported:** `facet:value OR (facet:value AND facet:value)`\n\nUse quotes if the facet attribute name or facet value contains spaces, keywords (`OR`, `AND`, `NOT`), or quotes.\nIf a facet attribute is an array, the filter matches if it matches at least one element of the array.\n\nFor more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering).\n",
        displayName: 'Filters',
        name: 'filters_string',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        name: 'facetFilters',
        displayName: 'Facet Filters',
        default: '',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        name: 'optionalFilters',
        displayName: 'Optional Filters',
        default: '',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        name: 'numericFilters',
        displayName: 'Numeric Filters',
        default: '',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        name: 'tagFilters',
        displayName: 'Tag Filters',
        default: '',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: false,
        description:
          'Whether to sum all filter scores\nIf true, all filter scores are summed.\nOtherwise, the maximum filter score is kept.\nFor more information, see [filter scores](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/in-depth/filter-scoring/#accumulating-scores-with-sumorfiltersscores).\n',
        displayName: 'Sum Or Filters Scores',
        name: 'sumOrFiltersScores_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Restrict Searchable Attributes',
        name: 'restrictSearchableAttributes_json',
        default: '[]',
        description:
          'Restricts a search to a subset of your searchable attributes.\nAttribute names are case-sensitive.\n',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Facets',
        name: 'facets_json',
        default: '[]',
        description:
          'Facets for which to retrieve facet values that match the search criteria and the number of matching facet values\nTo retrieve all facets, use the wildcard character `*`.\nFor more information, see [facets](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#contextual-facet-values-and-counts).\n',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: false,
        description:
          "Whether faceting should be applied after deduplication with `distinct`\nThis leads to accurate facet counts when using faceting in combination with `distinct`.\nIt's usually better to use `afterDistinct` modifiers in the `attributesForFaceting` setting,\nas `facetingAfterDistinct` only computes correct facet counts if all records have the same facet values for the `attributeForDistinct`.\n",
        displayName: 'Faceting After Distinct',
        name: 'facetingAfterDistinct_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'number',
        default: '',
        description: 'Page of search results to retrieve.',
        typeOptions: {
          minValue: 0,
        },
        displayName: 'Page',
        name: 'page_number',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'number',
        default: '',
        description: 'Position of the first hit to retrieve.',
        displayName: 'Offset',
        name: 'offset_number',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'number',
        default: '',
        description: 'Number of hits to retrieve (used in combination with `offset`).',
        typeOptions: {
          minValue: 0,
          maxValue: 1000,
        },
        displayName: 'Length',
        name: 'length_number',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'string',
        placeholder: '40.71,-74.01',
        default: '',
        description:
          'Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.\n\nOnly records included within a circle around this central location are included in the results.\nThe radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings.\nThis parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.\n',
        displayName: 'Around Lat Lng',
        name: 'aroundLatLng_string',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: false,
        description: "Whether to obtain the coordinates from the request's IP address.",
        displayName: 'Around Lat Lng Via IP',
        name: 'aroundLatLngViaIP_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        name: 'aroundRadius',
        displayName: 'Around Radius',
        default: '',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        name: 'aroundPrecision',
        displayName: 'Around Precision',
        default: '',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'number',
        default: '',
        description:
          "Minimum radius (in meters) for a search around a location when `aroundRadius` isn't set.",
        typeOptions: {
          minValue: 1,
        },
        displayName: 'Minimum Around Radius',
        name: 'minimumAroundRadius_number',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        name: 'insideBoundingBox',
        displayName: 'Inside Bounding Box',
        default: '',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Inside Polygon',
        name: 'insidePolygon_json',
        default: '[]',
        description:
          'Coordinates of a polygon in which to search.\n\nPolygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude.\nProvide multiple polygons as nested arrays.\nFor more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\nThis parameter is ignored if you also specify `insideBoundingBox`.\n',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Natural Languages',
        name: 'naturalLanguages_json',
        default: '[]',
        description:
          'ISO language codes that adjust settings that are useful for processing natural language queries (as opposed to keyword searches)\n- Sets `removeStopWords` and `ignorePlurals` to the list of provided languages.\n- Sets `removeWordsIfNoResults` to `allOptional`.\n- Adds a `natural_language` attribute to `ruleContexts` and `analyticsTags`.\n',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Rule Contexts',
        name: 'ruleContexts_json',
        default: '[]',
        description:
          'Assigns a rule context to the search query\n[Rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/how-to/customize-search-results-by-platform/#whats-a-context) are strings that you can use to trigger matching rules.\n',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'number',
        default: 100,
        description:
          'Impact that Personalization should have on this search\nThe higher this value is, the more Personalization determines the ranking compared to other factors.\nFor more information, see [Understanding Personalization impact](https://www.algolia.com/doc/guides/personalization/personalizing-results/in-depth/configuring-personalization/#understanding-personalization-impact).\n',
        typeOptions: {
          minValue: 0,
          maxValue: 100,
        },
        displayName: 'Personalization Impact',
        name: 'personalizationImpact_number',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'string',
        placeholder: 'test-user-123',
        default: '',
        description:
          'Unique pseudonymous or anonymous user identifier.\n\nThis helps with analytics and click and conversion events.\nFor more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken).\n',
        displayName: 'User Token',
        name: 'userToken_string',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: false,
        description: 'Whether the search response should include detailed ranking information.',
        displayName: 'Get Ranking Info',
        name: 'getRankingInfo_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: true,
        description: "Whether to take into account an index's synonyms for this search.",
        displayName: 'Synonyms',
        name: 'synonyms_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: false,
        description:
          'Whether to include a `queryID` attribute in the response\nThe query ID is a unique identifier for a search query and is required for tracking [click and conversion events](https://www.algolia.com/doc/guides/sending-events/getting-started).\n',
        displayName: 'Click Analytics',
        name: 'clickAnalytics_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: true,
        description: 'Whether this search will be included in Analytics.',
        displayName: 'Analytics',
        name: 'analytics_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Analytics Tags',
        name: 'analyticsTags_json',
        default: '[]',
        description:
          'Tags to apply to the query for [segmenting analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments).',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: true,
        description: 'Whether to include this search when calculating processing-time percentiles.',
        displayName: 'Percentile Computation',
        name: 'percentileComputation_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: true,
        description: 'Whether to enable A/B testing for this search.',
        displayName: 'Enable ABTest',
        name: 'enableABTest_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Attributes To Retrieve',
        name: 'attributesToRetrieve_json',
        default: '[]',
        description:
          'Attributes to include in the API response\nTo reduce the size of your response, you can retrieve only some of the attributes.\nAttribute names are case-sensitive\n- `*` retrieves all attributes, except attributes included in the `customRanking` and `unretrievableAttributes` settings.\n- To retrieve all attributes except a specific one, prefix the attribute with a dash and combine it with the `*`: `["*", "-ATTRIBUTE"]`.\n- The `objectID` attribute is always included.\n',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Ranking',
        name: 'ranking_json',
        default: '[]',
        description:
          'Determines the order in which Algolia returns your results.\n\nBy default, each entry corresponds to a [ranking criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria).\nThe tie-breaking algorithm sequentially applies each criterion in the order they\'re specified.\nIf you configure a replica index for [sorting by an attribute](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute),\nyou put the sorting attribute at the top of the list.\n\n**Modifiers**\n\n- `asc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in ascending order.\n- `desc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in descending order.\n\nBefore you modify the default setting,\ntest your changes in the dashboard,\nand by [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing).\n',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'number',
        placeholder: '90',
        default: 100,
        description:
          "Relevancy threshold below which less relevant results aren't included in the results\nYou can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas).\nUse this setting to strike a balance between the relevance and number of returned results.\n",
        displayName: 'Relevancy Strictness',
        name: 'relevancyStrictness_number',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Attributes To Highlight',
        name: 'attributesToHighlight_json',
        default: '[]',
        description:
          'Attributes to highlight\nBy default, all searchable attributes are highlighted.\nUse `*` to highlight all attributes or use an empty array `[]` to turn off highlighting.\nAttribute names are case-sensitive\nWith highlighting, strings that match the search query are surrounded by HTML tags defined by `highlightPreTag` and `highlightPostTag`.\nYou can use this to visually highlight matching parts of a search query in your UI\nFor more information, see [Highlighting and snippeting](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js).\n',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Attributes To Snippet',
        name: 'attributesToSnippet_json',
        default: '[]',
        description:
          'Attributes for which to enable snippets.\nAttribute names are case-sensitive\nSnippets provide additional context to matched words.\nIf you enable snippets, they include 10 words, including the matched word.\nThe matched word will also be wrapped by HTML tags for highlighting.\nYou can adjust the number of words with the following notation: `ATTRIBUTE:NUMBER`,\nwhere `NUMBER` is the number of words to be extracted.\n',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'string',
        default: '<em>',
        description:
          'HTML tag to insert before the highlighted parts in all highlighted results and snippets.',
        displayName: 'Highlight Pre Tag',
        name: 'highlightPreTag_string',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'string',
        default: '</em>',
        description:
          'HTML tag to insert after the highlighted parts in all highlighted results and snippets.',
        displayName: 'Highlight Post Tag',
        name: 'highlightPostTag_string',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'string',
        default: '…',
        description: 'String used as an ellipsis indicator when a snippet is truncated.',
        displayName: 'Snippet Ellipsis Text',
        name: 'snippetEllipsisText_string',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: false,
        description:
          'Whether to restrict highlighting and snippeting to items that at least partially matched the search query.\nBy default, all items are highlighted and snippeted.\n',
        displayName: 'Restrict Highlight And Snippet Arrays',
        name: 'restrictHighlightAndSnippetArrays_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'number',
        default: 20,
        description: 'Number of hits per page.',
        typeOptions: {
          minValue: 1,
          maxValue: 1000,
        },
        displayName: 'Hits Per Page',
        name: 'hitsPerPage_number',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'number',
        default: 4,
        description:
          'Minimum number of characters a word in the search query must contain to accept matches with [one typo](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).',
        displayName: 'Min Word Sizefor1Typo',
        name: 'minWordSizefor1Typo_number',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'number',
        default: 8,
        description:
          'Minimum number of characters a word in the search query must contain to accept matches with [two typos](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).',
        displayName: 'Min Word Sizefor2Typos',
        name: 'minWordSizefor2Typos_number',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        name: 'typoTolerance',
        displayName: 'Typo Tolerance',
        default: '',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: true,
        description:
          'Whether to allow typos on numbers in the search query\nTurn off this setting to reduce the number of irrelevant matches\nwhen searching in large sets of similar numbers.\n',
        displayName: 'Allow Typos On Numeric Tokens',
        name: 'allowTyposOnNumericTokens_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Disable Typo Tolerance On Attributes',
        name: 'disableTypoToleranceOnAttributes_json',
        default: '[]',
        description:
          'Attributes for which you want to turn off [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance).\nAttribute names are case-sensitive\nReturning only exact matches can help when\n- [Searching in hyphenated attributes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes).\n- Reducing the number of matches when you have too many.\n  This can happen with attributes that are long blocks of text, such as product descriptions\nConsider alternatives such as `disableTypoToleranceOnWords` or adding synonyms if your attributes have intentional unusual spellings that might look like typos.\n',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        name: 'ignorePlurals',
        displayName: 'Ignore Plurals',
        default: '',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        name: 'removeStopWords',
        displayName: 'Remove Stop Words',
        default: '',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Query Languages',
        name: 'queryLanguages_json',
        default: '[]',
        description:
          "Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries.\nThis setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings.\nThis setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages.\nTo support this, place the CJK language **first**.\n**Always specify a query language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations).\n",
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: true,
        description:
          "Whether to split compound words in the query into their building blocks\nFor more information, see [Word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#splitting-compound-words).\nWord segmentation is supported for these languages: German, Dutch, Finnish, Swedish, and Norwegian.\nDecompounding doesn't work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark).\nFor example, `Gartenstühle` won't be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).\n",
        displayName: 'Decompound Query',
        name: 'decompoundQuery_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: true,
        description: 'Whether to enable rules.',
        displayName: 'Enable Rules',
        name: 'enableRules_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: false,
        description: 'Whether to enable Personalization.',
        displayName: 'Enable Personalization',
        name: 'enablePersonalization_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'options',
        default: 'prefixLast',
        description:
          'Determines if and how query words are interpreted as prefixes.\n\nBy default, only the last query word is treated as a prefix (`prefixLast`).\nTo turn off prefix search, use `prefixNone`.\nAvoid `prefixAll`, which treats all query words as prefixes.\nThis might lead to counterintuitive results and makes your search slower.\n\nFor more information, see [Prefix searching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/prefix-searching).\n',
        options: [
          {
            name: 'prefixLast',
            value: 'prefixLast',
          },
          {
            name: 'prefixAll',
            value: 'prefixAll',
          },
          {
            name: 'prefixNone',
            value: 'prefixNone',
          },
        ],
        displayName: 'Query Type',
        name: 'queryType_options',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'options',
        placeholder: 'firstWords',
        default: 'none',
        description:
          "Strategy for removing words from the query when it doesn't return any results.\nThis helps to avoid returning empty search results.\n\n- `none`.\n  No words are removed when a query doesn't return results.\n\n- `lastWords`.\n  Treat the last (then second to last, then third to last) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `firstWords`.\n  Treat the first (then second, then third) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `allOptional`.\n  Treat all words as optional.\n\nFor more information, see [Remove words to improve results](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/in-depth/why-use-remove-words-if-no-results).\n",
        options: [
          {
            name: 'none',
            value: 'none',
          },
          {
            name: 'lastWords',
            value: 'lastWords',
          },
          {
            name: 'firstWords',
            value: 'firstWords',
          },
          {
            name: 'allOptional',
            value: 'allOptional',
          },
        ],
        displayName: 'Remove Words If No Results',
        name: 'removeWordsIfNoResults_options',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'options',
        default: 'keywordSearch',
        description:
          'Search mode the index will use to query for results.\n\nThis setting only applies to indices, for which Algolia enabled NeuralSearch for you.\n',
        options: [
          {
            name: 'neuralSearch',
            value: 'neuralSearch',
          },
          {
            name: 'keywordSearch',
            value: 'keywordSearch',
          },
        ],
        displayName: 'Mode',
        name: 'mode_options',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        description:
          'Settings for the semantic search part of NeuralSearch.\nOnly used when `mode` is `neuralSearch`.\n',
        required: false,
        default: '{}',
        displayName: 'Semantic Search',
        name: 'semantic_search_object',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: false,
        description:
          'Whether to support phrase matching and excluding words from search queries\nUse the `advancedSyntaxFeatures` parameter to control which feature is supported.\n',
        displayName: 'Advanced Syntax',
        name: 'advancedSyntax_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        name: 'optionalWords',
        displayName: 'Optional Words',
        default: '',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Disable Exact On Attributes',
        name: 'disableExactOnAttributes_json',
        default: '[]',
        description:
          'Searchable attributes for which you want to [turn off the Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes).\nAttribute names are case-sensitive\nThis can be useful for attributes with long values, where the likelihood of an exact match is high,\nsuch as product descriptions.\nTurning off the Exact ranking criterion for these attributes favors exact matching on other attributes.\nThis reduces the impact of individual attributes with a lot of content on ranking.\n',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'options',
        default: 'attribute',
        description:
          'Determines how the [Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes) is computed when the search query has only one word.\n\n- `attribute`.\n  The Exact ranking criterion is 1 if the query word and attribute value are the same.\n  For example, a search for "road" will match the value "road", but not "road trip".\n\n- `none`.\n  The Exact ranking criterion is ignored on single-word searches.\n\n- `word`.\n  The Exact ranking criterion is 1 if the query word is found in the attribute value.\n  The query word must have at least 3 characters and must not be a stop word.\n  Only exact matches will be highlighted,\n  partial and prefix matches won\'t.\n',
        options: [
          {
            name: 'attribute',
            value: 'attribute',
          },
          {
            name: 'none',
            value: 'none',
          },
          {
            name: 'word',
            value: 'word',
          },
        ],
        displayName: 'Exact On Single Word Query',
        name: 'exactOnSingleWordQuery_options',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Alternatives As Exact',
        name: 'alternativesAsExact_json',
        default: '[]',
        description:
          'Determine which plurals and synonyms should be considered an exact matches\nBy default, Algolia treats singular and plural forms of a word, and single-word synonyms, as [exact](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#exact) matches when searching.\nFor example\n- "swimsuit" and "swimsuits" are treated the same\n- "swimsuit" and "swimwear" are treated the same (if they are [synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#regular-synonyms))\n- `ignorePlurals`.\n  Plurals and similar declensions added by the `ignorePlurals` setting are considered exact matches\n- `singleWordSynonym`.\n  Single-word synonyms, such as "NY" = "NYC", are considered exact matches\n- `multiWordsSynonym`.\n  Multi-word synonyms, such as "NY" = "New York", are considered exact matches.\n',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Advanced Syntax Features',
        name: 'advancedSyntaxFeatures_json',
        default: '[]',
        description:
          'Advanced search syntax features you want to support\n- `exactPhrase`.\n  Phrases in quotes must match exactly.\n  For example, `sparkly blue "iPhone case"` only returns records with the exact string "iPhone case"\n- `excludeWords`.\n  Query words prefixed with a `-` must not occur in a record.\n  For example, `search -engine` matches records that contain "search" but not "engine"\nThis setting only has an effect if `advancedSyntax` is true.\n',
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        name: 'distinct',
        displayName: 'Distinct',
        default: '',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: false,
        description:
          'Whether to replace a highlighted word with the matched synonym\nBy default, the original words are highlighted even if a synonym matches.\nFor example, with `home` as a synonym for `house` and a search for `home`,\nrecords matching either "home" or "house" are included in the search results,\nand either "home" or "house" are highlighted\nWith `replaceSynonymsInHighlight` set to `true`, a search for `home` still matches the same records,\nbut all occurrences of "house" are replaced by "home" in the highlighted response.\n',
        displayName: 'Replace Synonyms In Highlight',
        name: 'replaceSynonymsInHighlight_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'number',
        default: 1,
        description:
          'Minimum proximity score for two matching words\nThis adjusts the [Proximity ranking criterion](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#proximity)\nby equally scoring matches that are farther apart\nFor example, if `minProximity` is 2, neighboring matches and matches with one word between them would have the same score.\n',
        typeOptions: {
          minValue: 1,
          maxValue: 7,
        },
        displayName: 'Min Proximity',
        name: 'minProximity_number',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        displayName: 'Response Fields',
        name: 'responseFields_json',
        default: '[]',
        description:
          "Properties to include in the API response of search and browse requests\nBy default, all response properties are included.\nTo reduce the response size, you can select which properties should be included\nAn empty list may lead to an empty API response (except properties you can't exclude)\nYou can't exclude these properties:\n`message`, `warning`, `cursor`, `abTestVariantID`,\nor any property added by setting `getRankingInfo` to true\nYour search depends on the `hits` field. If you omit this field, searches won't return any results.\nYour UI might also depend on other properties, for example, for pagination.\nBefore restricting the response size, check the impact on your search experience.\n",
        required: false,
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'number',
        default: 100,
        description: 'Maximum number of facet values to return for each facet.',
        typeOptions: {
          maxValue: 1000,
        },
        displayName: 'Max Values Per Facet',
        name: 'maxValuesPerFacet_number',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'string',
        default: 'count',
        description:
          "Order in which to retrieve facet values\n- `count`.\n  Facet values are retrieved by decreasing count.\n  The count is the number of matching records containing this facet value\n- `alpha`.\n  Retrieve facet values alphabetically\nThis setting doesn't influence how facet values are displayed in your UI (see `renderingContent`).\nFor more information, see [facet value display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/js).\n",
        displayName: 'Sort Facet Values By',
        name: 'sortFacetValuesBy_string',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: false,
        description:
          'Whether the best matching attribute should be determined by minimum proximity\nThis setting only affects ranking if the Attribute ranking criterion comes before Proximity in the `ranking` setting.\nIf true, the best matching attribute is selected based on the minimum proximity of multiple matches.\nOtherwise, the best matching attribute is determined by the order in the `searchableAttributes` setting.\n',
        displayName: 'Attribute Criteria Computed By Min Proximity',
        name: 'attributeCriteriaComputedByMinProximity_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        description:
          'Extra data that can be used in the search UI.\n\nYou can use this to control aspects of your search UI, such as the order of facet names and values\nwithout changing your frontend code.\n',
        required: false,
        default: '{}',
        displayName: 'Rendering Content',
        name: 'rendering_content_object',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'boolean',
        default: true,
        description:
          'Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking)\nThis setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.\n',
        displayName: 'Enable Re Ranking',
        name: 'enableReRanking_boolean',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
      {
        type: 'json',
        name: 'reRankingApplyFilter',
        displayName: 'Re Ranking Apply Filter',
        default: '',
        displayOptions: {
          show: {
            searchParams_options: ['search_parameters_as_object'],
          },
        },
      },
    ],
    routing: {
      request: {
        body: {
          params: '={{ $value.params_string }}',
          query: '={{ $value.query_string }}',
          similarQuery: '={{ $value.similarQuery_string }}',
          filters: '={{ $value.filters_string }}',
          facetFilters: '={{ JSON.parse($value.facetFilters) }}',
          optionalFilters: '={{ JSON.parse($value.optionalFilters) }}',
          numericFilters: '={{ JSON.parse($value.numericFilters) }}',
          tagFilters: '={{ JSON.parse($value.tagFilters) }}',
          sumOrFiltersScores: '={{ $value.sumOrFiltersScores_boolean }}',
          restrictSearchableAttributes:
            '={{ JSON.parse($value.restrictSearchableAttributes_json) }}',
          facets: '={{ JSON.parse($value.facets_json) }}',
          facetingAfterDistinct: '={{ $value.facetingAfterDistinct_boolean }}',
          page: '={{ $value.page_number }}',
          offset: '={{ $value.offset_number }}',
          length: '={{ $value.length_number }}',
          aroundLatLng: '={{ $value.aroundLatLng_string }}',
          aroundLatLngViaIP: '={{ $value.aroundLatLngViaIP_boolean }}',
          aroundRadius: '={{ JSON.parse($value.aroundRadius) }}',
          aroundPrecision: '={{ JSON.parse($value.aroundPrecision) }}',
          minimumAroundRadius: '={{ $value.minimumAroundRadius_number }}',
          insideBoundingBox: '={{ JSON.parse($value.insideBoundingBox) }}',
          insidePolygon: '={{ JSON.parse($value.insidePolygon_json) }}',
          naturalLanguages: '={{ JSON.parse($value.naturalLanguages_json) }}',
          ruleContexts: '={{ JSON.parse($value.ruleContexts_json) }}',
          personalizationImpact: '={{ $value.personalizationImpact_number }}',
          userToken: '={{ $value.userToken_string }}',
          getRankingInfo: '={{ $value.getRankingInfo_boolean }}',
          synonyms: '={{ $value.synonyms_boolean }}',
          clickAnalytics: '={{ $value.clickAnalytics_boolean }}',
          analytics: '={{ $value.analytics_boolean }}',
          analyticsTags: '={{ JSON.parse($value.analyticsTags_json) }}',
          percentileComputation: '={{ $value.percentileComputation_boolean }}',
          enableABTest: '={{ $value.enableABTest_boolean }}',
          attributesToRetrieve: '={{ JSON.parse($value.attributesToRetrieve_json) }}',
          ranking: '={{ JSON.parse($value.ranking_json) }}',
          relevancyStrictness: '={{ $value.relevancyStrictness_number }}',
          attributesToHighlight: '={{ JSON.parse($value.attributesToHighlight_json) }}',
          attributesToSnippet: '={{ JSON.parse($value.attributesToSnippet_json) }}',
          highlightPreTag: '={{ $value.highlightPreTag_string }}',
          highlightPostTag: '={{ $value.highlightPostTag_string }}',
          snippetEllipsisText: '={{ $value.snippetEllipsisText_string }}',
          restrictHighlightAndSnippetArrays:
            '={{ $value.restrictHighlightAndSnippetArrays_boolean }}',
          hitsPerPage: '={{ $value.hitsPerPage_number }}',
          minWordSizefor1Typo: '={{ $value.minWordSizefor1Typo_number }}',
          minWordSizefor2Typos: '={{ $value.minWordSizefor2Typos_number }}',
          typoTolerance: '={{ JSON.parse($value.typoTolerance) }}',
          allowTyposOnNumericTokens: '={{ $value.allowTyposOnNumericTokens_boolean }}',
          disableTypoToleranceOnAttributes:
            '={{ JSON.parse($value.disableTypoToleranceOnAttributes_json) }}',
          ignorePlurals: '={{ JSON.parse($value.ignorePlurals) }}',
          removeStopWords: '={{ JSON.parse($value.removeStopWords) }}',
          queryLanguages: '={{ JSON.parse($value.queryLanguages_json) }}',
          decompoundQuery: '={{ $value.decompoundQuery_boolean }}',
          enableRules: '={{ $value.enableRules_boolean }}',
          enablePersonalization: '={{ $value.enablePersonalization_boolean }}',
          queryType: '={{ $value.queryType_options }}',
          removeWordsIfNoResults: '={{ $value.removeWordsIfNoResults_options }}',
          mode: '={{ $value.mode_options }}',
          semanticSearch: '={{ JSON.parse($value.semantic_search_object) }}',
          advancedSyntax: '={{ $value.advancedSyntax_boolean }}',
          optionalWords: '={{ JSON.parse($value.optionalWords) }}',
          disableExactOnAttributes: '={{ JSON.parse($value.disableExactOnAttributes_json) }}',
          exactOnSingleWordQuery: '={{ $value.exactOnSingleWordQuery_options }}',
          alternativesAsExact: '={{ JSON.parse($value.alternativesAsExact_json) }}',
          advancedSyntaxFeatures: '={{ JSON.parse($value.advancedSyntaxFeatures_json) }}',
          distinct: '={{ JSON.parse($value.distinct) }}',
          replaceSynonymsInHighlight: '={{ $value.replaceSynonymsInHighlight_boolean }}',
          minProximity: '={{ $value.minProximity_number }}',
          responseFields: '={{ JSON.parse($value.responseFields_json) }}',
          maxValuesPerFacet: '={{ $value.maxValuesPerFacet_number }}',
          sortFacetValuesBy: '={{ $value.sortFacetValuesBy_string }}',
          attributeCriteriaComputedByMinProximity:
            '={{ $value.attributeCriteriaComputedByMinProximity_boolean }}',
          renderingContent: '={{ JSON.parse($value.rendering_content_object) }}',
          enableReRanking: '={{ $value.enableReRanking_boolean }}',
          reRankingApplyFilter: '={{ JSON.parse($value.reRankingApplyFilter) }}',
        },
      },
    },
    displayOptions: {
      show: {
        resource: ['Search'],
        operation: ['searchSingleIndex'],
      },
    },
  },
];

export default properties;
