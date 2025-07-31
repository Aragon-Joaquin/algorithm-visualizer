import type { Square } from '../../types'

/**
 *
 * @param curNode the node currently displauyed on the canvas
 * @param newNode the node thats going to replace the current
 * @returns {boolean} if its true, its doesnt need a rerender on the canvas else it needs
 */
export function checkIfNodesEquals(curNode: Square, newNode: Square): boolean {
	type SquareEdge = keyof Square['edge']

	for (const key in curNode['edge']) {
		//doesnt need to update since it could break something
		if (!(key in newNode['edge'])) return true

		return newNode['edge'][key as SquareEdge] === curNode['edge'][key as SquareEdge]
	}
	return true
}
