import {filter, order, slice} from './query-constraint'

describe('query-constraint', () => {
  it('filter', () => {
    expect(filter('name', '==', `'Sanity'`)).toEqual({
      field: 'name',
      operator: '==',
      type: 'filter',
      value: "'Sanity'",
    })
    expect(filter('name', '!=', `'Sanity'`)).toEqual({
      field: 'name',
      operator: '!=',
      type: 'filter',
      value: "'Sanity'",
    })
    expect(filter('age', '>', 18)).toEqual({field: 'age', operator: '>', type: 'filter', value: 18})
    expect(filter('age', '<', 18)).toEqual({field: 'age', operator: '<', type: 'filter', value: 18})
    expect(filter('age', '<=', 18)).toEqual({
      field: 'age',
      operator: '<=',
      type: 'filter',
      value: 18,
    })
    expect(filter('age', '>=', 18)).toEqual({
      field: 'age',
      operator: '>=',
      type: 'filter',
      value: 18,
    })
    expect(filter('tag', 'in', `["new", "old"]`)).toEqual({
      field: 'tag',
      operator: 'in',
      type: 'filter',
      value: '["new", "old"]',
    })
    expect(filter('text', 'match', `"textbook"`)).toEqual({
      field: 'text',
      operator: 'match',
      type: 'filter',
      value: '"textbook"',
    })
  })

  it('order', () => {
    expect(order('name', 'asc')).toEqual({direction: 'asc', field: 'name', type: 'order'})
    expect(order('name', 'desc')).toEqual({direction: 'desc', field: 'name', type: 'order'})
  })

  it('slice', () => {
    expect(slice(0, 10)).toEqual({endIndex: 10, startIndex: 0, inclusive: undefined, type: 'slice'})
    expect(slice(0, 10, true)).toEqual({
      endIndex: 10,
      startIndex: 0,
      inclusive: true,
      type: 'slice',
    })
  })
})
