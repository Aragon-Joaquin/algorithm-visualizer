import type { MazeNodes, Square } from '../../types'

export function getAdjacentNode(matrix: MazeNodes, y: number, x: number) {
	return {
		top: () => matrix[y - 1]?.[x],
		right: () => matrix[y]?.[x + 1],
		bottom: () => matrix[y + 1]?.[x],
		left: () => matrix[y]?.[x - 1]
	} as Record<keyof Square['edge'], () => Square | undefined>
}
