import type { MazeNodes, MazeProps } from '../types'
import { COLORS_SQUARE } from '../utils'
import { createMazeSize, SquarePainter } from './'

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

	ctx.fillStyle = COLORS_SQUARE.WHITE
	ctx.strokeStyle = COLORS_SQUARE.BLACK

	const paint = new SquarePainter(ctx, SWidth, SHeight, SThick)
	maze.loopMaze((i, j) => {
		const xPos = i * SWidth
		const yPos = j * SHeight

		//fill square white
		paint.paintOne(xPos, yPos)

		maze.MazeSize[j][i] = {
			visited: false,
			edge: { top: true, right: true, bottom: true, left: true }
		}
	})

	return maze.MazeSize as MazeNodes
}
