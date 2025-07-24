import type { MazeNodes, MazeProps } from "../types"

export function createMaze(ctx: CanvasRenderingContext2D, canvas: { height: number; width: number }, mazeProps: MazeProps): MazeNodes {
	const { XSquares, YSquares } = mazeProps
	const { height, width } = canvas
	const maze: MazeNodes = []

	ctx.clearRect(0, 0, width, height)

	const {
		width: SWidth,
		height: SHeigth,
		thickness: SThick,
	} = {
		width: width / XSquares,
		height: height / YSquares,
		thickness: 2,
	}

	// squares generation
	ctx.strokeStyle = "black"
	ctx.fillStyle = "white"
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
				edge: { top: true, bottom: true, left: true, right: true },
			}
		}
	}

	return maze
}
