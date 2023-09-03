import useSWR from 'swr/immutable'
import {SanityClient} from '@sanity/client'
import {buildQuery} from '../../utils'
import {Query} from '../../types'

/**
 * A hook that fetches data from Sanity.
 * @param client - The Sanity client.
 * @param query - The query to fetch data with.
 * @param projection - The projection to fetch data with.
 * @returns The query response.
 * @example
 * const client = sanityClient({...})
 * const query = {
 *  constraints: [
 *   filter('name', 'match', 'John'),
 *   order('age', 'asc'),
 *   slice(0, 10),
 *  ],
 * }
 * const projection = '_id, name, age'
 * const {data, error, isLoading} = useQuery(client, query, projection)
 * console.log(data, error, isLoading)
 * => [{_id: '...', name: 'John', age: 42}, ...], undefined, false
 */
const useQuery = <T>(client: SanityClient, query?: Query, projection?: string) => {
  const parts = query ? [buildQuery(query)] : []
  if (query && projection) parts.push(`{${projection}}`)
  const queryString = parts.length ? parts.join(' ') : undefined

  const response = useSWR<T>(queryString, () => client.fetch<T>(queryString || ''))

  return {data: response.data, error: response.error, isLoading: response.isLoading}
}

export default useQuery
