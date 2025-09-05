import { getAdjacentNode } from '@/maze_helpers'
import type { MazeNodes, Square } from '@/types'
import { arrayToMatrix, matrixToArray, OPPOSING_EDGES } from '@/utils'
import type { MazeAlgoProps } from '../types'

// 1) choose an arbitrary vertex {x,y} and add it to an empty set (lets called it "V").
// 2) choose the edge with the smallest weight (or just random), that connects a vertex in V with another vertex not in V
// 3) add that edge to the minimal spanning tree, and the edge’s other vertex to V.
// 4) repeat steps 2 and 3 until V includes every vertex in the maze.

//todo: to this be prims, i need to implement a minimal spanning tree
export function mazePrims({ xAxis, yAxis, mNodes }: MazeAlgoProps): MazeNodes {
	const { MazeSize: maze } = mNodes
	const mToArray = matrixToArray(yAxis)

	// maybe mazeCoords
	const frontierCells: number[] = []
	const mazeCells = new Set<number>()

	const initialVertex = maze[Math.floor(Math.random() * yAxis)][Math.floor(Math.random() * xAxis)]
	mazeCells.add(mToArray(initialVertex.x, initialVertex.y))

	//this seems... very imperative...
	let flag = 1

	const recursive = (cNode: Square) => {
		if (!frontierCells.length && !flag--) return
		//! SEARCH FOR INITIAL FRONTIERS
		for (const key in cNode.edge) {
			const assertedEdge = key as keyof Square['edge']

			const adjNode = getAdjacentNode(maze, cNode.y, cNode.x)[assertedEdge]()
			if (!adjNode) continue

			const frontierNum = mToArray(adjNode.x, adjNode.y)
			if (mazeCells.has(frontierNum) || frontierCells.find((e) => e === frontierNum)) continue

			frontierCells.push(frontierNum)
		}

		//! get random frontier
		const [randomFrontier] = frontierCells.splice(Math.floor(Math.random() * frontierCells.length), 1)
		const { x, y } = arrayToMatrix(randomFrontier, yAxis)
		const nodeFrontier = maze[y][x]

		//add it
		mazeCells.add(randomFrontier)

		//! MERGE FRONTIER
		// to be real prims algorithm, this part needs to be: (const key of randomizeEdges(nodeFrontier.edge))
		// i prefer this way, seems more unique than the others
		for (const key in nodeFrontier.edge) {
			const assertedEdge = key as keyof Square['edge']
			const adjNode = getAdjacentNode(maze, nodeFrontier.y, nodeFrontier.x)[assertedEdge]()

			if (!adjNode) continue

			const frontierNum = mToArray(adjNode.x, adjNode.y)
			if (!mazeCells.has(frontierNum)) continue

			maze[nodeFrontier.y][nodeFrontier.x] = {
				...nodeFrontier,
				edge: {
					...nodeFrontier.edge,
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

			break
		}

		recursive(nodeFrontier)
	}

	recursive(initialVertex)

	return maze
}
