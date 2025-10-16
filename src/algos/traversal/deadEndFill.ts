import { getAdjacentNode } from '@/maze_helpers'
import type { mazeCoords, Square } from '@/types'
import { matrixToArray } from '@/utils'
import type { GenReturn } from '.'
import type { TraversalProps } from '../types'

/*
	this algo is only applicable if the maze is entirely knew
	
	1) start from  to left, checking every node that isn't a junction
	2) fill dead ends (nodes with 1 or less adjacent nodes)
	3) repeat until there's no node change
	4) it should be one path thats not fill that carries out to the end of the maze
*/
export function traversalDeadEndFill({ Nodes, MazeProps: { YSquares, XSquares } }: TraversalProps) {
	const mToArray = matrixToArray(YSquares)
	const FilledNodes = new Map<number, Square>()
	let hasChanged = true

	return function* recursive(node: mazeCoords): GenReturn {
		const { x, y } = node
		const { edge } = Nodes[y][x]

		if (x === 0 && y === 0) {
			console.log('iterate')
			if (!hasChanged) yield
			else hasChanged = false
		}

		yield { x, y, color: 'black', edge }

		let adjacentNodes: number = 0
		for (const key in edge) {
			const assertedKey = key as keyof Square['edge']
			if (edge[assertedKey]) continue // if it has a wall, we continue

			const adjNode = getAdjacentNode(Nodes, x, y)[assertedKey]()
			if (!adjNode || !FilledNodes.has(mToArray(adjNode.x, adjNode.y))) continue

			adjacentNodes++
		}

		if (adjacentNodes <= 1) {
			hasChanged = true
			FilledNodes.set(mToArray(x, y), Nodes[y][x])
		}

		const { newX, newY } = x >= XSquares - 1 ? { newX: 0, newY: y + 1 } : { newX: x + 1, newY: y }

		yield* recursive({ x: newX, y: newY >= YSquares - 1 ? 0 : newY })
	}
}
