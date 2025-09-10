import { getAdjacentNode, randomizeEdges } from '@/maze_helpers'
import type { mazeCoords, Square } from '@/types'
import { COLORS_SQUARE, matrixToArray } from '@/utils'
import type { GenReturn } from '.'
import type { TraversalProps } from '../types'

const PASSAGE_STATES = {
	Unvisited: 0,
	Marked: 1,
	MarkedTwice: 2,

	//special fallback for stateFound
	NullState: 3
} as const

type passageType = (typeof PASSAGE_STATES)[keyof typeof PASSAGE_STATES]

//! tremaux algorithm only works effectively with well defined algorithms
// 1) leave a mark for each square traversed
// 2) if a square is marked once, select randomly an adjacent node
// 3) if all adjacent nodes are marked or its a dead end, go back by one unless its marked twice and mark it 2 times
// 4) pick the lowest state (unvisited, else marked)
// 5) when picking a junction thats all marked once, continue traversing and mark them all twice
export function traversalTremaux({ EndPoint, Nodes, MazeProps }: TraversalProps) {
	const { YSquares } = MazeProps

	const TREMAUX_ALGO = new Map<number, passageType>()
	const mToArray = matrixToArray(YSquares)

	return function* recursive(node: mazeCoords): GenReturn {
		const { edge: cEdges, x: cX, y: cY } = Nodes[node.y][node.x]
		let stateFound: [passageType, Square] = [PASSAGE_STATES.NullState, {} as Square]

		//we iterate through the adjacent nodes
		for (const key of randomizeEdges(cEdges)) {
			const assertedEdge = key as keyof Square['edge']
			if (cEdges[assertedEdge]) continue

			const adjNode = getAdjacentNode(Nodes, cX, cY)[assertedEdge]()
			if (!adjNode) continue

			//depending on the state, we do different actions
			const state = TREMAUX_ALGO.get(mToArray(adjNode.x, adjNode.y)) ?? PASSAGE_STATES.Unvisited
			const [valState] = stateFound

			if (state < valState) stateFound = [state, adjNode]
			if (valState === PASSAGE_STATES.Unvisited) break
		}

		//we check the state value
		const [valState, adjNode] = stateFound
		console.log({ valState, adjNode })
		if (adjNode.x === EndPoint.x && adjNode.y === EndPoint.y) yield

		switch (valState) {
			case PASSAGE_STATES.Unvisited: {
				yield { ...adjNode, color: COLORS_SQUARE.ORANGE }
				TREMAUX_ALGO.set(mToArray(adjNode.x, adjNode.y), PASSAGE_STATES.Marked)
				break
			}
			case PASSAGE_STATES.Marked: {
				yield { ...adjNode, color: COLORS_SQUARE.ORANGE }

				//since this was our best candidate, it means the others were at least marked once or twice
				for (const key in adjNode.edge) {
					const assertedEdge = key as keyof Square['edge']
					if (!cEdges[assertedEdge]) continue

					const marked = getAdjacentNode(Nodes, cX, cY)[assertedEdge]()
					if (!marked) continue

					TREMAUX_ALGO.set(mToArray(marked.x, marked.y), PASSAGE_STATES.MarkedTwice)
					yield { ...adjNode, color: COLORS_SQUARE.YELLOW }
				}

				break
			}
			case PASSAGE_STATES.MarkedTwice: {
				yield // we have no escape
				break
			}
		}
		recursive(adjNode)
	}
}
