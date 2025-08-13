import { useEffect, useRef } from 'react'
import { MAZE_ALGORITHMS, TRAVERSAL_ALGORITHMS } from './algos/types'
import { useMazeContext } from './hooks'
import { initializeMaze } from './maze_helpers'
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

	const handleTraversal = () => {
		if (!traversalSelect.current) return
		const selectedAlgorithm =
			TRAVERSAL_ALGORITHMS[traversalSelect.current.value as keyof typeof TRAVERSAL_ALGORITHMS] ??
			TRAVERSAL_ALGORITHMS.DFS

		const stack = selectedAlgorithm({
			StartPoint: mazeInfo!.StartPoint,
			EndPoint: mazeInfo!.EndPoint,
			Nodes: mazeInfo!.Nodes,
			MazeProps: mazeProps
		})

		console.log('Traversal Stack:', stack)
	}

	const clearTraversal = () => {}

	return (
		<>
			<h2>Using: {mazeInfo?.Algorithm?.name} Algo</h2>
			<canvas id="main-canvas" width="1280" height="720"></canvas>

			<select ref={traversalSelect}>
				{Object.entries(TRAVERSAL_ALGORITHMS).map(([key]) => (
					<option key={key} value={key}>
						{key}
					</option>
				))}
			</select>
			<button onClick={handleTraversal}>start traversal</button>
			<button>clear traversal</button>
		</>
	)
}
