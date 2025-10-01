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

//TODO: left,right and bottom has the same behaviour as "top".
//TODO: i need to somehow make them turn in a corner. the default implementation (line 54) works with "top"
export function traversalPledge({ EndPoint, Nodes }: TraversalProps) {
	const positionMap: Record<number, keyof Square['edge']> = {
		0: 'top',
		90: 'left',
		180: 'bottom',
		270: 'right'
	} as const

	// -/+90 for each. we prioritize -90 first
	const possibleMovements = {
		top: ['right', 'left'],
		left: ['top', 'bottom'],
		bottom: ['left', 'right'],
		right: ['bottom', 'top']
	} as const

	let currentDegrees: keyof typeof positionMap = 0

	return function* recursive(node: mazeCoords): GenReturn {
		const { x, y } = node
		const { edge } = Nodes[y][x]

		yield { x, y, color: COLORS_SQUARE.ORANGE, edge }
		if (EndPoint.x === x && EndPoint.y === y) yield

		const pos = positionMap[((currentDegrees % 360) + 360) % 360] // we position we're heading to, e.g. "right"

		//reduce iterations. e.g. when iterating over right, its only possible ["bottom","top"]
		for (const key of possibleMovements[pos]) {
			const assertedEdge = key as keyof Square['edge']
			const adjNode = getAdjacentNode(Nodes, y, x)[pos]()! // its never null if we checked the edges

			console.log(node, edge, { pos, currentDegrees, assertedEdge })

			//there's a wall in front. right > top | bottom
			if (edge[pos]) {
				const moveTo = getAdjacentNode(Nodes, y, x)[assertedEdge]!()
				if (!moveTo) continue

				const movement = possibleMovements[pos].at(0) === assertedEdge ? -90 : 90 // we make the calculation
				currentDegrees += movement

				yield* recursive({ x: node.x, y: node.y })
				break
			}
			//else, we keep going throw the same pos. right > right
			yield* recursive({ x: adjNode.x, y: adjNode.y })
		}
	}
}
