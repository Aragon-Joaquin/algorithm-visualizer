import { getAdjacentNode } from '@/maze_helpers'
import type { mazeCoords, Square } from '@/types'
import { COLORS_SQUARE, matrixToArray } from '@/utils'
import type { GenReturn } from '.'
import type { TraversalProps } from '../types'

/*
	this algo is only applicable if the maze is entirely knew
	
	1) start from  to left, checking every node that isn't a junction
	2) fill dead ends (nodes with 1 or less adjacent nodes)
	3) repeat until there's no node change
	4) it should be one path thats not fill that carries out to the end of the maze
*/
export function traversalDeadEndFill({
	StartPoint,
	EndPoint,
	Nodes,
	MazeProps: { YSquares, XSquares }
}: TraversalProps) {
	const mToArray = matrixToArray(YSquares)
	const FilledNodes = new Map<number, Square>()
	let hasChanged = true

	//let max = 2
	return function* recursive(node: mazeCoords): GenReturn {
		const { y } = node

		// check if its 0
		if (!y) {
			//! testing, the first iteration just fills every square for some reason
			// max--
			// if (max == 0) yield
			if (!hasChanged) yield
			else hasChanged = false
		}

		//we need to do this, else we hit the maximum callstack error due too much recursion
		for (let xIndex = 0; xIndex < XSquares; xIndex++) {
			const { x, edge } = Nodes[y][xIndex]

			yield { x, y, color: COLORS_SQUARE.BLACK, edge }

			let adjacentNodes: number = 0
			for (const key in edge) {
				const assertedKey = key as keyof Square['edge']
				if (edge[assertedKey]) continue // if it has a wall, we continue

				const adjNode = getAdjacentNode(Nodes, y, x)[assertedKey]()
				// console.log(adjNode && { adjCoords: mToArray(adjNode.y, adjNode.x), assertedKey, x, y  })
				if (!adjNode || FilledNodes.has(mToArray(adjNode.y, adjNode.x))) continue

				adjacentNodes++
			}

			if (adjacentNodes <= 1) {
				if ((StartPoint.x === x && StartPoint.y === y) || (EndPoint.x === x && EndPoint.y === y)) continue
				hasChanged = true
				FilledNodes.set(mToArray(y, x), { y, x, edge })
			}
		}

		yield* recursive({ x: 0, y: y + 1 >= YSquares ? 0 : y + 1 })
	}
}
