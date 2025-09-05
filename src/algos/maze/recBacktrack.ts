import { getAdjacentNode, randomizeEdges } from '@/maze_helpers'
import type { MazeNodes, Square } from '@/types'
import { matrixToArray, OPPOSING_EDGES } from '@/utils'
import type { MazeAlgoProps } from '../types'

//Recursive Backtracking
// 1) select a random starting point
// 2) randomly select a wall then carve to it if it wasn't visited yet.
// 3) if all adjacent nodes are visited, backtrack until a cell with uncarved walls
// 4) ends if the algorithm reached the starting point
export function mazeRecBacktrack({ xAxis, yAxis, mNodes }: MazeAlgoProps): MazeNodes {
	const { MazeSize: maze } = mNodes
	const mToArray = matrixToArray(yAxis)
	const visited = new Set<number>()

	function recursive({ x, y, edge }: Square) {
		for (const key of randomizeEdges(edge)) {
			const assertedEdge = key as keyof Square['edge']

			if (!edge[assertedEdge]) continue

			const adjNode = getAdjacentNode(maze, y, x)[assertedEdge]()
			if (!adjNode || visited.has(mToArray(adjNode.x, adjNode.y))) continue

			const curNode = maze[y][x]
			maze[y][x] = {
				...curNode,
				edge: {
					...curNode.edge,
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

			visited.add(mToArray(adjNode.x, adjNode.y))
			recursive(adjNode)
		}
	}
	//maze[0-19][0-24]
	recursive(maze[Math.floor(Math.random() * yAxis)][Math.floor(Math.random() * xAxis)])

	return maze
}
