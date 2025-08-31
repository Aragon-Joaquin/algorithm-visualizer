import { DisjointSet } from '@/DStructures'
import { getAdjacentNode } from '@/maze_helpers'
import type { MazeNodes, Square } from '@/types'
import { matrixToArray, OPPOSING_EDGES } from '@/utils'
import type { MazeAlgoProps } from '../types'

// 1) initialize the first row (xAxis) with a different Set id
// 2) randomize the merge of adjacent Sets
// 3) for each set, create at least 1 downward connection and merge it to the set
// 4) fill out the row with more unique Set ids
// 5) repeat until last row
// 6) omit vertical connection (step 3) and join all of them

const PROBABILITY_DOWNWARD = 0.9 as const
const PROBABILITY_HORIZONTAL = 0.4 as const
const DIR_HORIZONTAL: keyof Square['edge'] = 'right' as const
const DIR_VERTICAL: keyof Square['edge'] = 'bottom' as const

export function mazeEllers({ xAxis, yAxis, mNodes }: MazeAlgoProps): MazeNodes {
	//step 1 (we initialize all with different ids instead of doing it each row)
	const disSet = new DisjointSet(xAxis * yAxis)

	//xAxis because we're using rows
	const mToArray = matrixToArray(xAxis)

	const { MazeSize: maze } = mNodes

	maze.forEach((row, iy) => {
		//check for step 5 here
		if (iy === yAxis - 1) return

		row.forEach((square, ix) => {
			const adjNode = getAdjacentNode(maze, iy, ix)[DIR_HORIZONTAL]()

			//step 2 - merge horizontal sets
			//TODO: fix this logic too
			if (Math.random() < PROBABILITY_HORIZONTAL) return
			if (!adjNode) return

			const currentNode = mToArray(iy, ix)
			const nodeNeighbor = mToArray(adjNode.y, adjNode.x)

			//it means they're in the same set
			if (disSet.find(nodeNeighbor) === disSet.find(currentNode)) return
			disSet.union(currentNode, nodeNeighbor)

			maze[iy][ix] = {
				...square,
				edge: {
					...square.edge,
					[DIR_HORIZONTAL]: false
				}
			}

			maze[adjNode.y][adjNode.x] = {
				...adjNode,
				edge: {
					...adjNode.edge,
					[OPPOSING_EDGES[DIR_HORIZONTAL]]: false
				}
			}

			return true
		})
		//step 3 - create downwards connection for each set
		// [0, 19] - [20, 39] - [40, 59]...
		const range = disSet.parent.slice(row.length * iy, row.length * (iy + 1))
		const mappedSets = new Map<number, boolean>()

		console.log('NEW ROW', disSet)
		range.forEach((id, ix) => {
			//TODO: fix this logic
			if (Math.random() < PROBABILITY_DOWNWARD) {
				// if its undefined and the next node its in the same group,let it pass.
				// else return
				if (mappedSets.get(id) || disSet.parent[ix + 1] === id) return
			}

			const getAdjNode = getAdjacentNode(maze, iy, ix)[DIR_VERTICAL]()
			if (!getAdjNode) return

			//we do it inverse just to get the top node priority when merging, it doesn't change anything really
			disSet.union(mToArray(getAdjNode.y, getAdjNode.x), mToArray(iy, ix))

			const currentNode = maze[iy][ix]
			maze[iy][ix] = {
				...currentNode,
				edge: {
					...currentNode.edge,
					[DIR_VERTICAL]: false
				}
			}

			maze[getAdjNode.y][getAdjNode.x] = {
				...getAdjNode,
				edge: {
					...getAdjNode.edge,
					[OPPOSING_EDGES[DIR_VERTICAL]]: false
				}
			}

			mappedSets.set(id, true)
		})
	})

	//step 6 - join them all
	maze.at(-1)?.forEach((sq, ix) => {
		const adjNode = getAdjacentNode(maze, yAxis - 1, ix)[DIR_HORIZONTAL]()

		if (!adjNode) return

		maze[yAxis - 1][ix] = {
			...sq,
			edge: {
				...sq.edge,
				[DIR_HORIZONTAL]: false
			}
		}

		maze[yAxis - 1][adjNode.x] = {
			...adjNode,
			edge: {
				...adjNode.edge,
				[OPPOSING_EDGES[DIR_HORIZONTAL]]: false
			}
		}
	})

	return maze
}
