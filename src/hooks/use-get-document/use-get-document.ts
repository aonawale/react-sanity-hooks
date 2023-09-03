import {SanityClient} from '@sanity/client'
import {filter, slice} from '../../utils'
import {useQuery} from '../use-query'

interface GetDocument {
  /* The document ID to fetch. */
  id: string
  /* The document Type to fetch. (Optional) */
  type?: string
}

/**
 * A hook that fetches a document from Sanity.
 * @param client - The Sanity client.
 * @param query - The query to fetch a document with.
 * @param projection - The projection to fetch a document with.
 * @returns The query response.
 * @example
 * const client = sanityClient({...})
 * const query = {
 *  id: '123',
 * }
 * const projection = '_id, name, age'
 * const {data, error, isLoading} = useGetDocument(client, query, projection)
 * console.log(data, error, isLoading)
 * => {_id: '...', name: 'John', age: 42}, undefined, false
 */
const useGetDocument = <T>(client: SanityClient, query?: GetDocument, projection?: string) => {
  const documentQuery = query
    ? {
        constraints: [
          filter('_id', '==', `'${query.id}'`),
          ...(query.type ? [filter('_type', '==', `'${query.type}'`)] : []),
          slice(0),
        ],
      }
    : undefined
  return useQuery<T>(client, documentQuery, documentQuery ? projection : undefined)
}

export default useGetDocument
