import { DisjointSet } from '@/DStructures'
import { getAdjacentNode } from '@/maze_helpers'
import type { MazeNodes } from '@/types'
import { matrixToArray, OPPOSING_EDGES } from '@/utils'
import type { MazeAlgoProps } from '../types'

//! My worst code ever. improve IMMEDIATELY !!

// 1) initialize the first row (xAxis) with a different Set id
// 2) randomize the merge of adjacent Sets
// 3) for each set, create at least 1 downward connection and merge it to the set
// 4) fill out the row with more unique Set ids
// 5) repeat until last row
// 6) omit vertical connection (step 3) and join all of them

const getHorizontalPos = (): ('left' | 'right')[] =>
	(['left', 'right'] as const)
		.map((v) => ({ v, r: Math.random() }))
		.sort((a, b) => a.r - b.r)
		.map(({ v }) => v)

const PROBABILITY_DOWNWARD = 0.5 as const

export function mazeEllers({ xAxis, yAxis, mNodes }: MazeAlgoProps): MazeNodes {
	const disSet = new DisjointSet(xAxis * yAxis)
	const randomizeMergeActions = () => Math.floor(Math.random() * xAxis)
	const mToArray = matrixToArray(yAxis)

	const { MazeSize: maze } = mNodes

	maze.forEach((row, iy) => {
		//check for step 5 here
		if (iy === yAxis - 1) return

		row.forEach((square, ix) => {
			const currentNode = mToArray(iy, ix)
			const getAdjNode = getAdjacentNode(maze, iy, ix)
			let mergeTimes = randomizeMergeActions() // + 1?

			//we merge the row X times
			while (mergeTimes--) {
				//we check for left or right
				getHorizontalPos().some((pos) => {
					const adjNode = getAdjNode[pos]()
					if (!adjNode) return

					const nodeNeighbor = mToArray(adjNode.y, adjNode.x)

					//it means they're in the same set
					if (disSet.find(nodeNeighbor) === disSet.find(currentNode)) return
					disSet.union(currentNode, nodeNeighbor)

					maze[iy][ix] = {
						...square,
						edge: {
							...square.edge,
							[pos]: false
						}
					}

					maze[adjNode.y][adjNode.x] = {
						...adjNode,
						edge: {
							...adjNode.edge,
							[OPPOSING_EDGES[pos]]: false
						}
					}

					return true
				})
			}
		})
		//step 3 here
		const range = disSet.parent.slice(row.length * iy, row.length * (iy + 1))
		const mappedSets = new Map<number, number>()

		range.forEach((id, ix) => {
			const random = Math.random() > PROBABILITY_DOWNWARD
			if (!random && !mappedSets.get(id)) return

			const getAdjNode = getAdjacentNode(maze, iy, ix)['bottom']()
			if (!getAdjNode) return

			disSet.union(mToArray(iy, ix), mToArray(getAdjNode.y, getAdjNode.x))

			const currentNode = maze[iy][ix]
			maze[iy][ix] = {
				...currentNode,
				edge: {
					...currentNode.edge,
					bottom: false
				}
			}

			maze[iy][ix] = {
				...getAdjNode,
				edge: {
					...getAdjNode.edge,
					top: false
				}
			}
		})
	})

	//step 6 here
	maze.at(-1)?.forEach((_, ix) => {
		const getAdjNode = getAdjacentNode(maze, yAxis - 1, ix)

		getHorizontalPos().forEach((pos) => {
			const adjNode = getAdjNode[pos]()
			if (!adjNode) return

			const currentNode = maze[yAxis - 1][ix]
			maze[yAxis - 1][ix] = {
				...currentNode,
				edge: {
					...currentNode.edge,
					[pos]: false
				}
			}
		})
	})

	return maze
}
