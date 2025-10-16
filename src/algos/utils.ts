import { RenderWithAnimationFrame } from '@/maze_helpers'
import type { MazeInfo } from '@/types'
import { CalculatePerformanceNow, type CalculatePerformanceType } from '@/utils'
import { mazeBTree, mazeEllers, mazeGrowingTree, mazeKruskal, mazePrims, mazeRecBacktrack } from './maze'
import { traversalAStar, traversalDeadEndFill, traversalDFS, traversalPledge, traversalRandomMouse } from './traversal'
import type { MazeAlgoProps, TraversalProps } from './types'

// for all functions: (xAxis: number, yAxis: number, m: MazeNodes)
export const MAZE_ALGORITHMS = {
	Kruskal: mazeKruskal,
	Binary: mazeBTree,
	Ellers: mazeEllers,
	RecursiveBacktracking: mazeRecBacktrack,
	'Prims (custom)': mazePrims,
	'Growing Tree': mazeGrowingTree
} as const

export const TRAVERSAL_ALGORITHMS = {
	DFS: traversalDFS,
	AStar: traversalAStar,
	Pledge: traversalPledge,
	'DeadEnd Filling': traversalDeadEndFill,
	'Random Mouse': traversalRandomMouse
} as const
// Initializers
export const InitializeMazeAlgorithm = (algo: keyof typeof MAZE_ALGORITHMS | undefined, args: MazeAlgoProps) => {
	const algoFound = MAZE_ALGORITHMS[algo as keyof typeof MAZE_ALGORITHMS]
	return !algoFound ? MAZE_ALGORITHMS.Kruskal(args) : algoFound(args)
}

type InitializeTraversal = Omit<TraversalProps, 'Path'> & {
	Algorithm: keyof typeof TRAVERSAL_ALGORITHMS | undefined
	StartPoint: MazeInfo['StartPoint']
}

export function InitializeMazeTraversal({ Algorithm, EndPoint, StartPoint, Nodes, MazeProps }: InitializeTraversal) {
	const { ctx, SquareSizes } = MazeProps

	const genFunc = !Algorithm ? TRAVERSAL_ALGORITHMS.DFS : TRAVERSAL_ALGORITHMS[Algorithm]
	const firstCall = genFunc({ EndPoint, Nodes, MazeProps, StartPoint })(StartPoint)

	const calcTime = CalculatePerformanceNow()
	const animationF = new RenderWithAnimationFrame(ctx, SquareSizes)

	//yield squarePainted/void on the value if the endpoint is found
	try {
		while (true) {
			const res = firstCall.next()
			if (res.value != undefined) animationF.pushToPaint(res.value)
			else break
		}
	} catch {
		//TODO: improve this... or not?
	}

	//! calcTime() is the time the algorithm taken without any other interruption (like painting)
	//! animationF.queueToPaint.length is the total paint iterations
	const propsToReturn = [calcTime(), animationF.queueToPaint.length]

	//then we render it until the queue is empty
	animationF.renderSquare()

	return propsToReturn as [CalculatePerformanceType, number]
}
