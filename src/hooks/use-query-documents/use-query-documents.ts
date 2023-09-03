import {SanityClient} from '@sanity/client'
import {Query} from '../../types'
import {filter} from '../../utils'
import {useQuery} from '../use-query'

interface QueryDocuments extends Query {
  /* The document type to query. */
  type: string
}

/**
 * A hook that fetches documents from Sanity.
 * @param client - The Sanity client.
 * @param query - The query to fetch documents with.
 * @param projection - The projection to fetch documents with.
 * @returns The query response.
 * @example
 * const client = sanityClient({...})
 * const query = {
 *  type: 'person',
 *  constraints: [
 *    filter('name', 'match', 'John'),
 *    order('age', 'asc'),
 *    slice(0, 10),
 *  ],
 * }
 * const projection = '_id, name, age'
 * const {data, error, isLoading} = useQueryDocuments(client, query, projection)
 * console.log(data, error, isLoading)
 * => [{_id: '...', name: 'John', age: 42}, ...], undefined, false
 */
const useQueryDocuments = <T>(
  client: SanityClient,
  query?: QueryDocuments,
  projection?: string,
) => {
  const documentsQuery = query
    ? {
        ...query,
        constraints: [filter('_type', '==', `'${query.type}'`), ...(query.constraints || [])],
      }
    : undefined
  return useQuery<T[]>(client, documentsQuery, projection)
}

export default useQueryDocuments
