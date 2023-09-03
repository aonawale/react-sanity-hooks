import useGetDocument from './use-get-document'
import {SanityClient} from '@sanity/client'
import {renderHook} from '@testing-library/react'

let useQueryMock = jest.fn()

jest.mock('../use-query', () => ({
  __esModule: true,
  useQuery: jest.fn().mockReturnValue({data: undefined, error: undefined, isLoading: undefined}),
}))

const client = {} as SanityClient

const projection = `
  'id': _id,
  name,
  'image': image.asset -> url
`

const query = {id: '1'}

describe('useGetDocument', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useQueryMock = jest.requireMock('../use-query').useQuery
  })

  it('works without query and projection', async () => {
    renderHook(() => useGetDocument(client))

    expect(useQueryMock).toHaveBeenCalledTimes(1)
  })

  it('works with only query', async () => {
    renderHook(() => useGetDocument(client, query))

    expect(useQueryMock).toHaveBeenCalledTimes(1)
    expect(useQueryMock).toHaveBeenCalledWith(
      client,
      {
        constraints: [
          {field: '_id', operator: '==', type: 'filter', value: "'1'"},
          {endIndex: undefined, startIndex: 0, inclusive: undefined, type: 'slice'},
        ],
      },
      undefined,
    )
  })

  it('works with id and type query', async () => {
    renderHook(() => useGetDocument(client, {...query, type: 'people'}))

    expect(useQueryMock).toHaveBeenCalledTimes(1)
    expect(useQueryMock).toHaveBeenCalledWith(
      client,
      {
        constraints: [
          {field: '_id', operator: '==', type: 'filter', value: "'1'"},
          {field: '_type', operator: '==', type: 'filter', value: "'people'"},
          {endIndex: undefined, startIndex: 0, inclusive: undefined, type: 'slice'},
        ],
      },
      undefined,
    )
  })

  it('works with both query and projection', async () => {
    renderHook(() => useGetDocument(client, query, projection))

    expect(useQueryMock).toHaveBeenCalledTimes(1)
    expect(useQueryMock).toHaveBeenCalledWith(
      client,
      {
        constraints: [
          {field: '_id', operator: '==', type: 'filter', value: "'1'"},
          {endIndex: undefined, startIndex: 0, inclusive: undefined, type: 'slice'},
        ],
      },
      projection,
    )
  })
})
