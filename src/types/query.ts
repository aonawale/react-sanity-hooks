import {QueryConstraint} from './query-constraint'

interface Query {
  /* The query constraints. */
  constraints?: QueryConstraint[]
  /* The query ordering behavior. This determines if the documents ordering should only apply to only the set of selected/filtered documents or all documents. */
  ordering?: 'all' | 'selection'
}

export {Query}
