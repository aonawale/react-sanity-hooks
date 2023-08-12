import useSWR from 'swr'
import {SanityClient} from '@sanity/client'
import { buildQuery } from '../../utils/query/query'
import { Query } from '../../types/query'

export const useQuery = <T>(client: SanityClient, query?: Query, projection?: string) => {
  const rawQuery = query ? buildQuery(query) : undefined
  return useSWR<T>(rawQuery, () => {
    const parts = [rawQuery]
    if (projection) parts.push(`{${projection}}`)
    return client.fetch<T>(parts.join(' '))
  })
}

