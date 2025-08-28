import type { GenReturn } from '.'
import { DijkstraNode, PriorityQueue } from '../../../DStructures'
import { getAdjacentNode } from '../../../maze_helpers'
import type { Square } from '../../../types'
import { COLORS_SQUARE, matrixToArray } from '../../../utils'
import type { TraversalProps } from '../../types'

export function traversalAStar({ EndPoint, Nodes, StartPoint, MazeProps }: TraversalProps) {
	const { YSquares } = MazeProps

	//set all proper variables
	DijkstraNode.changeEndpoint(EndPoint)
	const mToArray = matrixToArray(YSquares)

	// priority queue for nodes to explore
	const OpenList: PriorityQueue<DijkstraNode> = new PriorityQueue('f')
	OpenList.enqueue(new DijkstraNode(StartPoint.x, StartPoint.y, 0))

	//contains all nodes traversed
	const ClosedList: Map<number, DijkstraNode> = new Map()

	return function* recursive(/*node: mazeCoords*/): GenReturn {
		if (OpenList.isEmpty()) yield

		//select the least F value on the OpenList
		const currentNode = OpenList.dequeue()!
		const { x, y } = currentNode
		const edgesNode = Nodes[y][x].edge

		if (x === EndPoint.x && y === EndPoint.y) yield

		yield { x, y, edge: edgesNode, color: COLORS_SQUARE.ORANGE }

		//move it to the closed list
		ClosedList.set(mToArray(x, y), currentNode)

		//check all neighbors
		for (const edge in edgesNode) {
			const assertedEdge = edge as keyof Square['edge']

			//is a wall
			if (edgesNode[assertedEdge]) continue

			const neighbors = getAdjacentNode(Nodes, y, x)[assertedEdge]()

			//skips nodes already in the closed list
			if (!neighbors || ClosedList.get(mToArray(neighbors.x, neighbors.y)) != undefined) continue

			yield { x: neighbors.x, y: neighbors.y, edge: neighbors.edge, color: COLORS_SQUARE.RED }

			const existingNode = OpenList.queue.find((el) => el.x === neighbors.x && el.y === neighbors.y)
			if (!existingNode) {
				// add node if doesn't exists in the open list
				OpenList.enqueue(new DijkstraNode(neighbors.x, neighbors.y, currentNode.g + 1, currentNode))
			} else {
				//update node if better path...
				const predictIfBetterPath = existingNode.g + 1
				if (predictIfBetterPath < currentNode.g) {
					//it means is this a more optimal route
					//so we change the parent of the existingNode
					existingNode.parent = currentNode
					existingNode.g = predictIfBetterPath
					existingNode.recalculateFScore()
				}
			}
		}
		yield* recursive()
	}
}
