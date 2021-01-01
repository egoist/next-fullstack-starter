import { buildSchema } from 'type-graphql'
import { DocumentNode, execute, GraphQLSchema } from 'graphql'
import { Context } from '@server/decorators/gql-context'
import { CurrentUserResolver } from '@server/resolvers/current-user.resolver'

let schema: GraphQLSchema | undefined

export const getSchema = async () => {
  const _schema =
    schema ||
    (await buildSchema({
      resolvers: [CurrentUserResolver],
    }))

  if (process.env.NODE_ENV === 'production') {
    schema = _schema
  }

  return _schema
}

export const queryGraphql = async <TData = any, TVariables = any>(
  query: DocumentNode,
  variableValues: TVariables,
  context: Context,
) => {
  const schema = await getSchema()
  const { data } = (await execute({
    schema,
    document: query,
    variableValues,
    contextValue: context,
  })) as { data: TData }
  return data
}
