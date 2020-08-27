import { ApolloError } from 'apollo-server-micro'
import { ModelTeam } from '@server/db.types'
import { ModelUserWithMembers } from './require-auth'

export async function requireTeamAccess(
  level: 'member' | 'admin',
  user: ModelUserWithMembers,
  team: ModelTeam,
) {
  const member = user.members.find((member) => member.team_id === team.id)

  if (level === 'admin' && (!member || !member.is_admin)) {
    throw new ApolloError(`Require admin permission to access this team`)
  }

  if (!member) {
    throw new ApolloError(`You're not a member of this team`)
  }
}
