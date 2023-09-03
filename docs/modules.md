[@aonawale/react-sanity-hooks](README.md) / Exports

# @aonawale/react-sanity-hooks

## Table of contents

### Interfaces

- [Query](interfaces/Query.md)
- [QueryConstraint](interfaces/QueryConstraint.md)
- [QueryFilterConstraint](interfaces/QueryFilterConstraint.md)
- [QueryOrderConstraint](interfaces/QueryOrderConstraint.md)
- [QuerySliceConstraint](interfaces/QuerySliceConstraint.md)

### Type Aliases

- [QueryConstraintType](modules.md#queryconstrainttype)
- [QueryFilterConstraintOperator](modules.md#queryfilterconstraintoperator)
- [QueryOrderConstraintDirection](modules.md#queryorderconstraintdirection)

### Functions

- [buildQuery](modules.md#buildquery)
- [filter](modules.md#filter)
- [filterQuery](modules.md#filterquery)
- [findConstraints](modules.md#findconstraints)
- [order](modules.md#order)
- [orderQuery](modules.md#orderquery)
- [slice](modules.md#slice)
- [sliceQuery](modules.md#slicequery)
- [useGetDocument](modules.md#usegetdocument)
- [useQuery](modules.md#usequery)
- [useQueryDocuments](modules.md#usequerydocuments)

## Type Aliases

### QueryConstraintType

Ƭ **QueryConstraintType**: ``"filter"`` \| ``"order"`` \| ``"slice"``

#### Defined in

[types/query-constraint.ts:2](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/types/query-constraint.ts#L2)

___

### QueryFilterConstraintOperator

Ƭ **QueryFilterConstraintOperator**: ``"=="`` \| ``"!="`` \| ``"in"`` \| ``"<"`` \| ``"<="`` \| ``">"`` \| ``">="`` \| ``"match"``

#### Defined in

[types/query-constraint.ts:8](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/types/query-constraint.ts#L8)

___

### QueryOrderConstraintDirection

Ƭ **QueryOrderConstraintDirection**: ``"asc"`` \| ``"desc"``

#### Defined in

[types/query-constraint.ts:20](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/types/query-constraint.ts#L20)

## Functions

### buildQuery

▸ **buildQuery**(`query`): `string`

A function that builds a query from a query object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | [`Query`](interfaces/Query.md) | A query object. |

#### Returns

`string`

A query string.

**`Example`**

```ts
const query = {
 constraints: [
  {
    type: 'filter',
    field: 'name',
    operator: 'match',
    value: 'John',
  },
  {
    type: 'order',
    field: 'age',
    direction: 'asc',
   },
   {
    type: 'slice',
    startIndex: 0,
    endIndex: 10,
    inclusive: false,
   },
 ],
}
const queryString = buildQuery(query)
console.log(queryString)
=> *[name match 'John'] | order(age asc) [0...10]
```

#### Defined in

[utils/query/query.ts:140](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/utils/query/query.ts#L140)

___

### filter

▸ **filter**(`field`, `operator`, `value`): [`QueryFilterConstraint`](interfaces/QueryFilterConstraint.md)

A function that builds a filter query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `field` | `string` | The field to apply the filter on. |
| `operator` | [`QueryFilterConstraintOperator`](modules.md#queryfilterconstraintoperator) | The filter operator. |
| `value` | `unknown` | The filter value. |

#### Returns

[`QueryFilterConstraint`](interfaces/QueryFilterConstraint.md)

A filter query.

**`Example`**

```ts
const filterQuery = filter('name', 'match', 'John')
```

#### Defined in

[utils/query-constraint/query-constraint.ts:18](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/utils/query-constraint/query-constraint.ts#L18)

___

### filterQuery

▸ **filterQuery**(`constraints`): `string`

A function that builds a filter query from a list of filter constraints.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `constraints` | [`QueryFilterConstraint`](interfaces/QueryFilterConstraint.md)[] | An array of filter constraints. |

#### Returns

`string`

A filter query string.

**`Example`**

```ts
const constraints = [
 {
   type: 'filter',
   field: 'name',
   operator: 'match',
   value: 'John',
 },
 {
   type: 'filter',
   field: 'age',
   operator: '>=',
   value: 18,
 },
]
const filterQueryString = filterQuery(constraints)
console.log(filterQueryString)
=> [name match 'John'] && [age >= 18]
```

#### Defined in

[utils/query/query.ts:43](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/utils/query/query.ts#L43)

___

### findConstraints

▸ **findConstraints**<`T`\>(`constraints`, `type`): `T`[]

A generic function that finds constraints of a specific type and
returns them as an array of the generic type provided during the function call.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `constraints` | [`QueryConstraint`](interfaces/QueryConstraint.md)[] | An array of query constraints. |
| `type` | [`QueryConstraintType`](modules.md#queryconstrainttype) | The type of query constraint to find. |

#### Returns

`T`[]

An array of query constraints of the specified type.

#### Defined in

[utils/query/query.ts:17](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/utils/query/query.ts#L17)

___

### order

▸ **order**(`field`, `direction`): [`QueryOrderConstraint`](interfaces/QueryOrderConstraint.md)

A function that builds an order query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `field` | `string` | The field to apply the sorting on. |
| `direction` | [`QueryOrderConstraintDirection`](modules.md#queryorderconstraintdirection) | The sort direction. |

#### Returns

[`QueryOrderConstraint`](interfaces/QueryOrderConstraint.md)

An order query.

**`Example`**

```ts
const orderQuery = order('age', 'asc')
```

#### Defined in

[utils/query-constraint/query-constraint.ts:37](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/utils/query-constraint/query-constraint.ts#L37)

___

### orderQuery

▸ **orderQuery**(`constraints`): `string`

A function that builds an order query from a list of order constraints.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `constraints` | [`QueryOrderConstraint`](interfaces/QueryOrderConstraint.md)[] | An array of order constraints. |

#### Returns

`string`

An order query string.

**`Example`**

```ts
const constraints = [
 {
   type: 'order',
   field: 'age',
   direction: 'asc',
 },
 {
   type: 'order',
   field: 'name',
   direction: 'desc',
 },
]
const orderQueryString = orderQuery(constraints)
console.log(orderQueryString)
=> order(age asc) | order(name desc)
```

#### Defined in

[utils/query/query.ts:76](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/utils/query/query.ts#L76)

___

### slice

▸ **slice**(`startIndex`, `endIndex?`, `inclusive?`): [`QuerySliceConstraint`](interfaces/QuerySliceConstraint.md)

A function that builds a slice query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startIndex` | `number` | The index to begin slicing the documents from. |
| `endIndex?` | `number` | The amount of documents to return. |
| `inclusive?` | `boolean` | - |

#### Returns

[`QuerySliceConstraint`](interfaces/QuerySliceConstraint.md)

A slice query.

**`Example`**

```ts
const sliceQuery = slice(0, 10)
```

#### Defined in

[utils/query-constraint/query-constraint.ts:51](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/utils/query-constraint/query-constraint.ts#L51)

___

### sliceQuery

▸ **sliceQuery**(`constraint`): `string`

A function that builds a slice query from a slice constraint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `constraint` | [`QuerySliceConstraint`](interfaces/QuerySliceConstraint.md) | A slice constraint. |

#### Returns

`string`

A slice query string.

**`Example`**

```ts
const constraint = {
 type: 'slice',
 startIndex: 0,
 endIndex: 10,
 inclusive: false,
}
const sliceQueryString = sliceQuery(constraint)
console.log(sliceQueryString)
=> [0...10]
```

#### Defined in

[utils/query/query.ts:96](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/utils/query/query.ts#L96)

___

### useGetDocument

▸ **useGetDocument**<`T`\>(`client`, `query?`, `projection?`): `Object`

A hook that fetches a document from Sanity.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `SanityClient` | The Sanity client. |
| `query?` | `GetDocument` | The query to fetch a document with. |
| `projection?` | `string` | The projection to fetch a document with. |

#### Returns

`Object`

The query response.

| Name | Type |
| :------ | :------ |
| `data` | `undefined` \| `T`[] |
| `error` | `any` |
| `isLoading` | `boolean` |

**`Example`**

```ts
const client = sanityClient({...})
const query = {
 id: '123',
}
const projection = '_id, name, age'
const {data, error, isLoading} = useGetDocument(client, query, projection)
console.log(data, error, isLoading)
=> {_id: '...', name: 'John', age: 42}, undefined, false
```

#### Defined in

[hooks/use-get-document/use-get-document.ts:28](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/hooks/use-get-document/use-get-document.ts#L28)

___

### useQuery

▸ **useQuery**<`T`\>(`client`, `query?`, `projection?`): `Object`

A hook that fetches data from Sanity.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `SanityClient` | The Sanity client. |
| `query?` | [`Query`](interfaces/Query.md) | The query to fetch data with. |
| `projection?` | `string` | The projection to fetch data with. |

#### Returns

`Object`

The query response.

| Name | Type |
| :------ | :------ |
| `data` | `undefined` \| `T` |
| `error` | `any` |
| `isLoading` | `boolean` |

**`Example`**

```ts
const client = sanityClient({...})
const query = {
 constraints: [
  filter('name', 'match', 'John'),
  order('age', 'asc'),
  slice(0, 10),
 ],
}
const projection = '_id, name, age'
const {data, error, isLoading} = useQuery(client, query, projection)
console.log(data, error, isLoading)
=> [{_id: '...', name: 'John', age: 42}, ...], undefined, false
```

#### Defined in

[hooks/use-query/use-query.ts:27](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/hooks/use-query/use-query.ts#L27)

___

### useQueryDocuments

▸ **useQueryDocuments**<`T`\>(`client`, `query?`, `projection?`): `Object`

A hook that fetches documents from Sanity.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `SanityClient` | The Sanity client. |
| `query?` | `QueryDocuments` | The query to fetch documents with. |
| `projection?` | `string` | The projection to fetch documents with. |

#### Returns

`Object`

The query response.

| Name | Type |
| :------ | :------ |
| `data` | `undefined` \| `T`[] |
| `error` | `any` |
| `isLoading` | `boolean` |

**`Example`**

```ts
const client = sanityClient({...})
const query = {
 type: 'person',
 constraints: [
   filter('name', 'match', 'John'),
   order('age', 'asc'),
   slice(0, 10),
 ],
}
const projection = '_id, name, age'
const {data, error, isLoading} = useQueryDocuments(client, query, projection)
console.log(data, error, isLoading)
=> [{_id: '...', name: 'John', age: 42}, ...], undefined, false
```

#### Defined in

[hooks/use-query-documents/use-query-documents.ts:32](https://github.com/aonawale/react-sanity-hooks/blob/eb16935/src/hooks/use-query-documents/use-query-documents.ts#L32)
