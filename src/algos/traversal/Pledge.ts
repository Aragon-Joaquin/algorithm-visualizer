import { getAdjacentNode } from '@/maze_helpers'
import type { mazeCoords, Square } from '@/types'
import { COLORS_SQUARE, OPPOSING_EDGES } from '@/utils'
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

	// -/+90 for each. we prioritize -90 first
	const possibleMovements = {
		top: ['right', 'left'],
		left: ['top', 'bottom'],
		bottom: ['left', 'right'],
		right: ['bottom', 'top']
	} as const

	let currentDegrees: keyof typeof positionMap = 0
	let turnAngle: number = 0
	let previousMoment: keyof typeof possibleMovements = 'top'

	return function* recursive(node: mazeCoords): GenReturn {
		const { x, y } = node
		const { edge } = Nodes[y][x]

		yield { x, y, color: COLORS_SQUARE.ORANGE, edge }
		if (EndPoint.x === x && EndPoint.y === y) yield

		const pos = positionMap[((currentDegrees % 360) + 360) % 360] // we position we're heading to, e.g. "right"
		const calculateMovement = (assertedEdge: keyof Square['edge'], position: keyof Square['edge']) => {
			const val = possibleMovements[pos].at(0) === assertedEdge ? -90 : 90

			previousMoment = position
			if (Math.abs(val + currentDegrees) === 360) currentDegrees = 0
			else currentDegrees += val
		}

		//reduce iterations. e.g. when iterating over right, its only possible ["bottom","top"]
		for (const key of [previousMoment, ...possibleMovements[pos]]) {
			const assertedEdge = key as keyof Square['edge']
			const adjNode = getAdjacentNode(Nodes, y, x)[pos]()! // its never null if we checked the edges

			console.log(node, edge, { pos, currentDegrees, assertedEdge })

			//check if top.
			if (pos === 'top' && edge[pos]) {
				console.log('top case', { previousMoment })
				const calcMov = previousMoment === 'left' ? 'left' : 'right'
				const moveEpic = getAdjacentNode(Nodes, y, x)[calcMov]()
				if (!moveEpic) continue
				calculateMovement(calcMov, pos)
				yield* recursive({ x: moveEpic.x, y: moveEpic.y })
			}

			//can go straight if there's no wall in front && the next node has a wall to its left: ______
			if (!edge[pos] && adjNode.edge[assertedEdge]) {
				console.log('can go straight:', { adjNode })
				if (leftToMove[pos] !== previousMoment) continue
				yield* recursive({ x: adjNode.x, y: adjNode.y })
				break
			}

			//there's a wall trying to go straight: __| (we don't have to move to another node)
			if (edge[pos]) {
				const nextNode = getAdjacentNode(Nodes, y, x)[assertedEdge]()
				console.log('hitted wall:', { nextNode })
				if (!nextNode || previousMoment === assertedEdge) continue
				calculateMovement(assertedEdge, pos)
				yield* recursive({ x, y })
				break
			}

			// check for corners that has no walls in front
			const moveTo = getAdjacentNode(Nodes, adjNode.y, adjNode.x)[assertedEdge]()
			console.log('hitted corner: ', { moveTo })
			if (!moveTo) continue

			if (moveTo.edge[OPPOSING_EDGES[pos]]) {
				console.log('NON 360', moveTo)
				calculateMovement(assertedEdge, pos)
				yield* recursive({ x: moveTo.x, y: moveTo.y })
			} else {
				console.log('did 360')
				//we need to do a 360 in this case
				if (moveTo.edge[OPPOSING_EDGES[pos]]) continue
				const nextNextNode = getAdjacentNode(Nodes, moveTo.y, moveTo.x)[OPPOSING_EDGES[pos]]()
				if (!nextNextNode) continue
				calculateMovement(OPPOSING_EDGES[pos], OPPOSING_EDGES[pos])
				yield* recursive({ x: nextNextNode.x, y: nextNextNode.y })
			}
			continue
		}
	}
}
