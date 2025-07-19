import type { Maze, Square } from "./types/types"

export default function App() {
	return <></>
}

function getCanvas() {
	const canvas = document?.getElementById('main-canvas') as HTMLCanvasElement | null
	const ctx = canvas?.getContext('2d')

	if (!ctx || !canvas) return

	ctx.clearRect(0, 0, canvas.width, canvas.height)
	createMaze(ctx, { XSquares: 25, YSquares: 20 }, { height: canvas.height, width: canvas.width })
}

function createMaze(ctx: CanvasRenderingContext2D, Maze: Maze, canvas: { height: number; width: number }) {
	const { XSquares, YSquares } = Maze
	const { height, width } = canvas

	const SquareProps: Square = {
		width: width / XSquares,
		height: height / YSquares
	}

	// borders
	ctx.strokeStyle = 'white'
	for (let i = 0; i < XSquares; i++) {
		for (let j = 0; j < YSquares; j++) {
			ctx.strokeRect(i * SquareProps.width, j * SquareProps.height, SquareProps.width, SquareProps.height)
		}
	}

	// squares
	ctx.strokeStyle = 'black'
	ctx.fillStyle = 'white'
	for (let i = 0; i < XSquares; i++) {
		for (let j = 0; j < YSquares; j++) {
			ctx.fillRect(i * SquareProps.width + 1, j * SquareProps.height + 1, SquareProps.width - 2, SquareProps.height - 2)
		}
	}
}

getCanvas()
