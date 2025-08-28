import { DisjointSet } from '../../DStructures'
import type { MazeNodes } from '../../types'
import type { MazeAlgoProps } from '../types'
interface Wall {
	cell1: number
	cell2: number
	random: number
}

export function mazeKruskal({ xAxis, yAxis, mNodes: maze }: MazeAlgoProps): MazeNodes {
	//disjointed set
	const ds = new DisjointSet(xAxis * yAxis)

	// walls should be iterated and randomize in the kruskal algo
	//* if the maze is 25*20 = 500 elements * 4 walls each = 2000 on total walls
	//* 2000 - 90 (25*2 walls on Y axis + 20*2 walls on X axis) these walls are the most outer ones, so they don't have an adjacent)
	const allWalls: Wall[] = []

	// generate horizontal walls
	for (let y = 0; y < yAxis - 1; y++) {
		for (let x = 0; x < xAxis; x++) {
			//creates a wall that connects two nodes
			const cell1 = y * xAxis + x //top
			const cell2 = (y + 1) * xAxis + x // below the cell1
			allWalls.push({ cell1, cell2, random: Math.random() })
		}
	}

	// generate vertical walls
	for (let y = 0; y < yAxis; y++) {
		for (let x = 0; x < xAxis - 1; x++) {
			const cell1 = y * xAxis + x // left
			const cell2 = y * xAxis + (x + 1) // adjacent to cell1
			allWalls.push({ cell1, cell2, random: Math.random() })
		}
	}

	//we shuffle them
	allWalls.sort((a, b) => a.random - b.random)

	for (const { cell1, cell2 } of allWalls) {
		//check if they belong to the same group.
		//if they do, skip
		if (ds.find(cell1) === ds.find(cell2)) continue

		//if not, remove the wall and merge them
		ds.union(cell1, cell2)

		// 1D indices back to 2D values
		const [y1, x1] = [Math.floor(cell1 / xAxis), cell1 % xAxis]
		const [y2, x2] = [Math.floor(cell2 / xAxis), cell2 % xAxis]

		//if they're in the same row
		if (x1 === x2) {
			// horizontal wall

			maze[y1][x1].edge.bottom = false
			maze[y2][x2].edge.top = false
			continue
		}

		// else, vertical wall
		maze[y1][x1].edge.right = false
		maze[y2][x2].edge.left = false
	}

	return maze
}
