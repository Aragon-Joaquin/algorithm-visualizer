import { getAdjacentNode, SquarePainter } from '../../maze_helpers'
import type { mazeCoords, Square } from '../../types'
import { COLORS_SQUARE } from '../../utils'
import type { TraversalProps } from '../types'

export function traversalDFS({ Path, EndPoint, Nodes, MazeProps }: TraversalProps) {
	const {
		ctx,
		SquareSizes: { SWidth, SHeight, SThick },
		XSquares,
		YSquares
	} = MazeProps

	const painter = new SquarePainter(ctx, SWidth, SHeight, SThick)
	const visited: boolean[][] = Array.from({ length: YSquares }, () => Array(XSquares).fill(false))

	return function* recursive(node: mazeCoords): Generator<void | true, void> {
		const { x, y } = node

		//if visited, return
		if (visited[y][x]) return

		//wait for ui to update
		yield

		visited[y][x] = true
		Path.push(node)
		painter.paintOne(x, y, { color: COLORS_SQUARE.ORANGE, edges: Nodes[y][x].edge })

		if (x === EndPoint.x && y === EndPoint.y) yield true

		const currentNode = Nodes[y][x]

		for (const edge in currentNode.edge) {
			const assertedEdge = edge as keyof Square['edge']

			//if there's a wall, continue
			if (currentNode.edge[assertedEdge]) continue

			const adjacentNode = getAdjacentNode(Nodes, y, x)[assertedEdge]()

			//calls recursive again to check if the node its visited.
			// if its is, backs up  one square
			if (adjacentNode && !visited[adjacentNode.y][adjacentNode.x]) {
				painter.paintOne(adjacentNode.x, adjacentNode.y, { color: COLORS_SQUARE.RED, edges: adjacentNode.edge })
				yield* recursive({ x: adjacentNode.x, y: adjacentNode.y })
			}
		}

		Path.pop()
		painter.paintOne(x, y, { color: COLORS_SQUARE.WHITE, edges: currentNode.edge })
	}
}
