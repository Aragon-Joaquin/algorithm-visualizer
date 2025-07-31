import { mazeKruskal } from './maze'

// for all functions: (xAxis: number, yAxis: number, m: MazeNodes)
export const MAZE_ALGORITHMS = {
	Kruskal: mazeKruskal
} as const

export const PATHFINDING_ALGOS = {} as const
