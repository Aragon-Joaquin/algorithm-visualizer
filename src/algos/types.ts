import type { MazeInfo, MazeNodes, MazeProps } from '../types'
import { mazeKruskal } from './maze'
import { traversalDFS } from './traversal'

// for all functions: (xAxis: number, yAxis: number, m: MazeNodes)
export const MAZE_ALGORITHMS = {
	Kruskal: mazeKruskal
} as const

export const TRAVERSAL_ALGORITHMS = {
	DFS: traversalDFS
} as const

// just
export const InitializeMazeAlgorithm = (
	algo: (typeof MAZE_ALGORITHMS)[keyof typeof MAZE_ALGORITHMS] | undefined,
	args: MazeAlgoProps
) => (!algo ? MAZE_ALGORITHMS.Kruskal(args) : algo(args))

//!NOTE: types declarations:
export interface MazeAlgoProps {
	xAxis: number
	yAxis: number
	mNodes: MazeNodes
}

export interface TraversalProps {
	EndPoint: MazeInfo['EndPoint']
	StartPoint: MazeInfo['StartPoint']
	Nodes: MazeNodes
	MazeProps: MazeProps
}
