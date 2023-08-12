
import useGetDocument from './use-get-document'
import { SanityClient } from '@sanity/client'

let useSWRMock = jest.fn()

jest.mock('swr', () => ({
  __esModule: true,
   default: jest.fn()
}))


// If you're using a private dataset you probably have to configure a separate write/read client.
// https://www.sanity.io/help/js-client-usecdn-token
const client = {
  fetch: jest.fn()
} as unknown as SanityClient

const DOCUMENT_TYPE = `post`
const DOCUMENT_FIELDS = `
  'id': _id,
  name,
  'image': image.asset -> url
`

describe('useGetDocument', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    useSWRMock = jest.requireMock('swr').default
  })

  it('gets document without ID', async () => {
    useGetDocument(client, { type: DOCUMENT_TYPE, fields: DOCUMENT_FIELDS})
    expect(useSWRMock).toHaveBeenCalledTimes(1)
    expect(useSWRMock.mock.lastCall[0]).toBeNull()

    // useSWRMock.mock.lastCall[1]()
    expect(client.fetch).not.toHaveBeenCalled()
    // expect(useSWRMock.mock.lastCall[1]()).toThrowError(new Error('Requires document ID'))
  })

  it('gets document with ID', async () => {
    useGetDocument(client, { id: '1', type: DOCUMENT_TYPE, fields: DOCUMENT_FIELDS})
    expect(useSWRMock).toHaveBeenCalledTimes(1)
    console.log(useSWRMock.mock.lastCall )
    expect(useSWRMock.mock.lastCall[0]).toEqual(["post", "1"])

    useSWRMock.mock.lastCall[1]()
    expect(client.fetch).toHaveBeenCalledTimes(1)
    expect(client.fetch).toHaveBeenCalledWith(`
    *[_type == "post" && _id == "1"][0] {
      'id': _id,
      name,
      'image': image.asset -> url·
      }
    `)
  })
})
