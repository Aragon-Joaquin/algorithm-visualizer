import { getAdjacentNode } from '../../maze_helpers'
import type { squarePainted } from '../../maze_helpers/renderWithAnimationFrame'
import type { mazeCoords, Square } from '../../types'
import { COLORS_SQUARE } from '../../utils'
import type { TraversalProps } from '../types'

export function traversalDFS({ Path, EndPoint, Nodes, MazeProps }: TraversalProps) {
	const { XSquares, YSquares } = MazeProps

	const visited: boolean[][] = Array.from({ length: YSquares }, () => Array(XSquares).fill(false))

	//we yield for each time we want to paint a square
	return function* recursive(node: mazeCoords): Generator<squarePainted | void, void> {
		const { x, y } = node

		//if visited, return
		if (visited[y][x]) return

		//update and yield for ui to paint
		visited[y][x] = true
		Path.push(node)
		yield { x, y, color: COLORS_SQUARE.ORANGE, edge: Nodes[y][x].edge }

		if (x === EndPoint.x && y === EndPoint.y) yield //yield nothing for stop signal

		const currentNode = Nodes[y][x]

		for (const edge in currentNode.edge) {
			const assertedEdge = edge as keyof Square['edge']

			//if there's a wall, continue
			if (currentNode.edge[assertedEdge]) continue

			const adjacentNode = getAdjacentNode(Nodes, y, x)[assertedEdge]()

			//calls recursive again to check if the node its visited.
			// if its is, backs up  one square
			if (adjacentNode && !visited[adjacentNode.y][adjacentNode.x]) {
				yield { x: adjacentNode.x, y: adjacentNode.y, color: COLORS_SQUARE.RED, edge: adjacentNode.edge }
				yield* recursive({ x: adjacentNode.x, y: adjacentNode.y })
			}
		}

		Path.pop()
		yield { x, y, color: COLORS_SQUARE.WHITE, edge: currentNode.edge }
	}
}
