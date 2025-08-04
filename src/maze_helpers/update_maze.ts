import type { MazeNodes, MazeProps } from '../types'
import { borderBuilder, createMazeSize } from './nodeUtils'

// updateMaze/PaintMaze
// newMaze = new maze (overlaps over the current one)

export function UpdateMaze(newMaze: MazeNodes | null, mazeProps: MazeProps) {
	if (!newMaze) return

	const {
		SquareSizes: { SHeight, SWidth, SThick },
		XSquares,
		YSquares,
		ctx,
		canvasHeight,
		canvasWidth
	} = mazeProps

	ctx.fillStyle = 'white'

	const mazeSize = new createMazeSize(XSquares, YSquares)

	// testing
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)

	mazeSize.loopMaze((i, j) => {
		const xPos = i * SWidth
		const yPos = j * SHeight

		const nSquare = newMaze[j][i]
		const BBuilder = borderBuilder(ctx, xPos, yPos, SWidth, SHeight, SThick)
		BBuilder({ edges: nSquare['edge'] })

		// if (checkIfNodesEquals(pSquare, nSquare)) return

		// for (const key in nSquare['edge']) {
		// const assertedKey = key as keyof Square['edge']
		// if (pSquare['edge'][assertedKey] === nSquare['edge'][assertedKey]) continue
		// 	return
		// }
	})
}
