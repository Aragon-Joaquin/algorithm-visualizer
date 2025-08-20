import { useMazeUI } from '../hooks'

export function StatusBar() {
	const { paintStatus } = useMazeUI()

	return (
		<span>
			<h5 className="text-2xl">Status info</h5>
			<ul>
				<li>
					<span>Time Taken: {paintStatus.time}</span>
				</li>
			</ul>
		</span>
	)
}
