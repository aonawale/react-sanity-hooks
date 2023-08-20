import {
  QueryFilterConstraint,
  QueryFilterConstraintOperator,
  QueryOrderConstraint,
  QueryOrderConstraintDirection,
  QuerySliceConstraint,
} from '../../types/query-constraint'

/**
 * A function that builds a filter query.
 * @param field - The field to apply the filter on.
 * @param operator - The filter operator.
 * @param value - The filter value.
 * @returns A filter query.
 * @example
 * const filterQuery = filter('name', 'match', 'John')
 */
const filter = (
  field: string,
  operator: QueryFilterConstraintOperator,
  value: unknown,
): QueryFilterConstraint => ({
  type: 'filter',
  field,
  operator,
  value,
})

/**
 * A function that builds an order query.
 * @param field - The field to apply the sorting on.
 * @param direction - The sort direction.
 * @returns An order query.
 * @example
 * const orderQuery = order('age', 'asc')
 */
const order = (field: string, direction: QueryOrderConstraintDirection): QueryOrderConstraint => ({
  type: 'order',
  field,
  direction,
})

/**
 * A function that builds a slice query.
 * @param start - The index to begin slicing the documents from.
 * @param limit - The amount of documents to return.
 * @returns A slice query.
 * @example
 * const sliceQuery = slice(0, 10)
 */
const slice = (start: number, limit: number): QuerySliceConstraint => ({
  type: 'slice',
  start,
  limit,
})

export {filter, order, slice}
