/*
!NOTES:
- g: cost from the start node (i guess +1 from each node traversed)
- h: estimated cost to the goal (the remaining nodes to go?) (heuristic value)
- f: sum of both (g + f)
*/

import type { mazeCoords } from '../types'

export class DijkstraNode {
	static endpoint: mazeCoords = { x: 0, y: 0 }

	x: number
	y: number

	g: number
	h: number
	f: number
	parent: DijkstraNode | null

	constructor(x: number, y: number, g: number, parent: DijkstraNode | null = null) {
		this.x = x
		this.y = y
		this.g = g
		this.h = this.ManhattanDistance({ x, y })
		this.f = g + this.h
		this.parent = parent
	}

	// for heuristic value (h)
	//useful for only 4 directions. Euclidean Distance for diagonal
	ManhattanDistance = (current: mazeCoords) =>
		Math.abs(current.x - DijkstraNode.endpoint.x) + Math.abs(current.y - DijkstraNode.endpoint.y)

	static changeEndpoint = (coords: mazeCoords) => (DijkstraNode.endpoint = coords)

	recalculateFScore = () => (this.f = this.g + this.h)
}
