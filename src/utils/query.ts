import {Query} from '../types/query'
import {
  QueryConstraint,
  QueryConstraintType,
  QueryFieldFilterConstraint,
  QueryOrderConstraint,
  QuerySliceConstraint,
} from '../types/query-constraint'

const findConstraints = <T>(constraints: QueryConstraint[], type: QueryConstraintType) =>
  constraints.filter((constraint) => constraint.type === type) as T[]

const filterQuery = (constraint: QueryFieldFilterConstraint[]) =>
  constraint
    .reduce<string[]>((acc, constraint) => {
      const parts: unknown[] = [constraint.field]
      if (constraint.operator !== undefined) parts.push(constraint.operator)
      if (constraint.value !== undefined) parts.push(constraint.value)
      return [...acc, parts.join(' ')]
    }, [])
    .join(' && ')

const orderQuery = (constraint: QueryOrderConstraint[]) =>
  constraint
    .reduce<string[]>((acc, item) => [...acc, `order(${item.field} ${item.direction})`], [])
    .join(' | ')

const sliceQuery = (constraint: QuerySliceConstraint) =>
  `${constraint.start || 0}...${constraint.limit}`

const buildQuery = (query: Query) => {
  const constraints = query.constraints || []

  const filterConstraints = findConstraints<QueryFieldFilterConstraint>(constraints, 'filter')
  const orderConstraints = findConstraints<QueryOrderConstraint>(constraints, 'order')
  const sliceConstraint = findConstraints<QuerySliceConstraint>(constraints, 'slice')[0]

  const parts = []

  if (filterConstraints.length > 0) {
    parts.push(`*[${filterQuery(filterConstraints)}]`)
  } else {
    parts.push(`*[]`)
  }
  if (orderConstraints.length > 0) {
    parts.push(orderQuery(orderConstraints))
  }
  if (sliceConstraint) {
    parts.push(sliceQuery(sliceConstraint))
  }

  return parts.join(' ')
}

export {buildQuery}
