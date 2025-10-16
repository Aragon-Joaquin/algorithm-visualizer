import { getAdjacentNode, randomizeEdges } from '@/maze_helpers'
import type { mazeCoords } from '@/types'
import { COLORS_SQUARE } from '@/utils'
import type { GenReturn } from '.'
import type { TraversalProps } from '../types'

// it's only this. and impressively, its the most inefficiently that it can
export function traversalRandomMouse({ EndPoint, Nodes }: TraversalProps) {
	return function* recursive({ x, y }: mazeCoords): GenReturn {
		const { edge } = Nodes[y][x]

		yield { x, y, color: COLORS_SQUARE.RED, edge }
		if (EndPoint.x === x && EndPoint.y === y) yield
		yield { x, y, color: COLORS_SQUARE.ORANGE, edge }

		for (const key of randomizeEdges(edge)) {
			const assertedKey = key as keyof typeof edge
			if (edge[assertedKey]) continue // if there's a wall, we continue

			const adjNode = getAdjacentNode(Nodes, y, x)[assertedKey]()
			if (!adjNode) continue

			yield* recursive(adjNode)
			return
		}
	}
}
