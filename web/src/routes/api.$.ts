import { apiError, withApi } from '@/lib/api.server';

/**
 * Unmatched `/api/*` paths answer with JSON instead of React Router's HTML
 * error document. More specific `/api/...` routes always win over this one.
 */
const notFound = withApi(async () => apiError(404, 'Route not found'));

export const loader = notFound;
export const action = notFound;
