import { Field, Int, ObjectType, Query, Resolver } from 'type-graphql'
import { GqlContext } from '@server/decorators/gql-context'
import type { Context } from '@server/decorators/gql-context'
import { requireAuth } from '@server/guards/require-auth'

@ObjectType()
class CurrentUser {
  @Field((type) => Int)
  id: number

  @Field()
  email: string

  @Field()
  username: string

  @Field({ nullable: true })
  avatar?: string
}

@Resolver()
export class CurrentUserResolver {
  @Query((returns) => CurrentUser)
  async currentUser(@GqlContext() ctx: Context) {
    const user = requireAuth(ctx)
    return user
  }
}
