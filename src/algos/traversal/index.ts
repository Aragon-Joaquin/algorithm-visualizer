import type { squarePainted } from '@/maze_helpers'

export type GenReturn = Generator<squarePainted | void, void>

export * from './AStar'
export * from './DFS'
export * from './Pledge'
