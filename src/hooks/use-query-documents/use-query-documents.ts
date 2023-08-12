import {SanityClient} from '@sanity/client'
import { Query } from '../../types'
import { filter } from '../../utils'
import { useQuery } from '../use-query'

interface QueryDocuments extends Query {
  type: string
}

const useQueryDocuments = <T>(client: SanityClient, query?: QueryDocuments, projection?: string) => {
  const documentsQuery = query ? {...query, constraints: [filter('_type', '==', query.type) ...query.constraints]} : undefined
  return useQuery<T[]>(client, documentsQuery, projection)
}

export default useQueryDocuments
