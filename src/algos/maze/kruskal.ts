import type { Square } from "../../types/types"

//! Kruskal's Algorithm (for now)
export function mazeKruskal(xAxis: number, yAxis: number): Square[] {
	const maze: Square[][] = []

	//NOTE: generate random array of non repeating numbers.
	type randomPos = { pos: number, random: number }
	let randomPositions: (randomPos | number)[] = []
	for (let i = 0; i < xAxis * yAxis; i++) randomPositions.push({ pos: i, random: Math.random() })

	randomPositions = (randomPositions as randomPos[])
		.sort((a, b) => a.random - b.random)
		.map((val) => val.pos);

	(randomPositions as number[]).forEach((val: number) => {
		const yLevel = val >= yAxis ? Math.floor(val / yAxis) : 0
		const xLevel = val >= xAxis ? (val - xAxis) * yLevel : val

		const res = calculateMatrixPositions(maze)
		const getRandomPos = (elements: number) => Math.floor(Math.random() * elements)

		//NOTE: check all directions until a square is found.
		const discartingAxis = res(xLevel, val)
		let squareSelected: Square | null = null;
		for (let i = 0; i < res.length; i++) {
			const pos = getRandomPos(discartingAxis.length - 1)
			const square = discartingAxis[pos]

			if (square != null) return squareSelected = square;
			discartingAxis.splice(pos, 1)
		}

		if (!squareSelected) return;


		return 0
	})


	return maze
}

function calculateMatrixPositions(matrix: Square[][]) {
	return (y: number, pos: number) => (Object.values({
		top: matrix[y - 1][pos],
		left: matrix[y][pos - 1],
		bottom: matrix[y + 1][pos],
		right: matrix[y][pos + 1]
	}))
}
