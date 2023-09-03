/* The type of the query constraint */
type QueryConstraintType = 'filter' | 'order' | 'slice'
interface QueryConstraint {
  type: QueryConstraintType
}

/* The filter query operator */
type QueryFilterConstraintOperator = '==' | '!=' | 'in' | '<' | '<=' | '>' | '>=' | 'match'
interface QueryFilterConstraint extends QueryConstraint {
  /* The query constraint type. `filter`. */
  type: 'filter'
  /* The field to apply the filter on. */
  field: string
  /* The query filter operator. */
  operator?: QueryFilterConstraintOperator
  /* The filter value. */
  value?: unknown
}

type QueryOrderConstraintDirection = 'asc' | 'desc'
interface QueryOrderConstraint extends QueryConstraint {
  /* The query constraint type. `order`. */
  type: 'order'
  /* The field to apply the sorting on. */
  field: string
  /* The sort direction. */
  direction: QueryOrderConstraintDirection
}

interface QuerySliceConstraint extends QueryConstraint {
  /* The query constraint type. `slice`. */
  type: 'slice'
  /* The index to begin slicing the documents from. */
  startIndex: number
  /* The index to end slicing the documents. */
  endIndex?: number
  /* If the document at the endIndex should be included. */
  inclusive?: boolean
}

export {
  QueryConstraintType,
  QueryConstraint,
  QueryFilterConstraintOperator,
  QueryFilterConstraint,
  QueryOrderConstraintDirection,
  QueryOrderConstraint,
  QuerySliceConstraint,
}
