import type { GenReturn } from '.'
import { DijkstraNode, PriorityQueue } from '../../DStructures'
import { getAdjacentNode } from '../../maze_helpers'
import type { Square } from '../../types'
import { COLORS_SQUARE, matrixToArray } from '../../utils'
import type { TraversalProps } from '../types'

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
		const getNode = OpenList.dequeue()!
		const { x, y } = getNode
		const edgesNode = Nodes[y][x].edge

		if (x === EndPoint.x && y === EndPoint.y) yield

		yield { x, y, edge: edgesNode, color: COLORS_SQUARE.ORANGE }

		//move it to the closed list
		ClosedList.set(mToArray(x, y), getNode)

		//check al neighbors
		for (const edge in edgesNode) {
			const assertedEdge = edge as keyof Square['edge']

			//is a wall
			if (edgesNode[assertedEdge]) continue

			const neighbors = getAdjacentNode(Nodes, y, x)[assertedEdge]()

			//skips nodes already in the closed list
			if (!neighbors || ClosedList.get(mToArray(neighbors.x, neighbors.y)) != undefined) continue

			//update node if better path...
			const newNode = new DijkstraNode(neighbors.x, neighbors.y, getNode.g + 1, getNode)
			if (newNode.f < getNode.f) continue

			// add node if doesn't exists in the open list
			if (!OpenList.queue.find((el) => el.x === neighbors.x && el.y === neighbors.y)) {
				//evaluate g score
				OpenList.enqueue(newNode)
				yield { x: neighbors.x, y: neighbors.y, edge: neighbors.edge, color: COLORS_SQUARE.RED }
				yield* recursive()
			}
		}

		yield { x, y, edge: edgesNode, color: COLORS_SQUARE.WHITE }
	}
}
