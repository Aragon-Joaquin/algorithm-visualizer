import { getAdjacentNode } from '@/maze_helpers'
import type { mazeCoords, Square } from '@/types'
import { COLORS_SQUARE } from '@/utils'
import type { GenReturn } from '.'
import type { TraversalProps } from '../types'

/*
1) we start with 0 degrees
2) when we're on 0 degrees, we go straight top until we hit a wall
3) we prioritize the right wall
4) when going to the right, we do -90 degrees and +90 if we're going to the left
5) repeat until exit

the -/+90 degrees its based on the circle's "left hand". it need to touch the wall anytime unless we go 0deg
*/

export function traversalPledge({ EndPoint, Nodes }: TraversalProps) {
	const positionMap: Record<number, keyof Square['edge']> = {
		0: 'top',
		90: 'left',
		180: 'bottom',
		270: 'right'
	} as const

	const leftToMove = {
		top: 'left',
		left: 'bottom',
		bottom: 'right',
		right: 'top'
	} as const

	const currentDegrees: keyof typeof positionMap = 0

	return function* recursive(node: mazeCoords): GenReturn {
		const { x, y } = node
		const { edge } = Nodes[y][x]

		yield { x, y, color: COLORS_SQUARE.ORANGE, edge }
		if (EndPoint.x === x && EndPoint.y === y) yield

		const pos = positionMap[Math.abs(currentDegrees)]
		for (const key of pos === 'top' || pos === 'bottom' ? ['right', 'left'] : ['top', 'bottom']) {
			const assertedEdge = key as keyof Square['edge']
			if (edge[assertedEdge]) continue

			const adjNode = getAdjacentNode(Nodes, y, x)[leftToMove[assertedEdge]]()
			if (!adjNode) continue

			if (pos === 'top' && !edge.top) {
				yield* recursive({ x: adjNode.x, y: adjNode.y })
				break
			}
		}
	}
}
