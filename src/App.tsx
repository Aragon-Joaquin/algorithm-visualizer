import { useEffect, useRef } from 'react'
import { InitializeMazeTraversal, MAZE_ALGORITHMS, TRAVERSAL_ALGORITHMS } from './algos'
import { useMazeContext } from './hooks'
import { initializeMaze, UpdateMaze } from './maze_helpers'
//@ts-expect-error: css
import './index.css'

export default function App() {
	const { mazeProps, setMazeInfo, mazeInfo } = useMazeContext()
	const traversalSelect = useRef<HTMLSelectElement>(null)

	useEffect(() => {
		if (!mazeProps?.ctx) return
		setMazeInfo({
			Nodes: initializeMaze(mazeProps),
			Algorithm: MAZE_ALGORITHMS.Kruskal,
			EndPoint: { x: mazeProps.XSquares - 1, y: mazeProps.YSquares - 1 },
			StartPoint: { x: 0, y: 0 }
		})
	}, [mazeProps])

	const handleTraversal = async () => {
		if (!traversalSelect.current) return

		await InitializeMazeTraversal({
			Algorithm: traversalSelect.current.value as keyof typeof TRAVERSAL_ALGORITHMS,
			EndPoint: mazeInfo?.EndPoint,
			StartPoint: mazeInfo?.StartPoint,
			Nodes: mazeInfo?.Nodes,
			MazeProps: mazeProps
		})
	}

	const clearTraversal = () => {
		UpdateMaze(mazeInfo?.Nodes, mazeProps, mazeInfo?.EndPoint, mazeInfo?.StartPoint)
	}

	return (
		<main className="flex flex-row justify-center items-center w-screen gap-4">
			<canvas id="main-canvas" width="1024" height="768"></canvas>

			<span className="flex flex-col grow-0 bg-neutral-700 gap-4 h-full items-center justify-center">
				<select ref={traversalSelect}>
					{Object.entries(TRAVERSAL_ALGORITHMS).map(([key]) => (
						<option key={key} value={key}>
							{key}
						</option>
					))}
				</select>

				<button onClick={handleTraversal}>start traversal</button>
				<input type="range" min={10} max={100} defaultValue={50} />
				<button onClick={clearTraversal} disabled>
					clear traversal
				</button>
			</span>
		</main>
	)
}
