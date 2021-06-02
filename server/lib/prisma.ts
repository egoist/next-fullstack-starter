import { PrismaClient } from '@prisma/client'
import { singleton } from './singletion'

export const prisma = singleton('prisma', () => new PrismaClient())
