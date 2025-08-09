import type { MazeNodes, MazeProps } from '../types'
import { createMazeSize } from './'

export function initializeMaze(mazeProps: MazeProps): MazeNodes {
	const { XSquares, YSquares, canvasHeight, canvasWidth, ctx } = mazeProps

	const maze = new createMazeSize(XSquares, YSquares)
	//clear everything
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)

	maze.loopMaze((i, j) => {
		maze.MazeSize[j][i] = {
			visited: false,
			edge: { top: true, right: true, bottom: true, left: true }
		}
	})

	return maze.MazeSize as MazeNodes
}
