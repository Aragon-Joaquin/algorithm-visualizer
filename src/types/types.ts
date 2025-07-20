export interface Maze {
	XSquares: number
	YSquares: number
}
export interface Square {
	visited: boolean
	edge: {
		top: boolean
		right: boolean
		bottom: boolean
		left: boolean
	}
}

