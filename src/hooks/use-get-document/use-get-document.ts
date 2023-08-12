import {SanityClient} from '@sanity/client'
import { filter } from '../../utils'
import { useQuery } from '../use-query'

interface GetDocument {
  id: string
}

const useGetDocuments = <T>(client: SanityClient, query?: GetDocument, projection?: string) => {
  const documentQuery = query ? {...query, constraints: [filter('_id', '==', query.id)]} : undefined
  return useQuery<T>(client, documentQuery, projection)
}

export default useGetDocuments
