import { useMazeContext } from '../hooks'

export function StatusBar() {
	const {
		mazeUI: { paintStatus, algoStatus }
	} = useMazeContext()

	return (
		<section className="flex justify-center gap-10">
			<RenderList
				title="Algorithm info"
				information={{ 'Time Taken': algoStatus.time.join(''), 'Total iterations': algoStatus.iterations }}
			/>

			<RenderList
				title="Painting info"
				information={{ 'Time Taken': paintStatus.time.join(''), 'Is pending': paintStatus.pending }}
			/>
		</section>
	)
}

const RenderList = ({ information, title }: { information: Record<string, unknown>; title: string }) => {
	return (
		<span className="flex flex-col justify-center items-center gap-2 w-48 bg-neutral-700 p-2 rounded-lg">
			<h5 className="text-2xl underline">{title}</h5>
			<ul className="w-full">
				{Object.entries(information).map(([key, val]) => {
					return (
						<li key={key} className="flex flex-row items-end text-sm gap-2">
							<span className="grow">{key}:</span>
							{val === null ? 'N/A' : val?.toString()}
						</li>
					)
				})}
			</ul>
		</span>
	)
}
