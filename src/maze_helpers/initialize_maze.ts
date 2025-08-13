import type { MazeNodes, MazeProps } from '../types'
import { createMazeSize } from './'

export function initializeMaze(mazeProps: MazeProps): MazeNodes {
	const { XSquares, YSquares, canvasHeight, canvasWidth, ctx } = mazeProps

	const maze = new createMazeSize(XSquares, YSquares)

	//clear everything
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)

	maze.fillMazeNodes()

	return maze.MazeSize
}
