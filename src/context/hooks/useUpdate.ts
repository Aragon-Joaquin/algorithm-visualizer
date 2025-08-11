import { useEffect, useRef, useState } from 'react'
import { InitializeMazeAlgorithm } from '../../algos/types'
import { createMazeSize, UpdateMaze } from '../../maze_helpers'
import type { MazeInfo, MazeNodes, MazeProps } from '../../types'

export function useTriggerMazeUpdate(mazeInfo: MazeInfo | undefined, mazeProps: MazeProps) {
	/*//!WARNING: 
 		i dont know how performance could affect this negatively if i declare each array space with an object TWICE
		but i doubt making it unknown[][], would need to check each time if its null only for its initialization
	*/

	const prevMaze = useRef<MazeNodes>(new createMazeSize(mazeProps.XSquares, mazeProps.YSquares).fillMazeNodes())
	const [newMaze, setNewMaze] = useState<MazeNodes>(prevMaze.current)

	useEffect(() => {
		if (!mazeInfo) return

		const nMaze = InitializeMazeAlgorithm(mazeInfo.Algorithm, {
			xAxis: mazeProps.XSquares,
			yAxis: mazeProps.YSquares,
			mNodes: prevMaze.current
		})

		UpdateMaze(nMaze, mazeProps, mazeInfo.EndPoint)
		setNewMaze(nMaze)
		prevMaze.current = mazeInfo['Nodes']
	}, [mazeProps]) //mazeInfo

	return newMaze
}
