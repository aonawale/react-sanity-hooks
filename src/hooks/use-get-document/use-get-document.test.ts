
import useGetDocument from './use-get-document'
import { SanityClient } from '@sanity/client'
import {renderHook} from '@testing-library/react'

let useQueryMock = jest.fn()

jest.mock('../use-query', () => ({
  __esModule: true,
  useQuery: jest.fn()
}))

const client = {
  fetch: jest.fn()
} as unknown as SanityClient

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
    const {result} = renderHook(() => useGetDocument(client ))

    expect(result.cureent).toEqual(1)
    expect(useQueryMock).not.toHaveBeenCalled()
  })

  it('works with only query', async () => {
    const {result} = renderHook(() => useGetDocument(client, query,  ))

    expect(result.cureent).toEqual(1)
    expect(useQueryMock).toHaveBeenCalledTimes(1)
    expect(useQueryMock).toHaveBeenCalledWith(1)
  })

  it('works with both query and projection', async () => {
    const {result} = renderHook(() => useGetDocument(client, query, projection))

    expect(result.cureent).toEqual(1)
    expect(useQueryMock).toHaveBeenCalledTimes(1)
    expect(useQueryMock).toHaveBeenCalledWith(1)
  })
})
