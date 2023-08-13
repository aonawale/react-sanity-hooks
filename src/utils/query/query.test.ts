import {QuerySliceConstraint} from '../../types'
import {filter, order, slice} from '../query-constraint'
import {buildQuery, findConstraints, filterQuery, orderQuery, sliceQuery} from './query'

const constraints = [
  filter('name', '==', "'Sanity'"),
  filter('age', '>', 18),
  order('name', 'asc'),
  order('age', 'desc'),
  slice(5, 10),
]

describe('query: findConstraints', () => {
  it('find constraints', () => {
    expect(findConstraints(constraints, 'filter')).toEqual([
      {field: 'name', operator: '==', type: 'filter', value: "'Sanity'"},
      {field: 'age', operator: '>', type: 'filter', value: 18},
    ])
    expect(findConstraints(constraints, 'order')).toEqual([
      {direction: 'asc', field: 'name', type: 'order'},
      {direction: 'desc', field: 'age', type: 'order'},
    ])
    expect(findConstraints(constraints, 'slice')).toEqual([{limit: 10, start: 5, type: 'slice'}])
  })
})

describe('query: filterQuery', () => {
  it('build empty filter query', () => {
    expect(filterQuery([])).toEqual('')
  })

  it('build filter query', () => {
    expect(filterQuery(findConstraints(constraints, 'filter'))).toEqual(
      "name == 'Sanity' && age > 18",
    )
  })
})

describe('query: orderQuery', () => {
  it('build empty order query', () => {
    expect(orderQuery([])).toEqual('')
  })

  it('build order query', () => {
    expect(orderQuery(findConstraints(constraints, 'order'))).toEqual(
      'order(name asc) | order(age desc)',
    )
  })
})

describe('query: sliceQuery', () => {
  it('build slice query', () => {
    expect(sliceQuery(findConstraints<QuerySliceConstraint>(constraints, 'slice')[0])).toEqual(
      '[5...10]',
    )
  })
})

describe('query: buildQuery', () => {
  it('build empty query', () => {
    expect(buildQuery({})).toEqual('*[]')
  })

  it('build filter only query', () => {
    expect(buildQuery({constraints: findConstraints(constraints, 'filter')})).toEqual(
      "*[name == 'Sanity' && age > 18]",
    )
  })

  it('build order only query', () => {
    expect(buildQuery({constraints: findConstraints(constraints, 'order')})).toEqual(
      '*[] order(name asc) | order(age desc)',
    )
  })

  it('build slice only query', () => {
    expect(buildQuery({constraints: findConstraints(constraints, 'slice')})).toEqual('*[] [5...10]')
  })

  it('build combined filter, order, and slice query', () => {
    expect(buildQuery({constraints})).toEqual(
      "*[name == 'Sanity' && age > 18] order(name asc) | order(age desc) [5...10]",
    )
  })
})
