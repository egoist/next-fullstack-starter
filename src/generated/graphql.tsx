import { DocumentNode } from 'graphql'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type CurrentUser = {
  __typename?: 'CurrentUser'
  id: Scalars['Int']
  name: Scalars['String']
  email: Scalars['String']
  image?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type Query = {
  __typename?: 'Query'
  currentUser: CurrentUser
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = { __typename?: 'Query' } & {
  currentUser: { __typename?: 'CurrentUser' } & Pick<
    CurrentUser,
    'id' | 'name' | 'email' | 'image'
  >
}

export const CurrentUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'currentUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currentUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode

export function useCurrentUserQuery(
  options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<CurrentUserQuery>({
    query: CurrentUserDocument,
    ...options,
  })
}
