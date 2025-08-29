import { useEffect, useState } from 'react'
import { InitializeMazeAlgorithm } from '../../algos'
import { createMazeSize, UpdateMaze } from '../../maze_helpers'
import type { MazeInfo, MazeNodes, MazeProps } from '../../types'

export function useTriggerMazeUpdate(mazeInfo: MazeInfo, mazeProps: MazeProps) {
	/*//!WARNING: 
 		i dont know how performance could affect this negatively if i declare each array space with an object TWICE
		but i doubt making it unknown[][], would need to check each time if its null only for its initialization
	*/

	// const prevMaze = useRef<MazeNodes>(new createMazeSize(mazeProps.XSquares, mazeProps.YSquares).fillMazeNodes())
	const [newMaze, setNewMaze] = useState<MazeNodes>()

	useEffect(() => {
		const newEmptyMaze = new createMazeSize(mazeProps.XSquares, mazeProps.YSquares)
		newEmptyMaze.fillMazeNodes()

		const nMaze = InitializeMazeAlgorithm(mazeProps.Algorithm, {
			xAxis: mazeProps.XSquares,
			yAxis: mazeProps.YSquares,
			mNodes: newEmptyMaze
		})

		console.log({ nMaze })

		UpdateMaze(nMaze, mazeProps, mazeInfo.EndPoint, mazeInfo.StartPoint)
		setNewMaze(nMaze)
		// prevMaze.current = mazeInfo['Nodes']
	}, [mazeProps]) //mazeInfo

	return newMaze
}
