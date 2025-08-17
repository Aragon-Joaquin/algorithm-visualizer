import type { MazeInfo } from '../types'
import { mazeKruskal } from './maze'
import { traversalDFS } from './traversal'
import type { MazeAlgoProps, TraversalProps } from './types'

// for all functions: (xAxis: number, yAxis: number, m: MazeNodes)
export const MAZE_ALGORITHMS = {
	Kruskal: mazeKruskal
} as const

export const TRAVERSAL_ALGORITHMS = {
	DFS: traversalDFS
} as const

// Initializers
export const InitializeMazeAlgorithm = (
	algo: (typeof MAZE_ALGORITHMS)[keyof typeof MAZE_ALGORITHMS] | undefined,
	args: MazeAlgoProps
) => (!algo ? MAZE_ALGORITHMS.Kruskal(args) : algo(args))

type InitializeTraversal = Omit<TraversalProps, 'Path'> & {
	Algorithm: keyof typeof TRAVERSAL_ALGORITHMS | undefined
	StartPoint: MazeInfo['StartPoint']
	Interval?: number
}

export async function InitializeMazeTraversal({
	Algorithm,
	EndPoint,
	StartPoint,
	Nodes,
	MazeProps,
	Interval = 50
}: InitializeTraversal) {
	const genFunc = !Algorithm ? TRAVERSAL_ALGORITHMS.DFS : TRAVERSAL_ALGORITHMS[Algorithm]
	const firstCall = genFunc({ EndPoint, Nodes, MazeProps, Path: [] })(StartPoint)

	const timeNow = Date.now()

	//yield true on the value if the endpoint is found
	while (!firstCall.next().value) {
		await new Promise((resolve) => setTimeout(resolve, Interval))
	}

	return (Date.now() - timeNow) / 1000 //1000 milliseconds
}
