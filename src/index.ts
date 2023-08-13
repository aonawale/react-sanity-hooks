import {SanityClient} from '@sanity/client'
import {filter, order, slice} from './utils'
import {useQuery, useQueryDocuments, useGetDocument} from './hooks'

;() => {
  const client = {} as SanityClient
  const query = {
    constraints: [
      filter('name', '==', 'Sanity'),
      filter('age', '>', 18),
      order('name', 'asc'),
      order('age', 'desc'),
      slice(5, 10),
    ],
  }
  const projection = `
    'id': _id,
    'slug': slug.current,
    'title': title,
    'logo': logo.asset -> url
  `
  useQuery(client, query, projection)

  useGetDocument(client, {id: '1'}, projection)

  useQueryDocuments(client, {...query, type: 'people'}, projection)
}
