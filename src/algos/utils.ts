import { RenderWithAnimationFrame } from '../maze_helpers/renderWithAnimationFrame'
import type { MazeInfo } from '../types'
import { CalculatePerformanceNow } from '../utils'
import { mazeKruskal } from './maze'
import { traversalAStar, traversalDFS } from './traversal'
import type { MazeAlgoProps, TraversalProps } from './types'

// for all functions: (xAxis: number, yAxis: number, m: MazeNodes)
export const MAZE_ALGORITHMS = {
	Kruskal: mazeKruskal
} as const

export const TRAVERSAL_ALGORITHMS = {
	DFS: traversalDFS,
	AStar: traversalAStar
} as const

// Initializers
export const InitializeMazeAlgorithm = (
	algo: (typeof MAZE_ALGORITHMS)[keyof typeof MAZE_ALGORITHMS] | undefined,
	args: MazeAlgoProps
) => (!algo ? MAZE_ALGORITHMS.Kruskal(args) : algo(args))

type InitializeTraversal = Omit<TraversalProps, 'Path'> & {
	Algorithm: keyof typeof TRAVERSAL_ALGORITHMS | undefined
	StartPoint: MazeInfo['StartPoint']
}

export async function InitializeMazeTraversal({
	Algorithm,
	EndPoint,
	StartPoint,
	Nodes,
	MazeProps
}: InitializeTraversal) {
	const { ctx, SquareSizes } = MazeProps

	const genFunc = !Algorithm ? TRAVERSAL_ALGORITHMS.DFS : TRAVERSAL_ALGORITHMS[Algorithm]
	const firstCall = genFunc({ EndPoint, Nodes, MazeProps, StartPoint })(StartPoint)

	const calcTime = CalculatePerformanceNow()
	const animationF = new RenderWithAnimationFrame(ctx, SquareSizes)

	//yield squarePainted/void on the value if the endpoint is found
	while (true) {
		const res = firstCall.next()
		if (res.value != undefined) animationF.pushToPaint(res.value)
		else break
	}

	console.log('totalPaintIterations: ', animationF.queueToPaint.length)

	//then we render it until the queue is empty
	animationF.renderSquare()

	return calcTime()
}
