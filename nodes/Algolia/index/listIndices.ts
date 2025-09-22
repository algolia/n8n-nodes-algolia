import { Operation } from '@/helpers';

export const listIndices = new Operation({
  name: 'List Indices',
  action: 'List all the indices',
  value: 'listIndices',
  description: 'List all indices',
  routing: {
    request: {
      method: 'GET',
      url: '/1/indexes',
    },
  },
}).addSimplifiedOutput<{ items: unknown[] }>((json) => json.items);
