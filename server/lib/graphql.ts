import { DocumentNode, execute } from 'graphql'
import { Context } from '$server/decorators/gql-context'
import { schema } from './singletion'

export const queryGraphql = async <TData = any, TVariables = any>(
  query: DocumentNode,
  variableValues: TVariables,
  context: Context,
) => {
  await schema.wait
  const { data } = (await execute({
    schema: schema.value,
    document: query,
    variableValues,
    contextValue: context,
  })) as { data: TData }
  return data
}
