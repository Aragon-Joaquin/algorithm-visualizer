import type { Square } from "../../types/types"

//! Kruskal's Algorithm (for now)
export function mazeKruskal(xAxis: number, yAxis: number): Square[] {
	let maze: Square[][] = []

	//NOTE: generate random array of non repeating numbers.
	type randomPos = { pos: number, random: number }
	let randomPositions: (randomPos | number)[] = []
	for (let i = 0; i < xAxis * yAxis; i++) randomPositions.push({ pos: i, random: Math.random() })

	randomPositions = (randomPositions as randomPos[])
		.sort((a, b) => a.random - b.random)
		.map((val) => val.pos);

	(randomPositions as number[]).forEach((val: number) => {
		const yLevel = val >= yAxis ? Math.floor(val / yAxis) : 0
		const xLevel = val >= xAxis ? val - xAxis * yLevel : val

		const pos = Math.floor(Math.random() * )
		maze[yLevel][xLevel]

		return 0
	})


	return maze
}

function calculateMatrixPositions(matrix: Square[][]) {
	return (x: number, pos: number) => ({
		top: matrix[pos - x],
		left: matrix[pos - 1],
		bottom: matrix[x + pos],
		right: matrix[pos + 1]
	})
}
