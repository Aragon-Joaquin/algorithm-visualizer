import type { MazeNodes, Square } from '../../types'
import type { MazeAlgoProps } from '../types'

type randomPos = { pos: number; random: number }

//! Kruskal's Algorithm
export function mazeKruskal({ xAxis, yAxis, mNodes }: MazeAlgoProps): MazeNodes {
	// this is a maze copy that later on be modified
	const maze = mNodes

	//NOTE: generate random array of non repeating numbers.
	let randomPositions: (randomPos | number)[] = []
	for (let i = 0; i < xAxis * yAxis; i++) randomPositions.push({ pos: i, random: Math.random() })

	randomPositions = (randomPositions as randomPos[]).sort((a, b) => a.random - b.random).map((val) => val.pos)
	;(randomPositions as number[]).forEach((val: number) => {
		const yLevel = val >= xAxis ? Math.floor(val / xAxis) - 1 : 0
		const xLevel = Math.floor(val % xAxis)

		const res = calculateMatrixPositions(maze)
		const getRandomPos = (elements: number) => Math.floor(Math.random() * elements)

		//NOTE: check all directions until a square is found.
		const discartingAxis = res(yLevel, xLevel)
		let squareSelected: [string, Square] | null = null
		for (let i = 0; i < 4; i++) {
			const pos = getRandomPos(discartingAxis.length)
			const [cord, square] = discartingAxis[pos]

			const resSquare = square()

			if (resSquare != undefined && !resSquare.visited) {
				squareSelected = [cord, resSquare]
				break
			}
			discartingAxis.splice(pos, 1)
		}
		if (!squareSelected) return

		//NOTE: delete borders between squares (check if they're references or copies of the element)
		const currentSquare = maze[yLevel][xLevel]
		const [cord, square] = squareSelected

		currentSquare.edge[cord as keyof Square['edge']] = false
		square.visited = true
		square.edge[opposite_edges[cord as keyof Square['edge']]] = false
	})

	return maze
}

function calculateMatrixPositions(matrix: MazeNodes) {
	/* is a bad idea recalculate every matrix[y] * 4 (top, right, left, bottom...), 
	so i made them into a function and store the matrixY into a constant in the same scope
	is it horrible code? yes. but it's more performant
	*/
	return (y: number, pos: number) =>
		Object.entries({
			top: () => {
				const res = matrix[y - 1]
				return res && res[pos]
			},
			right: () => {
				const res = matrix[y]
				return res && res[pos + 1]
			},
			bottom: () => {
				const res = matrix[y + 1]
				return res && res[pos]
			},
			left: () => {
				const res = matrix[y]
				return res && res[pos - 1]
			}
		})
}

// TODO: try a better way
const opposite_edges = {
	top: 'bottom',
	right: 'left',
	bottom: 'top',
	left: 'right'
} as const
