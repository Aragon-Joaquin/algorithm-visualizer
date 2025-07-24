//NOTE: the difference between mazeProps & mazeInfo is explained in mazeContext.tsx

export interface MazeProps {
	XSquares: number
	YSquares: number
	//Algorithm
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

export type MazeNodes = Square[][]

export interface MazeInfo {
	Nodes: MazeNodes
}
