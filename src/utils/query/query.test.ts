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
  it('findConstraints', () => {
    expect(findConstraints(constraints, 'filter')).toEqual(1)
    expect(findConstraints(constraints, 'order')).toEqual(1)
    expect(findConstraints(constraints, 'slice')).toEqual(1)
  })
})

describe('query: filterQuery', () => {
  it('filterQuery', () => {
    expect(filterQuery([])).toEqual(1)
  })

  it('filterQuery', () => {
    expect(filterQuery(findConstraints(constraints, 'filter'))).toEqual(1)
  })
})

describe('query: orderQuery', () => {
  it('orderQuery', () => {
    expect(orderQuery([])).toEqual(1)
  })

  it('orderQuery', () => {
    expect(orderQuery(findConstraints(constraints, 'order'))).toEqual(1)
  })
})

describe('query: sliceQuery', () => {
  it('sliceQuery', () => {
    expect(sliceQuery(findConstraints<QuerySliceConstraint>(constraints, 'slice')[0])).toEqual(1)
  })
})

describe('query: buildQuery', () => {
  it('buildQuery', () => {
    expect(buildQuery({constraints:[]})).toEqual(1)
  })

  it('buildQuery', () => {
    expect(buildQuery({constraints: findConstraints(constraints, 'filter') })).toEqual(1)
  })

  it('buildQuery', () => {
    expect(buildQuery({constraints: findConstraints(constraints, 'order') })).toEqual(1)
  })

  it('buildQuery', () => {
    expect(buildQuery({constraints: findConstraints(constraints, 'slice') })).toEqual(1)
  })

  it('buildQuery', () => {
    expect(buildQuery({constraints})).toEqual(1)
  })
})
