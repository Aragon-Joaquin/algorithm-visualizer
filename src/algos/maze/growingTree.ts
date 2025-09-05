import { getAdjacentNode, randomizeEdges } from '@/maze_helpers'
import type { MazeNodes, Square } from '@/types'
import { arrayToMatrix, matrixToArray, OPPOSING_EDGES } from '@/utils'
import type { MazeAlgoProps } from '../types'

// this algorithm has a clear inspiration on the Recursive_Backtrack
// but instead of traversing through the newest cell, we mixed it up.
// 50% of the times we use the newest cell to traverse the maze, the other half is random (or could be with the oldest)
// whatsoever the index selection, the idea is this algorithm is as flexible as you want to
export function mazeGrowingTree({ xAxis, yAxis, mNodes }: MazeAlgoProps): MazeNodes {
	const { MazeSize: maze } = mNodes
	const mToArray = matrixToArray(yAxis)

	//* visitedNodes doesn't delete nodes, so we can keep track of what we already traversed
	const visitedNodes = new Set<number>()

	//* nodes to keep traversing through neighbors.
	const frontiers = new Set<number>()

	const { x, y } = maze[Math.floor(Math.random() * yAxis)][Math.floor(Math.random() * xAxis)]

	const startPos = mToArray(x, y)
	frontiers.add(startPos)
	visitedNodes.add(startPos)

	//! cycles
	while (frontiers.size > 0) {
		const randomIndex = selectIndex(frontiers.size)
		const element = [...frontiers][randomIndex]
		const { x: xC, y: yC } = arrayToMatrix(element, yAxis)
		const cNode = maze[yC][xC]

		let hasIndexFound: boolean = false
		for (const key of randomizeEdges(cNode.edge)) {
			const assertedEdge = key as keyof Square['edge']
			if (!cNode.edge[assertedEdge]) continue

			const adjNode = getAdjacentNode(maze, yC, xC)[assertedEdge]()
			if (!adjNode) continue

			const adjPos = mToArray(adjNode.x, adjNode.y)
			if (visitedNodes.has(adjPos)) continue

			maze[yC][xC] = {
				...cNode,
				edge: {
					...cNode.edge,
					[assertedEdge]: false
				}
			}

			maze[adjNode.y][adjNode.x] = {
				...adjNode,
				edge: {
					...adjNode.edge,
					[OPPOSING_EDGES[assertedEdge]]: false
				}
			}

			frontiers.add(adjPos)
			visitedNodes.add(adjPos)
			hasIndexFound = true
			break
		}

		if (!hasIndexFound) frontiers.delete(element)
	}

	return maze
}

//! we select what type of indexing we want
const selectIndex = (arrayLength: number): number => {
	const INDEXES_OPTIONS = {
		RANDOM: Math.floor(Math.random() * arrayLength),
		NEWEST: 0
		// OLDEST: arrayLength - 1
	} as const

	const index_as_array = Object.keys(INDEXES_OPTIONS) as [keyof typeof INDEXES_OPTIONS]
	return INDEXES_OPTIONS[index_as_array[Math.floor(Math.random() * index_as_array.length)]]
}
