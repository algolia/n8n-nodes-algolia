import { Operation } from '@/helpers';

import { attributesToRetrieve } from '../shared/attributesToRetrieve.field';
import { hitsPerPage } from '../shared/hitsPerPage.field';
import { indexName } from '../shared/indexName.field';
import { page } from '../shared/page.field';
import { query } from '../shared/query.field';

export const searchIndex = new Operation(
  {
    name: 'Search Index',
    action: 'Search an index',
    value: 'searchIndex',
    description: 'Returns objects in an index that match the query',
    routing: {
      request: {
        method: 'POST',
        url: '=/1/indexes/{{ $parameter.indexName }}/query',
      },
    },
  },
  {
    additionalFieldsLabel: 'Search Parameters',
  },
)
  .addField(indexName, query)
  .addAdditionalField(attributesToRetrieve, hitsPerPage, page)
  .addSimplifiedOutput<{ hits: unknown[] }>((json) => json.hits);
