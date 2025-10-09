import { getAdjacentNode } from '@/maze_helpers'
import type { mazeCoords } from '@/types'
import { COLORS_SQUARE } from '@/utils'
import type { GenReturn } from '.'
import type { TraversalProps } from '../types'

export function traversalPledge({ EndPoint, Nodes }: TraversalProps) {
	const turnPriority = [-1, 0, 1, 2] as const //left, top, right, bottom
	const directions = ['top', 'right', 'bottom', 'left'] as const

	let currentHeading: number = 0 //tracks our position based on directions
	let netTurnAngle: number = 0 //counts degrees

	return function* recursive(node: mazeCoords): GenReturn {
		const { x, y } = node
		const { edge } = Nodes[y][x]
		yield { x, y, color: COLORS_SQUARE.RED, edge }
		if (EndPoint.x === x && EndPoint.y === y) yield

		yield { x, y, color: COLORS_SQUARE.ORANGE, edge }

		//check if its 0 (top)
		if (!netTurnAngle) {
			currentHeading = 0

			//check if top wall exists, if not we skip this
			if (!edge['top']) {
				const nextNode = getAdjacentNode(Nodes, y, x)['top']()
				if (nextNode != undefined) {
					yield* recursive({ x: nextNode.x, y: nextNode.y })
					return
				}
			}
		}

		//left-hand rule
		for (const turn of turnPriority) {
			//-1 means we turn left: -90deg,
			// 0 we go straight, so no turning
			// 1 turns to right: +90deg
			// 2 we do double turn: +180deg
			const dirIndex = (currentHeading + turn + 4) % 4
			const newDirection = directions[dirIndex]

			//if it has a wall we skip it
			if (edge[newDirection]) continue

			switch (turn) {
				case -1:
					netTurnAngle -= 90
					break
				case 1:
					netTurnAngle += 90
					break
				case 2:
					netTurnAngle += 180
					break
			}

			currentHeading = dirIndex

			const nextNode = getAdjacentNode(Nodes, y, x)[newDirection]()
			if (!nextNode) continue

			yield* recursive({ x: nextNode.x, y: nextNode.y })
			return
		}
	}
}
