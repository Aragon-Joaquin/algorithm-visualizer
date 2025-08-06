import { DisjointSet } from '../../DStructures/DisjointSet'
import type { MazeNodes, Square } from '../../types'
import { OPPOSING_EDGES } from '../../utils'
import type { MazeAlgoProps } from '../types'

type randomPos = { pos: number; random: number }

const getRandomPos = (elements: number) => Math.floor(Math.random() * elements)

//! Kruskal's Algorithm
export function mazeKruskal({ xAxis, yAxis, mNodes }: MazeAlgoProps): MazeNodes {
	// this is a maze copy that later on be modified
	const maze = mNodes.slice()

	//disjoint checking, group A | group B
	const disjointDS = new DisjointSet(xAxis * yAxis)

	//NOTE: generate random array of non repeating numbers.
	let randomPositions: (randomPos | number)[] = []
	for (let i = 0; i < xAxis * yAxis; i++) randomPositions.push({ pos: i, random: Math.random() })

	randomPositions = (randomPositions as randomPos[]).sort((a, b) => a.random - b.random).map((val) => val.pos)
	;(randomPositions as number[]).forEach((val: number) => {
		const yLevel = Math.floor(val / xAxis)
		const xLevel = Math.floor(val % xAxis)

		const neighbor = getAdjacentNode(maze, yAxis)
		let discardingAxis = neighbor(yLevel, xLevel)

		for (let i = 0; i < 4; i++) {
			const random = getRandomPos(discardingAxis.length)
			const [coord, square] = discardingAxis[random]

			const [pos, resSquare] = square()

			if (resSquare != undefined) {
				//check if they belong to the same group.

				//if they do, skip
				if (disjointDS.find(val) === disjointDS.find(pos)) {
					discardingAxis = discardingAxis.filter((_, j) => j != random)
					continue
				}

				//if isn't, remove the wall and merge them
				disjointDS.union(pos, val)

				const assertedEdge = coord as keyof Square['edge']

				maze[yLevel][xLevel].edge[assertedEdge] = false
				resSquare.edge[OPPOSING_EDGES[assertedEdge]] = false
				// resSquare.visited = true
			}

			discardingAxis = discardingAxis.filter((_, j) => j != random)
		}
	})

	return maze
}

function getAdjacentNode(matrix: MazeNodes, yAxis: number) {
	// this transform a matrix position number into an array pos number
	// matrix[21][5] -> array[425]
	const calculatePos = (row: number, col: number) => row * (yAxis - 1) + col

	/* is a bad idea recalculate every matrix[y] * 4 (top, right, left, bottom...),
	so i made them into a function
	*/
	return (y: number, pos: number) =>
		Object.entries({
			top: () => [calculatePos(y - 1, pos), matrix[y - 1]?.[pos]] as [number, Square],
			right: () => [calculatePos(y, pos + 1), matrix[y]?.[pos + 1]] as [number, Square],
			bottom: () => [calculatePos(y + 1, pos), matrix[y + 1]?.[pos]] as [number, Square],
			left: () => [calculatePos(y, pos - 1), matrix[y]?.[pos - 1]] as [number, Square]
		})
}
