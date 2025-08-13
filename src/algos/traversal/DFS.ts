import { getAdjacentNode, SquarePainter } from '../../maze_helpers'
import type { mazeCoords, Square } from '../../types'
import { COLORS_SQUARE } from '../../utils'
import type { TraversalProps } from '../types'

export function traversalDFS({ StartPoint, EndPoint, Nodes, MazeProps }: TraversalProps): mazeCoords[] {
	const {
		ctx,
		SquareSizes: { SWidth, SHeight, SThick }
	} = MazeProps

	const Stack: mazeCoords[] = [StartPoint]
	const Visited: mazeCoords[] = [StartPoint]
	const painter = new SquarePainter(ctx, SWidth, SHeight, SThick)

	const NUMBER_OF_EDGES = 3 as const

	// prevWall: keyof Square['edge'] | undefined = undefined
	const recursive = (node: mazeCoords | undefined) => {
		if (!node) return
		const { x, y } = node

		if (x === EndPoint.x && y === EndPoint.y) return Stack.push({ x, y })

		const currentNode = Nodes?.[y]?.[x]
		console.log({ currentNode })

		for (let i = 0; i < NUMBER_OF_EDGES; i++) {
			const assertedEdge = Object.keys(currentNode.edge)[i] as keyof Square['edge']
			console.log(assertedEdge)

			// check is has a wall
			if (currentNode?.edge[assertedEdge] ?? true) continue

			console.log('passed')
			const adjacentNode = getAdjacentNode(Nodes, y, x)[assertedEdge]()
			if (!adjacentNode) continue

			const adjCords: mazeCoords = { x: adjacentNode.x, y: adjacentNode.y }

			//improve this find method by using a map or just accessing the prop by visited[matrixToArray(x,y)]
			const hasBeenVisited = Visited.find((e) => e.x === adjCords.x && e.y === adjCords.y)

			if (hasBeenVisited != undefined) {
				recursive(Stack.pop())
				break
			}

			//push it to stack
			Stack.push(adjCords)
			Visited.push(adjCords)

			recursive(adjCords)
			break
		}

		painter.paintOne(currentNode.x, currentNode.y, { edges: currentNode.edge, color: COLORS_SQUARE.YELLOW })
	}

	recursive(Stack.at(-1))

	return Stack
}
