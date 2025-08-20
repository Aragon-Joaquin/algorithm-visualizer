import { useEffect } from 'react'
import { MAZE_ALGORITHMS } from './algos'
import { StatusBar, UIMaze } from './components'
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
			EndPoint: { x: mazeProps.XSquares - 1, y: mazeProps.YSquares - 1 },
			StartPoint: { x: 0, y: 0 }
		})
	}, [mazeProps])

	return (
		<main className="flex flex-col items-center justify-center gap-4 w-screen">
			<StatusBar />
			<section className="flex flex-row justify-center items-center w-screen gap-4">
				<canvas id="main-canvas" width="1280" height="720"></canvas>

				<UIMaze />
			</section>
		</main>
	)
}
