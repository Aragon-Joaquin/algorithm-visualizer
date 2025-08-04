import type { MazeNodes } from '../../types'
import type { MazeAlgoProps } from '../types'

type randomPos = { pos: number; random: number }

const getRandomPos = (elements: number) => Math.floor(Math.random() * elements)

//! Kruskal's Algorithm
export function mazeKruskal({ xAxis, yAxis, mNodes }: MazeAlgoProps): MazeNodes {
	// this is a maze copy that later on be modified
	const maze = mNodes.slice()

	//disjoint checking, group A | group B
	// const disjointDS = [new Set<number>(), new Set<number>()]

	//NOTE: generate random array of non repeating numbers.
	let randomPositions: (randomPos | number)[] = []
	for (let i = 0; i < xAxis * yAxis; i++) randomPositions.push({ pos: i, random: Math.random() })

	randomPositions = (randomPositions as randomPos[]).sort((a, b) => a.random - b.random).map((val) => val.pos)
	;(randomPositions as number[]).forEach((val: number) => {
		const yLevel = val >= xAxis ? Math.floor(val / xAxis) - 1 : 0
		const xLevel = Math.floor(val % xAxis)

		const neighbour = getAdjacentNode(maze)
		const discartingAxis = neighbour(yLevel, xLevel)

		for (let i = 0; i < 4; i++) {
			const pos = getRandomPos(discartingAxis.length)
			const [cord, square] = discartingAxis[pos]

			const resSquare = square()

			if (resSquare != undefined && !resSquare.visited) {
				//check if they belong to the same group.
				//if they do, skip
				//if isn't, remove the wall and merge them
				break
			}
			discartingAxis.splice(pos, 1)
		}
	})

	return maze
}

function getAdjacentNode(matrix: MazeNodes) {
	/* is a bad idea recalculate every matrix[y] * 4 (top, right, left, bottom...),
	so i made them into a function
	*/
	return (y: number, pos: number) =>
		Object.entries({
			top: () => matrix[y - 1]?.[pos],
			right: () => matrix[y]?.[pos + 1],
			bottom: () => matrix[y + 1]?.[pos],
			left: () => matrix[y]?.[pos - 1]
		})
}
