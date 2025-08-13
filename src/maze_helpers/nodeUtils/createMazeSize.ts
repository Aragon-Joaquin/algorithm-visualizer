import type { MazeNodes, Square } from '../../types'

export class createMazeSize {
	XSquares: number
	YSquares: number
	MazeSize: Square[][] //this was unknown [][]

	constructor(XSquares: number, YSquares: number) {
		this.XSquares = XSquares > 0 ? XSquares : 0
		this.YSquares = YSquares > 0 ? YSquares : 0
		this.MazeSize = new Array(this.YSquares).fill(null).map(() => new Array(this.XSquares).fill(null))
	}

	loopMaze(cb: (i: number, j: number) => void) {
		for (let i = 0; i < this.XSquares; i++) {
			for (let j = 0; j < this.YSquares; j++) {
				cb(i, j)
			}
		}
	}

	fillMazeNodes() {
		this.loopMaze((i, j) => {
			this.MazeSize[j][i] = {
				x: i,
				y: j,
				edge: { top: true, right: true, bottom: true, left: true }
			}
		})

		return this.MazeSize as MazeNodes
	}
}
