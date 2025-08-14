import { getAdjacentNode, SquarePainter } from '../../maze_helpers'
import type { mazeCoords, Square } from '../../types'
import { COLORS_SQUARE } from '../../utils'
import type { TraversalProps } from '../types'

export function traversalDFS({ StartPoint, EndPoint, Nodes, MazeProps }: TraversalProps): mazeCoords[] {
	const {
		ctx,
		SquareSizes: { SWidth, SHeight, SThick },
		XSquares,
		YSquares
	} = MazeProps

	const painter = new SquarePainter(ctx, SWidth, SHeight, SThick)
	const path: mazeCoords[] = []
	const visited: boolean[][] = Array.from({ length: YSquares }, () => Array(XSquares).fill(false))

	const recursive = (node: mazeCoords): boolean => {
		const { x, y } = node

		//if visited, return
		if (visited[y][x]) return false

		visited[y][x] = true
		path.push(node)
		painter.paintOne(x, y, { color: COLORS_SQUARE.YELLOW, edges: Nodes[y][x].edge })

		if (x === EndPoint.x && y === EndPoint.y) return true

		const currentNode = Nodes[y][x]

		for (const edge in currentNode.edge) {
			const assertedEdge = edge as keyof Square['edge']

			//if there's a wall, continue
			if (currentNode.edge[assertedEdge]) continue

			const adjacentNode = getAdjacentNode(Nodes, y, x)[assertedEdge]()

			//calls recursive again to check if the node its visited.
			// if its is, backs up  one square
			if (adjacentNode && recursive({ x: adjacentNode.x, y: adjacentNode.y })) return true
		}

		path.pop()
		painter.paintOne(x, y, { color: COLORS_SQUARE.WHITE, edges: currentNode.edge })
		return false
	}

	recursive(StartPoint)
	return path
}
