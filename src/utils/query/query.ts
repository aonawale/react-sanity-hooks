import {Query} from '../../types/query'
import {
  QueryConstraint,
  QueryConstraintType,
  QueryFilterConstraint,
  QueryOrderConstraint,
  QuerySliceConstraint,
} from '../../types/query-constraint'

/**
 * A generic function that finds constraints of a specific type and
 * returns them as an array of the generic type provided during the function call.
 * @param constraints - An array of query constraints.
 * @param type - The type of query constraint to find.
 * @returns An array of query constraints of the specified type.
 */
const findConstraints = <T>(constraints: QueryConstraint[], type: QueryConstraintType) =>
  constraints.filter((constraint) => constraint.type === type) as T[]

/**
 * A function that builds a filter query from a list of filter constraints.
 * @param constraints - An array of filter constraints.
 * @returns A filter query string.
 * @example
 * const constraints = [
 *  {
 *    type: 'filter',
 *    field: 'name',
 *    operator: 'match',
 *    value: 'John',
 *  },
 *  {
 *    type: 'filter',
 *    field: 'age',
 *    operator: '>=',
 *    value: 18,
 *  },
 * ]
 * const filterQueryString = filterQuery(constraints)
 * console.log(filterQueryString)
 * => [name match 'John'] && [age >= 18]
 */
const filterQuery = (constraints: QueryFilterConstraint[]) =>
  constraints
    .reduce<string[]>((acc, constraint) => {
      const parts: unknown[] = [constraint.field]
      if (constraint.operator !== undefined && constraint.value !== undefined) {
        parts.push(constraint.operator)
        parts.push(constraint.value)
      }
      return [...acc, parts.join(' ')]
    }, [])
    .join(' && ')

/**
 * A function that builds an order query from a list of order constraints.
 * @param constraints - An array of order constraints.
 * @returns An order query string.
 * @example
 * const constraints = [
 *  {
 *    type: 'order',
 *    field: 'age',
 *    direction: 'asc',
 *  },
 *  {
 *    type: 'order',
 *    field: 'name',
 *    direction: 'desc',
 *  },
 * ]
 * const orderQueryString = orderQuery(constraints)
 * console.log(orderQueryString)
 * => order(age asc) | order(name desc)
 */
const orderQuery = (constraints: QueryOrderConstraint[]) =>
  constraints
    .reduce<string[]>((acc, item) => [...acc, `order(${item.field} ${item.direction})`], [])
    .join(' | ')

/**
 * A function that builds a slice query from a slice constraint.
 * @param constraint - A slice constraint.
 * @returns A slice query string.
 * @example
 * const constraint = {
 *  type: 'slice',
 *  start: 0,
 *  limit: 10,
 * }
 * const sliceQueryString = sliceQuery(constraint)
 * console.log(sliceQueryString)
 * => [0...10]
 */
const sliceQuery = (constraint: QuerySliceConstraint) =>
  `[${constraint.start}...${constraint.limit}]`

/**
 * A function that builds a query from a query object.
 * @param query - A query object.
 * @returns A query string.
 * @example
 * const query = {
 *  constraints: [
 *   {
 *     type: 'filter',
 *     field: 'name',
 *     operator: 'match',
 *     value: 'John',
 *   },
 *   {
 *     type: 'order',
 *     field: 'age',
 *     direction: 'asc',
 *    },
 *    {
 *     type: 'slice',
 *     start: 0,
 *     limit: 10,
 *    },
 *  ],
 * }
 * const queryString = buildQuery(query)
 * console.log(queryString)
 * => *[name match 'John'] | order(age asc) [0...10]
 */
const buildQuery = (query: Query) => {
  const constraints = query.constraints || []

  const filterConstraints = findConstraints<QueryFilterConstraint>(constraints, 'filter')
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

export {buildQuery, findConstraints, filterQuery, orderQuery, sliceQuery}
