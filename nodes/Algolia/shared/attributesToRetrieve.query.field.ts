import type { INodeProperties } from 'n8n-workflow';
import { attributesToRetrieve } from './attributesToRetrieve.field';

export const attributesToRetrieveQuery: INodeProperties = {
  ...attributesToRetrieve,
  routing: {
    request: {
      qs: {
        attributesToRetrieve:
          '={{ $value.filter(attr => attr.trim() !== "").length > 0 ? $value.filter(attr => attr.trim() !== "").join(",") : undefined }}',
      },
    },
  },
};
