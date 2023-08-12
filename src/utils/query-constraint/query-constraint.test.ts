import { filter, order, slice } from "./query-constraint"

describe('query-constraint', () => {
  it('filter', () => {
    expect(filter('name', '==', `'Sanity'`)).toEqual(1)
    expect(filter('name', '!=', `'Sanity'`)).toEqual(1)
    expect(filter('age', '>', 18)).toEqual(1)
    expect(filter('age', '<', 18)).toEqual(1)
    expect(filter('age', '<=', 18)).toEqual(1)
    expect(filter('age', '>=', 18)).toEqual(1)
    expect(filter('tag', 'in', `["new", "old"]`)).toEqual(1)
    expect(filter('text', 'match', `"textbook"`)).toEqual(1)
  })

  it('order', () => {
    expect(order('name', 'asc')).toEqual(1)
    expect(order('name', 'desc')).toEqual(1)
  })

  it('slice', () => {
    expect(slice(0, 10)).toEqual(1)
  })
})
