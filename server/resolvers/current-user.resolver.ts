import { Field, Int, ObjectType, Query, Resolver, Root } from 'type-graphql'
import { GqlContext } from '$server/gql-context'
import type { Context } from '$server/gql-context'
import { guard } from '$server/auth'

@ObjectType()
class CurrentUser {
  @Field((type) => Int)
  id: number

  @Field()
  name: string

  @Field()
  email: string

  @Field({ nullable: true })
  image?: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@Resolver((of) => CurrentUser)
export default class CurrentUserResolver {
  @Query((returns) => CurrentUser)
  async currentUser(@GqlContext() ctx: Context) {
    const { user } = guard(ctx)
    return user
  }
}
