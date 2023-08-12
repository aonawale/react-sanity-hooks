
import useQuery from './use-query'
import { SanityClient } from '@sanity/client'
import {renderHook} from '@testing-library/react'
import { filter, order, slice } from '../../utils'

jest.mock('swr', () => ({
  __esModule: true,
   default: jest.fn()
}))

const client = {
  fetch: jest.fn()
} as unknown as SanityClient

const projection = `
  'id': _id,
  name,
  'image': image.asset -> url
`

const query = {
  constraints: [
    filter('name', '==', "'Sanity'"),
    filter('age', '>', "'Sanity'"),
    order('name', 'asc'),
    order('age', 'desc'),
    slice(5, 10),
  ]
}

describe('useQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('works without query and projection', async () => {
    const {result} = renderHook(() => useQuery(client ))

    expect(result.cureent).toEqual(1)
    expect(client.fetch).not.toHaveBeenCalled()
  })

  it('works with only query', async () => {
    const {result} = renderHook(() => useQuery(client, query,  ))

    expect(result.cureent).toEqual(1)
    expect(client.fetch).toHaveBeenCalledTimes(1)
    expect(client.fetch).toHaveBeenCalledWith(1)
  })

  it('works with both query and projection', async () => {
    const {result} = renderHook(() => useQuery(client, query, projection))

    expect(result.cureent).toEqual(1)
    expect(client.fetch).toHaveBeenCalledTimes(1)
    expect(client.fetch).toHaveBeenCalledWith(1)
  })
})
