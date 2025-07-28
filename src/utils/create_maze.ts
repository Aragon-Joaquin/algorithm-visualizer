import type { MazeNodes, MazeProps } from '../types'
import { getSquareSizes } from './nodeUtils'

export function initializeMaze(mazeProps: MazeProps): MazeNodes {
	const { XSquares, YSquares, canvasHeight, canvasWidth, ctx } = mazeProps
	const maze: MazeNodes = []

	//clear everything
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)

	const { SHeigth, SWidth, SThick } = getSquareSizes(
		{ width: canvasWidth, height: canvasHeight },
		{ x: XSquares, y: YSquares }
	)

	for (let i = 0; i < XSquares; i++) {
		for (let j = 0; j < YSquares; j++) {
			const xPos = i * SWidth
			const yPos = j * SHeigth

			//fill square white
			ctx.fillRect(xPos, yPos, SWidth - SThick, SHeigth - SThick)

			//draw all borders
			ctx.fillRect(xPos - SThick, yPos - SThick, SWidth + SThick * 2, SHeigth + SThick * 2)

			maze[i][j] = {
				visited: false,
				edge: { top: true, right: true, bottom: true, left: true }
			}
		}
	}

	return maze
}
