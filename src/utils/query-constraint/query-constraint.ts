import {
  QueryFieldFilterConstraint,
  QueryFieldFilterConstraintOperator,
  QueryOrderConstraint,
  QueryOrderConstraintDirection,
  QuerySliceConstraint,
} from '../../types/query-constraint'

const filter = (
  field: string,
  operator: QueryFieldFilterConstraintOperator,
  value: unknown,
): QueryFieldFilterConstraint => ({
  type: 'filter',
  field,
  operator,
  value,
})

const order = (field: string, direction: QueryOrderConstraintDirection): QueryOrderConstraint => ({
  type: 'order',
  field,
  direction,
})

const slice = (start: number, limit: number): QuerySliceConstraint => ({
  type: 'slice',
  start,
  limit,
})

export {filter, order, slice}
