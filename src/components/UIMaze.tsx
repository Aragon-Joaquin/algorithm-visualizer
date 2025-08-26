import { useEffect, useRef, useState } from 'react'
import { TRAVERSAL_ALGORITHMS } from '../algos'
import { useMazeContext } from '../hooks'
import { RenderWithAnimationFrame } from '../maze_helpers'
import { INTERVAL_VEL } from '../utils/declarations'

export function UIMaze() {
	const traversalSelect = useRef<HTMLSelectElement>(null)
	const {
		mazeUI: { handleTraversal, clearTraversal, paintStatus }
	} = useMazeContext()

	const [range, setRange] = useState<number>(50)

	useEffect(() => {
		RenderWithAnimationFrame.changeIntervalVel(range)
	}, [range])

	return (
		<section className="flex flex-col justify-center items-center gap-10 bg-neutral-600 border-1 border-neutral-500 w-48 h-full p-4 rounded-lg">
			<form className="flex flex-col gap-5">
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
					Time traversal:
					<input
						type="range"
						min={INTERVAL_VEL.MIN}
						max={INTERVAL_VEL.MAX}
						onChange={(e) => setRange(e.currentTarget.valueAsNumber)}
						defaultValue={range}
					/>
					<span className="inline-block">{range}ms</span>
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
					{paintStatus.pending ? 'stop' : 'clear'} traversal
				</button>
			</span>
		</section>
	)
}
