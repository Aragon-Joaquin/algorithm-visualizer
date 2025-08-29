import { getAdjacentNode } from '@/maze_helpers'
import type { MazeNodes, Square } from '@/types'
import { OPPOSING_EDGES } from '@/utils'
import type { MazeAlgoProps } from '../types'

const SIDE_AVAILABLE: Exclude<keyof Square['edge'], 'right' | 'bottom'>[] = ['top', 'left'] as const

export function mazeBTree({ mNodes }: MazeAlgoProps): MazeNodes {
	//! this has to be consistent:
	// depends on where i start the algorithm will prefer these options:
	// [0,0]: 			!north/west
	// [yAxis], xAxis]: !south/east,
	// [0, xAxis]: 		!north/west
	// [yAxis, 0]: 		!south/east

	const randomizeSides = () =>
		SIDE_AVAILABLE.map((e) => ({ val: e, rand: Math.random() }))
			.sort((a, b) => a.rand - b.rand)
			.map(({ val }) => val)

	mNodes.loopMaze((i, j) => {
		const side = randomizeSides()
		const adjNode = getAdjacentNode(mNodes.MazeSize, j, i)

		side.some((side) => {
			const square = adjNode[side as keyof typeof adjNode]()
			if (!square) return false

			const currNode = mNodes.MazeSize[j][i]

			//we change current square
			mNodes.MazeSize[j][i] = {
				...currNode,
				edge: {
					...currNode.edge,
					[side]: false
				}
			}

			//change targeted square
			const squNode = mNodes.MazeSize[square.y][square.x]
			mNodes.MazeSize[square.y][square.x] = {
				...squNode,
				edge: {
					...squNode.edge,
					[OPPOSING_EDGES[side]]: false
				}
			}
			return true
		})
	})
	return mNodes.MazeSize
}
