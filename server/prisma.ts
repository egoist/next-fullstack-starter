import { PrismaClient } from '@prisma/client'
import { singleton } from './singleton'

export const prisma = singleton('prisma', () => new PrismaClient())
