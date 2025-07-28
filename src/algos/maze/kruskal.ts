import type { MazeNodes, Square } from '../../types'

//! Kruskal's Algorithm
export function mazeKruskal(xAxis: number, yAxis: number, m: MazeNodes): MazeNodes {
	// this is a maze copy that later on be modified
	const maze = m

	//NOTE: generate random array of non repeating numbers.
	type randomPos = { pos: number; random: number }
	let randomPositions: (randomPos | number)[] = []
	for (let i = 0; i < xAxis * yAxis; i++) randomPositions.push({ pos: i, random: Math.random() })

	randomPositions = (randomPositions as randomPos[]).sort((a, b) => a.random - b.random).map((val) => val.pos)
	;(randomPositions as number[]).forEach((val: number) => {
		const yLevel = val >= yAxis ? Math.floor(val / yAxis) : 0
		const xLevel = val >= xAxis ? (val - xAxis) * yLevel : val

		const res = calculateMatrixPositions(maze)
		const getRandomPos = (elements: number) => Math.floor(Math.random() * elements)

		//NOTE: check all directions until a square is found.
		const discartingAxis = res(xLevel, val)
		let squareSelected: ReturnType<typeof res>[number] | null = null
		for (let i = 0; i < discartingAxis.length; i++) {
			const pos = getRandomPos(discartingAxis.length - 1)
			const [cord, square] = discartingAxis[pos]

			if (square != null && !square.visited) return (squareSelected = [cord, square])
			discartingAxis.splice(pos, 1)
		}

		if (!squareSelected) return

		//NOTE: delete borders between squares (check if they're references or copies of the element)
		const currentSquare = maze[yLevel][xAxis]
		const [cord, square] = squareSelected as [keyof Square['edge'], Square]

		currentSquare.edge[cord as keyof Square['edge']] = false
		square.visited = true
		square.edge[opposite_edges[cord]] = false
	})

	return maze
}

function calculateMatrixPositions(matrix: MazeNodes) {
	return (y: number, pos: number) =>
		Object.entries({
			top: matrix[y - 1][pos],
			right: matrix[y][pos + 1],
			bottom: matrix[y + 1][pos],
			left: matrix[y][pos - 1]
		})
}

// TODO: try a better way
const opposite_edges = {
	top: 'bottom',
	right: 'left',
	bottom: 'top',
	left: 'right'
} as const
