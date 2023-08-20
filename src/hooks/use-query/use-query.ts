import useSWR from 'swr'
import {SanityClient} from '@sanity/client'
import {buildQuery} from '../../utils'
import {Query} from '../../types'
import {useMemo} from 'react'

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
  const rawQuery = query ? buildQuery(query) : undefined
  const response = useSWR<T>(rawQuery, () => {
    const parts = [rawQuery]
    if (projection) parts.push(`{${projection}}`)
    return client.fetch<T>(parts.join(' '))
  })
  return useMemo(
    () => ({data: response.data, error: response.error, isLoading: response.isLoading}),
    [response],
  )
}

export default useQuery
