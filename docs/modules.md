[@aonawale/react-sanity-hooks](README.md) / Exports

# @aonawale/react-sanity-hooks

## Table of contents

### Functions

- [useGetDocument](modules.md#usegetdocument)
- [useQuery](modules.md#usequery)
- [useQueryDocuments](modules.md#usequerydocuments)

## Functions

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
| `data` | `undefined` \| `T` |
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

[hooks/use-get-document/use-get-document.ts:28](https://github.com/aonawale/react-sanity-hooks/blob/424ba8e/src/hooks/use-get-document/use-get-document.ts#L28)

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
| `query?` | `Query` | The query to fetch data with. |
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

[hooks/use-query/use-query.ts:25](https://github.com/aonawale/react-sanity-hooks/blob/424ba8e/src/hooks/use-query/use-query.ts#L25)

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

[hooks/use-query-documents/use-query-documents.ts:31](https://github.com/aonawale/react-sanity-hooks/blob/424ba8e/src/hooks/use-query-documents/use-query-documents.ts#L31)
