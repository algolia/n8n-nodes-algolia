import { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
  {
    "type": 'options',
    "placeholder": 'ALGOLIA_INDEX_NAME',
    "default": '',
    "displayName": 'Index Name',
    "name": 'indexName_string',
    "required": true,
    "description": 'Name of the index on which to perform the operation.',
    "displayOptions": {
      "show": {
        "resource": [
          'Indices'
        ],
        "operation": [
          'setSettings'
        ]
      }
    },
    "typeOptions": {
      "loadOptions": {
        "routing": {
          "request": {
            "method": 'GET',
            "url": '/1/indexes'
          },
          "output": {
            "postReceive": [
              {
                "type": 'rootProperty',
                "properties": {
                  "property": 'items'
                }
              },
              {
                "type": 'setKeyValue',
                "properties": {
                  "name": '={{ $responseItem.name }}',
                  "value": '={{ $responseItem.name }}'
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "displayName": 'Additional Properties',
    "name": 'additionalProperties',
    "type": 'collection',
    "placeholder": 'Add property',
    "default": {},
    "required": false,
    "options": [
      {
        "type": 'json',
        "displayName": 'Attributes For Faceting',
        "name": 'attributesForFaceting_json',
        "default": '[]',
        "description": 'Attributes used for [faceting](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting).\n\nFacets are attributes that let you categorize search results.\nThey can be used for filtering search results.\nBy default, no attribute is used for faceting.\nAttribute names are case-sensitive.\n\n**Modifiers**\n\n- `filterOnly("ATTRIBUTE")`.\n  Allows the attribute to be used as a filter but doesn\'t evaluate the facet values.\n\n- `searchable("ATTRIBUTE")`.\n  Allows searching for facet values.\n\n- `afterDistinct("ATTRIBUTE")`.\n  Evaluates the facet count _after_ deduplication with `distinct`.\n  This ensures accurate facet counts.\n  You can apply this modifier to searchable facets: `afterDistinct(searchable(ATTRIBUTE))`.\n',
        "required": false
      },
      {
        "type": 'json',
        "displayName": 'Replicas',
        "name": 'replicas_json',
        "default": '[]',
        "description": 'Creates [replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas).\n\nReplicas are copies of a primary index with the same records but different settings, synonyms, or rules.\nIf you want to offer a different ranking or sorting of your search results, you\'ll use replica indices.\nAll index operations on a primary index are automatically forwarded to its replicas.\nTo add a replica index, you must provide the complete set of replicas to this parameter.\nIf you omit a replica from this list, the replica turns into a regular, standalone index that will no longer be synced with the primary index.\n\n**Modifier**\n\n- `virtual("REPLICA")`.\n  Create a virtual replica,\n  Virtual replicas don\'t increase the number of records and are optimized for [Relevant sorting](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/relevant-sort).\n',
        "required": false
      },
      {
        "type": 'number',
        "placeholder": '100',
        "default": 1000,
        "description": 'Maximum number of search results that can be obtained through pagination.\n\nHigher pagination limits might slow down your search.\nFor pagination limits above 1,000, the sorting of results beyond the 1,000th hit can\'t be guaranteed.\n',
        "typeOptions": {
          "maxValue": 20000
        },
        "displayName": 'Pagination Limited To',
        "name": 'paginationLimitedTo_number'
      },
      {
        "type": 'json',
        "displayName": 'Unretrievable Attributes',
        "name": 'unretrievableAttributes_json',
        "default": '[]',
        "description": 'Attributes that can\'t be retrieved at query time.\n\nThis can be useful if you want to use an attribute for ranking or to [restrict access](https://www.algolia.com/doc/guides/security/api-keys/how-to/user-restricted-access-to-data),\nbut don\'t want to include it in the search results.\nAttribute names are case-sensitive.\n',
        "required": false
      },
      {
        "type": 'json',
        "displayName": 'Disable Typo Tolerance On Words',
        "name": 'disableTypoToleranceOnWords_json',
        "default": '[]',
        "description": 'Creates a list of [words which require exact matches](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#turn-off-typo-tolerance-for-certain-words).\nThis also turns off [word splitting and concatenation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/splitting-and-concatenation) for the specified words.\n',
        "required": false
      },
      {
        "type": 'json',
        "displayName": 'Attributes To Transliterate',
        "name": 'attributesToTransliterate_json',
        "default": '[]',
        "description": 'Attributes, for which you want to support [Japanese transliteration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#japanese-transliteration-and-type-ahead).\n\nTransliteration supports searching in any of the Japanese writing systems.\nTo support transliteration, you must set the indexing language to Japanese.\nAttribute names are case-sensitive.\n',
        "required": false
      },
      {
        "type": 'json',
        "displayName": 'Camel Case Attributes',
        "name": 'camelCaseAttributes_json',
        "default": '[]',
        "description": 'Attributes for which to split [camel case](https://wikipedia.org/wiki/Camel_case) words.\nAttribute names are case-sensitive.\n',
        "required": false
      },
      {
        "type": 'json',
        "description": 'Searchable attributes to which Algolia should apply [word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/how-to/customize-segmentation) (decompounding).\nAttribute names are case-sensitive.\n\nCompound words are formed by combining two or more individual words,\nand are particularly prevalent in Germanic languages—for example, "firefighter".\nWith decompounding, the individual components are indexed separately.\n\nYou can specify different lists for different languages.\nDecompounding is supported for these languages:\nDutch (`nl`), German (`de`), Finnish (`fi`), Danish (`da`), Swedish (`sv`), and Norwegian (`no`).\nDecompounding doesn\'t work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark).\nFor example, `Gartenstühle` won\'t be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).\n',
        "required": false,
        "default": '{}',
        "displayName": 'Decompounded Attributes',
        "name": 'decompounded_attributes_object'
      },
      {
        "type": 'json',
        "displayName": 'Index Languages',
        "name": 'indexLanguages_json',
        "default": '[]',
        "description": 'Languages for language-specific processing steps, such as word detection and dictionary settings.\n\n**You should always specify an indexing language.**\nIf you don\'t specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations).\n',
        "required": false
      },
      {
        "type": 'json',
        "displayName": 'Disable Prefix On Attributes',
        "name": 'disablePrefixOnAttributes_json',
        "default": '[]',
        "description": 'Searchable attributes for which you want to turn off [prefix matching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/#adjusting-prefix-search).\nAttribute names are case-sensitive.\n',
        "required": false
      },
      {
        "type": 'boolean',
        "default": false,
        "description": 'Whether arrays with exclusively non-negative integers should be compressed for better performance.\nIf true, the compressed arrays may be reordered.\n',
        "displayName": 'Allow Compression Of Integer Array',
        "name": 'allowCompressionOfIntegerArray_boolean'
      },
      {
        "type": 'json',
        "displayName": 'Numeric Attributes For Filtering',
        "name": 'numericAttributesForFiltering_json',
        "default": '[]',
        "description": 'Numeric attributes that can be used as [numerical filters](https://www.algolia.com/doc/guides/managing-results/rules/detecting-intent/how-to/applying-a-custom-filter-for-a-specific-query/#numerical-filters).\nAttribute names are case-sensitive.\n\nBy default, all numeric attributes are available as numerical filters.\nFor faster indexing, reduce the number of numeric attributes.\n\nTo turn off filtering for all numeric attributes, specify an attribute that doesn\'t exist in your index, such as `NO_NUMERIC_FILTERING`.\n\n**Modifier**\n\n- `equalOnly("ATTRIBUTE")`.\n  Support only filtering based on equality comparisons `=` and `!=`.\n',
        "required": false
      },
      {
        "type": 'string',
        "placeholder": '+#',
        "default": '',
        "description": 'Control which non-alphanumeric characters are indexed.\n\nBy default, Algolia ignores [non-alphanumeric characters](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes/#handling-non-alphanumeric-characters) like hyphen (`-`), plus (`+`), and parentheses (`(`,`)`).\nTo include such characters, define them with `separatorsToIndex`.\n\nSeparators are all non-letter characters except spaces and currency characters, such as $€£¥.\n\nWith `separatorsToIndex`, Algolia treats separator characters as separate words.\nFor example, in a search for "Disney+", Algolia considers "Disney" and "+" as two separate words.\n',
        "displayName": 'Separators To Index',
        "name": 'separatorsToIndex_string'
      },
      {
        "type": 'json',
        "displayName": 'Searchable Attributes',
        "name": 'searchableAttributes_json',
        "default": '[]',
        "description": 'Attributes used for searching. Attribute names are case-sensitive.\n\nBy default, all attributes are searchable and the [Attribute](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#attribute) ranking criterion is turned off.\nWith a non-empty list, Algolia only returns results with matches in the selected attributes.\nIn addition, the Attribute ranking criterion is turned on: matches in attributes that are higher in the list of `searchableAttributes` rank first.\nTo make matches in two attributes rank equally, include them in a comma-separated string, such as `"title,alternate_title"`.\nAttributes with the same priority are always unordered.\n\nFor more information, see [Searchable attributes](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/setting-searchable-attributes).\n\n**Modifier**\n\n- `unordered("ATTRIBUTE")`.\n  Ignore the position of a match within the attribute.\n\nWithout a modifier, matches at the beginning of an attribute rank higher than matches at the end.\n',
        "required": false
      },
      {
        "type": 'json',
        "description": 'Characters and their normalized replacements.\nThis overrides Algolia\'s default [normalization](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization).\n',
        "required": false,
        "default": '{}',
        "displayName": 'Custom Normalization',
        "name": 'custom_normalization_object'
      },
      {
        "type": 'string',
        "placeholder": 'url',
        "default": '',
        "description": 'Attribute that should be used to establish groups of results.\nAttribute names are case-sensitive.\n\nAll records with the same value for this attribute are considered a group.\nYou can combine `attributeForDistinct` with the `distinct` search parameter to control\nhow many items per group are included in the search results.\n\nIf you want to use the same attribute also for faceting, use the `afterDistinct` modifier of the `attributesForFaceting` setting.\nThis applies faceting _after_ deduplication, which will result in accurate facet counts.\n',
        "displayName": 'Attribute For Distinct',
        "name": 'attributeForDistinct_string'
      },
      {
        "type": 'number',
        "default": 10,
        "description": 'Maximum number of facet values to return when [searching for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).',
        "typeOptions": {
          "maxValue": 100
        },
        "displayName": 'Max Facet Hits',
        "name": 'maxFacetHits_number'
      },
      {
        "type": 'string',
        "placeholder": 'øé',
        "default": '',
        "description": 'Characters for which diacritics should be preserved.\n\nBy default, Algolia removes diacritics from letters.\nFor example, `é` becomes `e`. If this causes issues in your search,\nyou can specify characters that should keep their diacritics.\n',
        "displayName": 'Keep Diacritics On Characters',
        "name": 'keepDiacriticsOnCharacters_string'
      },
      {
        "type": 'json',
        "displayName": 'Custom Ranking',
        "name": 'customRanking_json',
        "default": '[]',
        "description": 'Attributes to use as [custom ranking](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking).\nAttribute names are case-sensitive.\n\nThe custom ranking attributes decide which items are shown first if the other ranking criteria are equal.\n\nRecords with missing values for your selected custom ranking attributes are always sorted last.\nBoolean attributes are sorted based on their alphabetical order.\n\n**Modifiers**\n\n- `asc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in ascending order.\n\n- `desc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in descending order.\n\nIf you use two or more custom ranking attributes,\n[reduce the precision](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/how-to/controlling-custom-ranking-metrics-precision) of your first attributes,\nor the other attributes will never be applied.\n',
        "required": false
      },
      {
        "type": 'json',
        "displayName": 'Attributes To Retrieve',
        "name": 'attributesToRetrieve_json',
        "default": '[]',
        "description": 'Attributes to include in the API response\nTo reduce the size of your response, you can retrieve only some of the attributes.\nAttribute names are case-sensitive\n- `*` retrieves all attributes, except attributes included in the `customRanking` and `unretrievableAttributes` settings.\n- To retrieve all attributes except a specific one, prefix the attribute with a dash and combine it with the `*`: `["*", "-ATTRIBUTE"]`.\n- The `objectID` attribute is always included.\n',
        "required": false
      },
      {
        "type": 'json',
        "displayName": 'Ranking',
        "name": 'ranking_json',
        "default": '[]',
        "description": 'Determines the order in which Algolia returns your results.\n\nBy default, each entry corresponds to a [ranking criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria).\nThe tie-breaking algorithm sequentially applies each criterion in the order they\'re specified.\nIf you configure a replica index for [sorting by an attribute](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute),\nyou put the sorting attribute at the top of the list.\n\n**Modifiers**\n\n- `asc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in ascending order.\n- `desc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in descending order.\n\nBefore you modify the default setting,\nyou should test your changes in the dashboard,\nand by [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing).\n',
        "required": false
      },
      {
        "type": 'number',
        "placeholder": '90',
        "default": 100,
        "description": 'Relevancy threshold below which less relevant results aren\'t included in the results\nYou can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas).\nUse this setting to strike a balance between the relevance and number of returned results.\n',
        "displayName": 'Relevancy Strictness',
        "name": 'relevancyStrictness_number'
      },
      {
        "type": 'json',
        "displayName": 'Attributes To Highlight',
        "name": 'attributesToHighlight_json',
        "default": '[]',
        "description": 'Attributes to highlight\nBy default, all searchable attributes are highlighted.\nUse `*` to highlight all attributes or use an empty array `[]` to turn off highlighting.\nAttribute names are case-sensitive\nWith highlighting, strings that match the search query are surrounded by HTML tags defined by `highlightPreTag` and `highlightPostTag`.\nYou can use this to visually highlight matching parts of a search query in your UI\nFor more information, see [Highlighting and snippeting](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js).\n',
        "required": false
      },
      {
        "type": 'json',
        "displayName": 'Attributes To Snippet',
        "name": 'attributesToSnippet_json',
        "default": '[]',
        "description": 'Attributes for which to enable snippets.\nAttribute names are case-sensitive\nSnippets provide additional context to matched words.\nIf you enable snippets, they include 10 words, including the matched word.\nThe matched word will also be wrapped by HTML tags for highlighting.\nYou can adjust the number of words with the following notation: `ATTRIBUTE:NUMBER`,\nwhere `NUMBER` is the number of words to be extracted.\n',
        "required": false
      },
      {
        "type": 'string',
        "default": '<em>',
        "description": 'HTML tag to insert before the highlighted parts in all highlighted results and snippets.',
        "displayName": 'Highlight Pre Tag',
        "name": 'highlightPreTag_string'
      },
      {
        "type": 'string',
        "default": '</em>',
        "description": 'HTML tag to insert after the highlighted parts in all highlighted results and snippets.',
        "displayName": 'Highlight Post Tag',
        "name": 'highlightPostTag_string'
      },
      {
        "type": 'string',
        "default": '…',
        "description": 'String used as an ellipsis indicator when a snippet is truncated.',
        "displayName": 'Snippet Ellipsis Text',
        "name": 'snippetEllipsisText_string'
      },
      {
        "type": 'boolean',
        "default": false,
        "description": 'Whether to restrict highlighting and snippeting to items that at least partially matched the search query.\nBy default, all items are highlighted and snippeted.\n',
        "displayName": 'Restrict Highlight And Snippet Arrays',
        "name": 'restrictHighlightAndSnippetArrays_boolean'
      },
      {
        "type": 'number',
        "default": 20,
        "description": 'Number of hits per page.',
        "typeOptions": {
          "minValue": 1,
          "maxValue": 1000
        },
        "displayName": 'Hits Per Page',
        "name": 'hitsPerPage_number'
      },
      {
        "type": 'number',
        "default": 4,
        "description": 'Minimum number of characters a word in the search query must contain to accept matches with [one typo](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).',
        "displayName": 'Min Word Sizefor1Typo',
        "name": 'minWordSizefor1Typo_number'
      },
      {
        "type": 'number',
        "default": 8,
        "description": 'Minimum number of characters a word in the search query must contain to accept matches with [two typos](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).',
        "displayName": 'Min Word Sizefor2Typos',
        "name": 'minWordSizefor2Typos_number'
      },
      {
        "type": 'json',
        "name": 'typoTolerance',
        "displayName": 'Typo Tolerance',
        "default": ''
      },
      {
        "type": 'boolean',
        "default": true,
        "description": 'Whether to allow typos on numbers in the search query\nTurn off this setting to reduce the number of irrelevant matches\nwhen searching in large sets of similar numbers.\n',
        "displayName": 'Allow Typos On Numeric Tokens',
        "name": 'allowTyposOnNumericTokens_boolean'
      },
      {
        "type": 'json',
        "displayName": 'Disable Typo Tolerance On Attributes',
        "name": 'disableTypoToleranceOnAttributes_json',
        "default": '[]',
        "description": 'Attributes for which you want to turn off [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance).\nAttribute names are case-sensitive\nReturning only exact matches can help when\n- [Searching in hyphenated attributes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes).\n- Reducing the number of matches when you have too many.\n  This can happen with attributes that are long blocks of text, such as product descriptions\nConsider alternatives such as `disableTypoToleranceOnWords` or adding synonyms if your attributes have intentional unusual spellings that might look like typos.\n',
        "required": false
      },
      {
        "type": 'json',
        "name": 'ignorePlurals',
        "displayName": 'Ignore Plurals',
        "default": ''
      },
      {
        "type": 'json',
        "name": 'removeStopWords',
        "displayName": 'Remove Stop Words',
        "default": ''
      },
      {
        "type": 'json',
        "displayName": 'Query Languages',
        "name": 'queryLanguages_json',
        "default": '[]',
        "description": 'Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries \nThis setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings.\nThis setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages.\nTo support this, you must place the CJK language **first** \n**You should always specify a query language.**\nIf you don\'t specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations).\n',
        "required": false
      },
      {
        "type": 'boolean',
        "default": true,
        "description": 'Whether to split compound words in the query into their building blocks\nFor more information, see [Word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#splitting-compound-words).\nWord segmentation is supported for these languages: German, Dutch, Finnish, Swedish, and Norwegian.\nDecompounding doesn\'t work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark).\nFor example, `Gartenstühle` won\'t be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).\n',
        "displayName": 'Decompound Query',
        "name": 'decompoundQuery_boolean'
      },
      {
        "type": 'boolean',
        "default": true,
        "description": 'Whether to enable rules.',
        "displayName": 'Enable Rules',
        "name": 'enableRules_boolean'
      },
      {
        "type": 'boolean',
        "default": false,
        "description": 'Whether to enable Personalization.',
        "displayName": 'Enable Personalization',
        "name": 'enablePersonalization_boolean'
      },
      {
        "type": 'options',
        "default": 'prefixLast',
        "description": 'Determines if and how query words are interpreted as prefixes.\n\nBy default, only the last query word is treated as a prefix (`prefixLast`).\nTo turn off prefix search, use `prefixNone`.\nAvoid `prefixAll`, which treats all query words as prefixes.\nThis might lead to counterintuitive results and makes your search slower.\n\nFor more information, see [Prefix searching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/prefix-searching).\n',
        "options": [
          {
            "name": 'prefixLast',
            "value": 'prefixLast'
          },
          {
            "name": 'prefixAll',
            "value": 'prefixAll'
          },
          {
            "name": 'prefixNone',
            "value": 'prefixNone'
          }
        ],
        "displayName": 'Query Type',
        "name": 'queryType_options'
      },
      {
        "type": 'options',
        "placeholder": 'firstWords',
        "default": 'none',
        "description": 'Strategy for removing words from the query when it doesn\'t return any results.\nThis helps to avoid returning empty search results.\n\n- `none`.\n  No words are removed when a query doesn\'t return results.\n\n- `lastWords`.\n  Treat the last (then second to last, then third to last) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `firstWords`.\n  Treat the first (then second, then third) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `allOptional`.\n  Treat all words as optional.\n\nFor more information, see [Remove words to improve results](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/in-depth/why-use-remove-words-if-no-results).\n',
        "options": [
          {
            "name": 'none',
            "value": 'none'
          },
          {
            "name": 'lastWords',
            "value": 'lastWords'
          },
          {
            "name": 'firstWords',
            "value": 'firstWords'
          },
          {
            "name": 'allOptional',
            "value": 'allOptional'
          }
        ],
        "displayName": 'Remove Words If No Results',
        "name": 'removeWordsIfNoResults_options'
      },
      {
        "type": 'options',
        "default": 'keywordSearch',
        "description": 'Search mode the index will use to query for results.\n\nThis setting only applies to indices, for which Algolia enabled NeuralSearch for you.\n',
        "options": [
          {
            "name": 'neuralSearch',
            "value": 'neuralSearch'
          },
          {
            "name": 'keywordSearch',
            "value": 'keywordSearch'
          }
        ],
        "displayName": 'Mode',
        "name": 'mode_options'
      },
      {
        "type": 'json',
        "description": 'Settings for the semantic search part of NeuralSearch.\nOnly used when `mode` is `neuralSearch`.\n',
        "required": false,
        "default": '{}',
        "displayName": 'Semantic Search',
        "name": 'semantic_search_object'
      },
      {
        "type": 'boolean',
        "default": false,
        "description": 'Whether to support phrase matching and excluding words from search queries\nUse the `advancedSyntaxFeatures` parameter to control which feature is supported.\n',
        "displayName": 'Advanced Syntax',
        "name": 'advancedSyntax_boolean'
      },
      {
        "type": 'json',
        "name": 'optionalWords',
        "displayName": 'Optional Words',
        "default": ''
      },
      {
        "type": 'json',
        "displayName": 'Disable Exact On Attributes',
        "name": 'disableExactOnAttributes_json',
        "default": '[]',
        "description": 'Searchable attributes for which you want to [turn off the Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes).\nAttribute names are case-sensitive\nThis can be useful for attributes with long values, where the likelihood of an exact match is high,\nsuch as product descriptions.\nTurning off the Exact ranking criterion for these attributes favors exact matching on other attributes.\nThis reduces the impact of individual attributes with a lot of content on ranking.\n',
        "required": false
      },
      {
        "type": 'options',
        "default": 'attribute',
        "description": 'Determines how the [Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes) is computed when the search query has only one word.\n\n- `attribute`.\n  The Exact ranking criterion is 1 if the query word and attribute value are the same.\n  For example, a search for "road" will match the value "road", but not "road trip".\n\n- `none`.\n  The Exact ranking criterion is ignored on single-word searches.\n\n- `word`.\n  The Exact ranking criterion is 1 if the query word is found in the attribute value.\n  The query word must have at least 3 characters and must not be a stop word.\n  Only exact matches will be highlighted,\n  partial and prefix matches won\'t.\n',
        "options": [
          {
            "name": 'attribute',
            "value": 'attribute'
          },
          {
            "name": 'none',
            "value": 'none'
          },
          {
            "name": 'word',
            "value": 'word'
          }
        ],
        "displayName": 'Exact On Single Word Query',
        "name": 'exactOnSingleWordQuery_options'
      },
      {
        "type": 'json',
        "displayName": 'Alternatives As Exact',
        "name": 'alternativesAsExact_json',
        "default": '[]',
        "description": 'Determine which plurals and synonyms should be considered an exact matches\nBy default, Algolia treats singular and plural forms of a word, and single-word synonyms, as [exact](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#exact) matches when searching.\nFor example\n- "swimsuit" and "swimsuits" are treated the same\n- "swimsuit" and "swimwear" are treated the same (if they are [synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#regular-synonyms))\n- `ignorePlurals`.\n  Plurals and similar declensions added by the `ignorePlurals` setting are considered exact matches\n- `singleWordSynonym`.\n  Single-word synonyms, such as "NY" = "NYC", are considered exact matches\n- `multiWordsSynonym`.\n  Multi-word synonyms, such as "NY" = "New York", are considered exact matches.\n',
        "required": false
      },
      {
        "type": 'json',
        "displayName": 'Advanced Syntax Features',
        "name": 'advancedSyntaxFeatures_json',
        "default": '[]',
        "description": 'Advanced search syntax features you want to support\n- `exactPhrase`.\n  Phrases in quotes must match exactly.\n  For example, `sparkly blue "iPhone case"` only returns records with the exact string "iPhone case"\n- `excludeWords`.\n  Query words prefixed with a `-` must not occur in a record.\n  For example, `search -engine` matches records that contain "search" but not "engine"\nThis setting only has an effect if `advancedSyntax` is true.\n',
        "required": false
      },
      {
        "type": 'json',
        "name": 'distinct',
        "displayName": 'Distinct',
        "default": ''
      },
      {
        "type": 'boolean',
        "default": false,
        "description": 'Whether to replace a highlighted word with the matched synonym\nBy default, the original words are highlighted even if a synonym matches.\nFor example, with `home` as a synonym for `house` and a search for `home`,\nrecords matching either "home" or "house" are included in the search results,\nand either "home" or "house" are highlighted\nWith `replaceSynonymsInHighlight` set to `true`, a search for `home` still matches the same records,\nbut all occurrences of "house" are replaced by "home" in the highlighted response.\n',
        "displayName": 'Replace Synonyms In Highlight',
        "name": 'replaceSynonymsInHighlight_boolean'
      },
      {
        "type": 'number',
        "default": 1,
        "description": 'Minimum proximity score for two matching words\nThis adjusts the [Proximity ranking criterion](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#proximity)\nby equally scoring matches that are farther apart\nFor example, if `minProximity` is 2, neighboring matches and matches with one word between them would have the same score.\n',
        "typeOptions": {
          "minValue": 1,
          "maxValue": 7
        },
        "displayName": 'Min Proximity',
        "name": 'minProximity_number'
      },
      {
        "type": 'json',
        "displayName": 'Response Fields',
        "name": 'responseFields_json',
        "default": '[]',
        "description": 'Properties to include in the API response of search and browse requests\nBy default, all response properties are included.\nTo reduce the response size, you can select which properties should be included\nAn empty list may lead to an empty API response (except properties you can\'t exclude)\nYou can\'t exclude these properties:\n`message`, `warning`, `cursor`, `abTestVariantID`,\nor any property added by setting `getRankingInfo` to true\nYour search depends on the `hits` field. If you omit this field, searches won\'t return any results.\nYour UI might also depend on other properties, for example, for pagination.\nBefore restricting the response size, check the impact on your search experience.\n',
        "required": false
      },
      {
        "type": 'number',
        "default": 100,
        "description": 'Maximum number of facet values to return for each facet.',
        "typeOptions": {
          "maxValue": 1000
        },
        "displayName": 'Max Values Per Facet',
        "name": 'maxValuesPerFacet_number'
      },
      {
        "type": 'string',
        "default": 'count',
        "description": 'Order in which to retrieve facet values\n- `count`.\n  Facet values are retrieved by decreasing count.\n  The count is the number of matching records containing this facet value\n- `alpha`.\n  Retrieve facet values alphabetically\nThis setting doesn\'t influence how facet values are displayed in your UI (see `renderingContent`).\nFor more information, see [facet value display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/js).\n',
        "displayName": 'Sort Facet Values By',
        "name": 'sortFacetValuesBy_string'
      },
      {
        "type": 'boolean',
        "default": false,
        "description": 'Whether the best matching attribute should be determined by minimum proximity\nThis setting only affects ranking if the Attribute ranking criterion comes before Proximity in the `ranking` setting.\nIf true, the best matching attribute is selected based on the minimum proximity of multiple matches.\nOtherwise, the best matching attribute is determined by the order in the `searchableAttributes` setting.\n',
        "displayName": 'Attribute Criteria Computed By Min Proximity',
        "name": 'attributeCriteriaComputedByMinProximity_boolean'
      },
      {
        "type": 'json',
        "description": 'Extra data that can be used in the search UI.\n\nYou can use this to control aspects of your search UI, such as the order of facet names and values\nwithout changing your frontend code.\n',
        "required": false,
        "default": '{}',
        "displayName": 'Rendering Content',
        "name": 'rendering_content_object'
      },
      {
        "type": 'boolean',
        "default": true,
        "description": 'Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking)\nThis setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.\n',
        "displayName": 'Enable Re Ranking',
        "name": 'enableReRanking_boolean'
      },
      {
        "type": 'json',
        "name": 'reRankingApplyFilter',
        "displayName": 'Re Ranking Apply Filter',
        "default": ''
      }
    ],
    "routing": {
      "request": {
        "body": {
          "attributesForFaceting": '={{ JSON.parse($value.attributesForFaceting_json) }}',
          "replicas": '={{ JSON.parse($value.replicas_json) }}',
          "paginationLimitedTo": '={{ $value.paginationLimitedTo_number }}',
          "unretrievableAttributes": '={{ JSON.parse($value.unretrievableAttributes_json) }}',
          "disableTypoToleranceOnWords": '={{ JSON.parse($value.disableTypoToleranceOnWords_json) }}',
          "attributesToTransliterate": '={{ JSON.parse($value.attributesToTransliterate_json) }}',
          "camelCaseAttributes": '={{ JSON.parse($value.camelCaseAttributes_json) }}',
          "decompoundedAttributes": '={{ JSON.parse($value.decompounded_attributes_object) }}',
          "indexLanguages": '={{ JSON.parse($value.indexLanguages_json) }}',
          "disablePrefixOnAttributes": '={{ JSON.parse($value.disablePrefixOnAttributes_json) }}',
          "allowCompressionOfIntegerArray": '={{ $value.allowCompressionOfIntegerArray_boolean }}',
          "numericAttributesForFiltering": '={{ JSON.parse($value.numericAttributesForFiltering_json) }}',
          "separatorsToIndex": '={{ $value.separatorsToIndex_string }}',
          "searchableAttributes": '={{ JSON.parse($value.searchableAttributes_json) }}',
          "customNormalization": '={{ JSON.parse($value.custom_normalization_object) }}',
          "attributeForDistinct": '={{ $value.attributeForDistinct_string }}',
          "maxFacetHits": '={{ $value.maxFacetHits_number }}',
          "keepDiacriticsOnCharacters": '={{ $value.keepDiacriticsOnCharacters_string }}',
          "customRanking": '={{ JSON.parse($value.customRanking_json) }}',
          "attributesToRetrieve": '={{ JSON.parse($value.attributesToRetrieve_json) }}',
          "ranking": '={{ JSON.parse($value.ranking_json) }}',
          "relevancyStrictness": '={{ $value.relevancyStrictness_number }}',
          "attributesToHighlight": '={{ JSON.parse($value.attributesToHighlight_json) }}',
          "attributesToSnippet": '={{ JSON.parse($value.attributesToSnippet_json) }}',
          "highlightPreTag": '={{ $value.highlightPreTag_string }}',
          "highlightPostTag": '={{ $value.highlightPostTag_string }}',
          "snippetEllipsisText": '={{ $value.snippetEllipsisText_string }}',
          "restrictHighlightAndSnippetArrays": '={{ $value.restrictHighlightAndSnippetArrays_boolean }}',
          "hitsPerPage": '={{ $value.hitsPerPage_number }}',
          "minWordSizefor1Typo": '={{ $value.minWordSizefor1Typo_number }}',
          "minWordSizefor2Typos": '={{ $value.minWordSizefor2Typos_number }}',
          "typoTolerance": '={{ JSON.parse($value.typoTolerance) }}',
          "allowTyposOnNumericTokens": '={{ $value.allowTyposOnNumericTokens_boolean }}',
          "disableTypoToleranceOnAttributes": '={{ JSON.parse($value.disableTypoToleranceOnAttributes_json) }}',
          "ignorePlurals": '={{ JSON.parse($value.ignorePlurals) }}',
          "removeStopWords": '={{ JSON.parse($value.removeStopWords) }}',
          "queryLanguages": '={{ JSON.parse($value.queryLanguages_json) }}',
          "decompoundQuery": '={{ $value.decompoundQuery_boolean }}',
          "enableRules": '={{ $value.enableRules_boolean }}',
          "enablePersonalization": '={{ $value.enablePersonalization_boolean }}',
          "queryType": '={{ $value.queryType_options }}',
          "removeWordsIfNoResults": '={{ $value.removeWordsIfNoResults_options }}',
          "mode": '={{ $value.mode_options }}',
          "semanticSearch": '={{ JSON.parse($value.semantic_search_object) }}',
          "advancedSyntax": '={{ $value.advancedSyntax_boolean }}',
          "optionalWords": '={{ JSON.parse($value.optionalWords) }}',
          "disableExactOnAttributes": '={{ JSON.parse($value.disableExactOnAttributes_json) }}',
          "exactOnSingleWordQuery": '={{ $value.exactOnSingleWordQuery_options }}',
          "alternativesAsExact": '={{ JSON.parse($value.alternativesAsExact_json) }}',
          "advancedSyntaxFeatures": '={{ JSON.parse($value.advancedSyntaxFeatures_json) }}',
          "distinct": '={{ JSON.parse($value.distinct) }}',
          "replaceSynonymsInHighlight": '={{ $value.replaceSynonymsInHighlight_boolean }}',
          "minProximity": '={{ $value.minProximity_number }}',
          "responseFields": '={{ JSON.parse($value.responseFields_json) }}',
          "maxValuesPerFacet": '={{ $value.maxValuesPerFacet_number }}',
          "sortFacetValuesBy": '={{ $value.sortFacetValuesBy_string }}',
          "attributeCriteriaComputedByMinProximity": '={{ $value.attributeCriteriaComputedByMinProximity_boolean }}',
          "renderingContent": '={{ JSON.parse($value.rendering_content_object) }}',
          "enableReRanking": '={{ $value.enableReRanking_boolean }}',
          "reRankingApplyFilter": '={{ JSON.parse($value.reRankingApplyFilter) }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Indices'
        ],
        "operation": [
          'setSettings'
        ]
      }
    }
  },
  {
    "displayName": 'Options',
    "name": 'options',
    "type": 'collection',
    "placeholder": 'Add option',
    "default": {},
    "required": false,
    "options": [
      {
        "type": 'boolean',
        "default": false,
        "displayName": 'Forward To Replicas',
        "name": 'forwardToReplicas_boolean',
        "description": 'Whether changes are applied to replica indices.'
      }
    ],
    "routing": {
      "request": {
        "qs": {
          "forwardToReplicas": '={{ $value.forwardToReplicas_boolean }}'
        }
      }
    },
    "displayOptions": {
      "show": {
        "resource": [
          'Indices'
        ],
        "operation": [
          'setSettings'
        ]
      }
    }
  }
];

export default properties;
