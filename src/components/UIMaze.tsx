import { useEffect, useRef, useState } from 'react'
import { TRAVERSAL_ALGORITHMS } from '../algos'
import { useMazeUI } from '../hooks'
import { RenderWithAnimationFrame } from '../maze_helpers'
import { INTERVAL_VEL } from '../utils/declarations'

export function UIMaze() {
	const traversalSelect = useRef<HTMLSelectElement>(null)
	const { handleTraversal, clearTraversal, paintStatus } = useMazeUI()

	const [range, setRange] = useState<number>(50)

	useEffect(() => {
		RenderWithAnimationFrame.changeIntervalVel(range)
	}, [range])

	return (
		<section className="flex flex-col justify-center items-center gap-10 bg-neutral-600 border-1 border-neutral-500 h-full p-4 rounded-lg">
			<form className="flex flex-col gap-3">
				<label className="label-form">
					Traversal algorithm
					<select ref={traversalSelect} className="button-dark" defaultValue="DFS">
						{Object.entries(TRAVERSAL_ALGORITHMS).map(([key]) => (
							<option key={key} value={key}>
								{key}
							</option>
						))}
					</select>
				</label>

				<label className="label-form">
					Time traversal: {range}ms
					<input
						type="range"
						min={INTERVAL_VEL.MIN}
						max={INTERVAL_VEL.MAX}
						onChange={(e) => setRange(e.currentTarget.valueAsNumber ?? 10)}
						defaultValue={range}
					/>
				</label>
			</form>
			<span className="flex flex-col justify-center items-center gap-4 mt-4">
				<button
					onClick={() => handleTraversal(traversalSelect.current)}
					className="button-dark"
					disabled={paintStatus.pending}
				>
					start traversal
				</button>

				<button onClick={clearTraversal} className="button-dark">
					clear traversal
				</button>
			</span>
		</section>
	)
}
