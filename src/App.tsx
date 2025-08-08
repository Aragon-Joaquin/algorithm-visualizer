import { useEffect } from 'react'
import { MAZE_ALGORITHMS } from './algos/types'
import { useMazeContext } from './hooks'
import { initializeMaze } from './maze_helpers'
//@ts-expect-error: css
import './index.css'

export default function App() {
	const { mazeProps, setMazeInfo } = useMazeContext()

	useEffect(() => {
		if (!mazeProps?.ctx) return
		setMazeInfo({
			Nodes: initializeMaze(mazeProps),
			Algorithm: MAZE_ALGORITHMS.Kruskal,
			EndPoint: mazeProps.XSquares * mazeProps.YSquares - 1
		})
	}, [mazeProps])

	return (
		<>
			<h2>Using: {'Kruskal'} Algo</h2>
			<canvas id="main-canvas" width="1280" height="720"></canvas>
			<button>update maze</button>
		</>
	)
}
