import { QuerySliceConstraint } from "../../types"
import { filter, order, slice } from "../query-constraint"
import { buildQuery, findConstraints, filterQuery, orderQuery, sliceQuery } from "./query"

const constraints = [
  filter('name', '==', "'Sanity'"),
  filter('age', '>', "'Sanity'"),
  order('name', 'asc'),
  order('age', 'desc'),
  slice(5, 10),
]

describe('query: findConstraints', () => {
  it('find constraints', () => {
    expect(findConstraints(constraints, 'filter')).toEqual(1)
    expect(findConstraints(constraints, 'order')).toEqual(1)
    expect(findConstraints(constraints, 'slice')).toEqual(1)
  })
})

describe('query: filterQuery', () => {
  it('build empty filter query', () => {
    expect(filterQuery([])).toEqual(1)
  })

  it('build filter query', () => {
    expect(filterQuery(findConstraints(constraints, 'filter'))).toEqual(1)
  })
})

describe('query: orderQuery', () => {
  it('build empty order query', () => {
    expect(orderQuery([])).toEqual(1)
  })

  it('build order query', () => {
    expect(orderQuery(findConstraints(constraints, 'order'))).toEqual(1)
  })
})

describe('query: sliceQuery', () => {
  it('build slice query', () => {
    expect(sliceQuery(findConstraints<QuerySliceConstraint>(constraints, 'slice')[0])).toEqual(1)
  })
})

describe('query: buildQuery', () => {
  it('build empty query', () => {
    expect(buildQuery({constraints:[]})).toEqual(1)
  })

  it('build filter only query', () => {
    expect(buildQuery({constraints: findConstraints(constraints, 'filter') })).toEqual(1)
  })

  it('build order only query', () => {
    expect(buildQuery({constraints: findConstraints(constraints, 'order') })).toEqual(1)
  })

  it('build slice only query', () => {
    expect(buildQuery({constraints: findConstraints(constraints, 'slice') })).toEqual(1)
  })

  it('build combined filter, order, and slice query', () => {
    expect(buildQuery({constraints})).toEqual(1)
  })
})
