export interface Maze {
	XSquares: number
	YSquares: number
}

export interface Square {
	width: number
	height: number
	visited?: boolean
	edge?: {
		top: boolean
		right: boolean
		bottom: boolean
		left: boolean
	}
}

