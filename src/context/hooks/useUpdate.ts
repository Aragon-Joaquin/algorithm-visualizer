import { useEffect, useRef } from 'react'
import { MAZE_ALGORITHMS } from '../../algos/types'
import { UpdateMaze } from '../../maze_helpers'
import { createMazeSize } from '../../maze_helpers/nodeUtils'
import type { MazeInfo, MazeNodes, MazeProps } from '../../types'

export function useTriggerMazeUpdate(mazeInfo: MazeInfo | undefined, mazeProps: MazeProps) {
	/*//!WARNING: 
 		i dont know how performance could affect this negatively if i declare each array space with an object TWICE
		but i doubt making it unknown[][], would need to check each time if its null only for its initialization
	*/
	const prevMaze = useRef<MazeNodes>(new createMazeSize(mazeProps.XSquares, mazeProps.YSquares).fillMazeNodes())

	useEffect(() => {
		if (!mazeInfo) return

		const nMaze = !mazeInfo.Algorithm
			? MAZE_ALGORITHMS.Kruskal(mazeProps.XSquares, mazeProps.YSquares, mazeInfo.Nodes)
			: mazeInfo.Algorithm(mazeProps.XSquares, mazeProps.YSquares, mazeInfo.Nodes)
		UpdateMaze(mazeInfo['Nodes'], nMaze, mazeProps)
		prevMaze.current = mazeInfo['Nodes']
	}, [mazeInfo, mazeProps])
}
