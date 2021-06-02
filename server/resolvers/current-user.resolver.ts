import {
  Field,
  FieldResolver,
  Int,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { GqlContext } from '$server/decorators/gql-context'
import type { Context } from '$server/decorators/gql-context'
import { requireAuth } from '$server/guards/require-auth'
import { prisma } from '$server/lib/prisma'

@ObjectType()
class CurrentUser {
  @Field((type) => Int)
  id: number

  @Field()
  email: string

  @Field({ nullable: true })
  avatarUrl?: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@ObjectType()
class Account {
  @Field()
  providerType: string

  @Field()
  providerId: string

  @Field()
  providerAccountId: string
}

@Resolver((of) => CurrentUser)
export default class CurrentUserResolver {
  @Query((returns) => CurrentUser)
  async currentUser(@GqlContext() ctx: Context) {
    const user = requireAuth(ctx)
    return user
  }

  @FieldResolver((returns) => Account)
  account(@Root() user: CurrentUser) {
    return prisma.account.findFirst({
      where: {
        userId: user.id,
      },
    })
  }
}
