import type { MazeNodes, MazeProps, Square } from '../types'
import { borderBuilder, checkIfNodesEquals, getSquareSizes } from './nodeUtils'

// updateMaze/PaintMaze
// cMaze = current maze
// nMaze = new maze (overlaps over the current one)
export function UpdateMaze(cMaze: MazeNodes, nMaze: MazeNodes, ctx: CanvasRenderingContext2D, mazeProps: MazeProps) {
	const { canvasWidth, canvasHeight, XSquares, YSquares } = mazeProps

	// squares generation
	ctx.strokeStyle = 'black'
	ctx.fillStyle = 'white'

	const { SHeigth, SWidth, SThick } = getSquareSizes(
		{ width: canvasWidth, height: canvasHeight },
		{ x: XSquares, y: YSquares }
	)

	// squares generation
	ctx.strokeStyle = 'black'
	ctx.fillStyle = 'white'
	for (let i = 0; i < XSquares; i++) {
		for (let j = 0; j < YSquares; j++) {
			const xPos = i * SWidth
			const yPos = j * SHeigth
			const [cSquare, nSquare] = [cMaze[yPos][xPos], nMaze[yPos][xPos]]

			if (checkIfNodesEquals(cSquare, nSquare)) return

			const BBuilder = borderBuilder(ctx, xPos, yPos, SWidth, SHeigth, SThick)

			for (const key in cSquare['edge']) {
				const assertedKey = key as keyof Square['edge']
				if (cSquare['edge'][assertedKey] == nSquare['edge'][assertedKey]) return

				// clear previous border and check if it needs to add new one
				const addBorder = BBuilder[assertedKey]
				return addBorder == null || addBorder()
			}
		}
	}
}
