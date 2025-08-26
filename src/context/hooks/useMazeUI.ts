import { InitializeMazeTraversal, TRAVERSAL_ALGORITHMS } from '@/algos'
import { RenderWithAnimationFrame, UpdateMaze, type queueEvent } from '@/maze_helpers'
import type { MazeInfo, MazeProps } from '@/types'
import { useEffect } from 'react'
import { useMazeUIStore } from '../stores'

//todo: reducer
export function useMazeUI(mazeProps: MazeProps, mazeInfo: MazeInfo) {
	const { paintStatus, algoStatus, pendingAll, completeAlgoStatus, completePaintStatus } = useMazeUIStore()

	//TODO: handle traversal only updates on the called component. maybe i need a context
	const handleTraversal = (traversalSelect: HTMLSelectElement | null) => {
		if (!traversalSelect) return

		//clear previous maze path
		if (paintStatus.completed) UpdateMaze(mazeInfo?.Nodes, mazeProps, mazeInfo?.EndPoint, mazeInfo?.StartPoint)

		pendingAll()

		const [time, iterations] = InitializeMazeTraversal({
			Algorithm: traversalSelect!.value as keyof typeof TRAVERSAL_ALGORITHMS,
			EndPoint: mazeInfo?.EndPoint,
			StartPoint: mazeInfo?.StartPoint,
			Nodes: mazeInfo?.Nodes,
			MazeProps: mazeProps
		})

		completeAlgoStatus(time, iterations)
	}

	useEffect(() => {
		function handlePending(args: CustomEvent<queueEvent>) {
			completePaintStatus(args.detail?.timePassed ?? ['0', 'ms'])
		}

		RenderWithAnimationFrame.subscribeToEvent(handlePending)

		return RenderWithAnimationFrame.unsubscribeToEvent(handlePending)
	}, [])

	const clearTraversal = () => {
		RenderWithAnimationFrame.stopIterating()

		//fix this. the updateMaze method can skip over squares painted in the last few frames
		setTimeout(() => {
			UpdateMaze(mazeInfo?.Nodes, mazeProps, mazeInfo?.EndPoint, mazeInfo?.StartPoint)
		}, 60)
	}

	return { handleTraversal, clearTraversal, paintStatus, algoStatus }
}
