import type { MazeNodes, MazeProps } from '../types'
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

	maze.loopMaze((i, j) => {
		const xPos = i * SWidth
		const yPos = j * SHeight

		//draw all borders
		ctx.fillStyle = 'black'
		ctx.fillRect(xPos - SThick, yPos - SThick, SWidth + SThick * 2, SHeight + SThick * 2)

		//fill square white
		ctx.fillStyle = 'white'
		ctx.fillRect(xPos, yPos, SWidth - SThick, SHeight - SThick)

		maze.MazeSize[j][i] = {
			visited: false,
			edge: { top: true, right: true, bottom: true, left: true }
		}
	})

	return maze.MazeSize as MazeNodes
}
