import type { MazeNodes, MazeProps } from '../types'
import { COLORS_SQUARE } from '../utils'
import { createMazeSize } from './nodeUtils'

export function initializeMaze(mazeProps: MazeProps): MazeNodes {
	const {
		XSquares,
		YSquares,
		canvasHeight,
		canvasWidth,
		ctx,
		SquareSizes: { SHeight, SWidth, SThick }
	} = mazeProps

	const maze = new createMazeSize(XSquares, YSquares)
	//clear everything
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)

	ctx.lineWidth = SThick
	ctx.fillStyle = COLORS_SQUARE.WHITE
	ctx.strokeStyle = COLORS_SQUARE.BLACK

	maze.loopMaze((i, j) => {
		const xPos = i * SWidth
		const yPos = j * SHeight

		//fill square white
		ctx.fillRect(xPos, yPos, SWidth, SHeight)

		// //draw all borders
		// ctx.strokeRect(xPos, yPos, SWidth, SHeight)

		maze.MazeSize[j][i] = {
			visited: false,
			edge: { top: true, right: true, bottom: true, left: true }
		}
	})

	return maze.MazeSize as MazeNodes
}
