import useSWR from 'swr'
import {SanityClient} from '@sanity/client'
import {buildQuery} from '../../utils'
import {Query} from '../../types'
import {useMemo} from 'react'

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
