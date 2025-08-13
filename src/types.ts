import type { MAZE_ALGORITHMS } from './algos/types'
import type { getSquareSizes } from './maze_helpers'

//NOTE: the difference between mazeProps & mazeInfo is explained in mazeContext.tsx
export interface MazeProps {
	XSquares: number
	YSquares: number
	canvasWidth: number
	canvasHeight: number

	SquareSizes: ReturnType<typeof getSquareSizes>
	ctx: CanvasRenderingContext2D
	canvasElement: HTMLCanvasElement
}

export interface Square {
	x: number
	y: number
	edge: {
		top: boolean
		right: boolean
		bottom: boolean
		left: boolean
	}
}

export type MazeNodes = Square[][]

export type mazeCoords = { x: number; y: number }

export interface MazeInfo {
	Nodes: MazeNodes
	EndPoint: mazeCoords
	StartPoint: mazeCoords
	Algorithm?: (typeof MAZE_ALGORITHMS)[keyof typeof MAZE_ALGORITHMS]
}
