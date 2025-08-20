import { createMazeSize, SquarePainter } from '../maze_helpers'
import type { MazeInfo, MazeNodes, MazeProps } from '../types'
import { COLORS_SQUARE } from '../utils/declarations'

// updateMaze/PaintMaze
// newMaze = new maze (overlaps over the current one)

export function UpdateMaze(
	newMaze: MazeNodes | null,
	mazeProps: MazeProps,
	endpoint: MazeInfo['EndPoint'],
	startPoint: MazeInfo['StartPoint']
) {
	if (!newMaze || !mazeProps.ctx) return
	const {
		SquareSizes: { SHeight, SWidth, SThick },
		XSquares,
		YSquares,
		ctx,
		canvasHeight,
		canvasWidth
	} = mazeProps

	const mazeSize = new createMazeSize(XSquares, YSquares)
	const paint = new SquarePainter(ctx, SWidth, SHeight, SThick)

	// clear the entire canvas to repaint everything again (fix this later)
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)

	mazeSize.loopMaze((i, j) => {
		//very bad code
		const condition =
			startPoint.x === i && startPoint.y === j
				? COLORS_SQUARE.ORANGE
				: endpoint.x === i && endpoint.y === j
				? COLORS_SQUARE.GREEN
				: COLORS_SQUARE.WHITE

		const nSquare = newMaze[j][i]
		paint.paintOne(i, j, {
			edges: nSquare.edge,
			color: condition
		})
	})
}
