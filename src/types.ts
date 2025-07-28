//NOTE: the difference between mazeProps & mazeInfo is explained in mazeContext.tsx

import type { MAZE_ALGORITHMS } from './algos/types'

export interface MazeProps {
	XSquares: number
	YSquares: number
	canvasWidth: number
	canvasHeight: number

	Algorithm?: keyof typeof MAZE_ALGORITHMS
	ctx: CanvasRenderingContext2D
}

export interface Square {
	visited: boolean
	edge: {
		top: boolean
		right: boolean
		bottom: boolean
		left: boolean
	}
}

export type MazeNodes = Square[][]

export interface MazeInfo {
	Nodes: MazeNodes
}
