import useQueryDocuments from './use-query-documents'
import {SanityClient} from '@sanity/client'
import {renderHook} from '@testing-library/react'
import {filter, order, slice} from '@aonawale/sanity-query'

let useQueryMock = jest.fn()

jest.mock('../use-query', () => ({
  __esModule: true,
  useQuery: jest.fn(),
}))

const client = {} as SanityClient

const projection = `
  'id': _id,
  name,
  'image': image.asset -> url
`

const query = {
  type: 'people',
  constraints: [
    filter('name', '==', "'Sanity'"),
    filter('age', '>', 18),
    order('name', 'asc'),
    order('age', 'desc'),
    slice(5, 10),
  ],
}

describe('useQueryDocuments', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useQueryMock = jest.requireMock('../use-query').useQuery
  })

  it('works without query and projection', async () => {
    renderHook(() => useQueryDocuments(client))

    expect(useQueryMock).toHaveBeenCalledTimes(1)
    expect(useQueryMock).toHaveBeenCalledWith(client, undefined, undefined)
  })

  it('works with only query', async () => {
    renderHook(() => useQueryDocuments(client, query))

    expect(useQueryMock).toHaveBeenCalledTimes(1)
    expect(useQueryMock).toHaveBeenCalledWith(
      client,
      {
        constraints: [
          {field: '_type', operator: '==', type: 'filter', value: "'people'"},
          ...query.constraints,
        ],
      },
      undefined,
    )
  })

  it('does not work with only projection', async () => {
    renderHook(() => useQueryDocuments(client, undefined, projection))

    expect(useQueryMock).toHaveBeenCalledTimes(1)
    expect(useQueryMock).toHaveBeenCalledWith(client, undefined, undefined)
  })

  it('works with both query and projection', async () => {
    renderHook(() => useQueryDocuments(client, query, projection))

    expect(useQueryMock).toHaveBeenCalledTimes(1)
    expect(useQueryMock).toHaveBeenCalledWith(
      client,
      {
        constraints: [
          {field: '_type', operator: '==', type: 'filter', value: "'people'"},
          ...query.constraints,
        ],
      },
      projection,
    )
  })
})
