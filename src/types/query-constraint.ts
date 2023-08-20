/* The type of the query constraint */
type QueryConstraintType = 'filter' | 'order' | 'slice'
interface QueryConstraint {
  type: QueryConstraintType
}

type QueryFieldFilterConstraintOperator = '==' | '!=' | 'in' | '<' | '<=' | '>' | '>=' | 'match'
interface QueryFieldFilterConstraint extends QueryConstraint {
  type: 'filter'
  field: string
  operator?: QueryFieldFilterConstraintOperator
  value?: unknown
}

type QueryOrderConstraintDirection = 'asc' | 'desc'
interface QueryOrderConstraint extends QueryConstraint {
  type: 'order'
  field: string
  direction: QueryOrderConstraintDirection
}

interface QuerySliceConstraint extends QueryConstraint {
  type: 'slice'
  start: number
  limit: number
}

export {
  QueryConstraintType,
  QueryConstraint,
  QueryFieldFilterConstraintOperator,
  QueryFieldFilterConstraint,
  QueryOrderConstraintDirection,
  QueryOrderConstraint,
  QuerySliceConstraint,
}
