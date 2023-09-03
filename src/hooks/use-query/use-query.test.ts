import useQuery from './use-query'
import {SanityClient} from '@sanity/client'
import {renderHook} from '@testing-library/react'
import {filter, order, slice} from '../../utils'

let useSWRMock = jest.fn()

jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((_, fetcher) => {
    fetcher()
    return {}
  }),
}))

const client = {
  fetch: jest.fn(),
} as unknown as SanityClient

const projection = `
  'id': _id,
  name,
  'image': image.asset -> url
`

const query = {
  constraints: [
    filter('name', '==', "'Sanity'"),
    filter('age', '>', 18),
    order('name', 'asc'),
    order('age', 'desc'),
    slice(5, 10),
  ],
}

describe('useQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useSWRMock = jest.requireMock('swr').default
  })

  it('works without query and projection', async () => {
    const {result} = renderHook(() => useQuery(client))

    expect(result.current).toEqual({data: undefined, error: undefined, isLoading: undefined})
    expect(client.fetch).toHaveBeenCalledTimes(1)
    expect(client.fetch).toHaveBeenCalledWith('*[]')
    expect(useSWRMock.mock.lastCall[0]).toEqual('*[]')
  })

  it('works with no query and a projection', async () => {
    const {result} = renderHook(() => useQuery(client, undefined, projection))

    expect(result.current).toEqual({data: undefined, error: undefined, isLoading: undefined})
    expect(client.fetch).toHaveBeenCalledTimes(1)
    expect(client.fetch).toHaveBeenCalledWith(`*[] {${projection}}`)
    expect(useSWRMock.mock.lastCall[0]).toEqual(`*[] {${projection}}`)
  })

  it('works with only query', async () => {
    const {result} = renderHook(() => useQuery(client, query))

    expect(result.current).toEqual({data: undefined, error: undefined, isLoading: undefined})
    expect(client.fetch).toHaveBeenCalledTimes(1)
    expect(client.fetch).toHaveBeenCalledWith(
      `*[name == 'Sanity' && age > 18] | order(name asc) | order(age desc) [5...10]`,
    )
    expect(useSWRMock.mock.lastCall[0]).toEqual(
      "*[name == 'Sanity' && age > 18] | order(name asc) | order(age desc) [5...10]",
    )
  })

  it('works with both query and projection', async () => {
    const {result} = renderHook(() => useQuery(client, query, projection))

    expect(result.current).toEqual({data: undefined, error: undefined, isLoading: undefined})
    expect(client.fetch).toHaveBeenCalledTimes(1)
    expect(client.fetch).toHaveBeenCalledWith(
      `*[name == 'Sanity' && age > 18] | order(name asc) | order(age desc) [5...10] {${projection}}`,
    )
    expect(useSWRMock.mock.lastCall[0]).toEqual(
      `*[name == 'Sanity' && age > 18] | order(name asc) | order(age desc) [5...10] {${projection}}`,
    )
  })
})
