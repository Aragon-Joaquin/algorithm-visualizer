import type { MazeNodes, MazeProps, Square } from '../types'
import { borderBuilder, checkIfNodesEquals } from './nodeUtils'

// updateMaze/PaintMaze
// prevMaze = previous maze
// newMaze = new maze (overlaps over the current one)
export function UpdateMaze(prevMaze: MazeNodes, newMaze: MazeNodes | null, mazeProps: MazeProps) {
	if (!newMaze) return

	const {
		SquareSizes: { SHeight, SWidth, SThick },
		XSquares,
		YSquares,
		ctx
	} = mazeProps

	ctx.strokeStyle = 'black'
	ctx.fillStyle = 'white'

	// squares generation
	for (let i = 0; i < XSquares; i++) {
		for (let j = 0; j < YSquares; j++) {
			const xPos = i * SWidth
			const yPos = j * SHeight

			const [pSquare, nSquare] = [prevMaze[j][i], newMaze[j][i]]

			if (checkIfNodesEquals(pSquare, nSquare)) continue

			const BBuilder = borderBuilder(ctx, xPos, yPos, SWidth, SHeight, SThick)

			for (const key in pSquare['edge']) {
				const assertedKey = key as keyof Square['edge']
				if (pSquare['edge'][assertedKey] == nSquare['edge'][assertedKey]) continue

				// if border exists, then it removes it. else, it paints it
				BBuilder({ pos: assertedKey, remove: pSquare['edge'][assertedKey] ?? false })
				continue
			}
		}
	}
}
