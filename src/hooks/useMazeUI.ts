import { useEffect, useState } from 'react'
import { InitializeMazeTraversal, type TRAVERSAL_ALGORITHMS } from '../algos'
import { UpdateMaze } from '../maze_helpers'
import { RenderWithAnimationFrame, type queueEvent } from '../maze_helpers/renderWithAnimationFrame'
import { useMazeContext } from './useMazeContext'

export function useMazeUI() {
	const { mazeProps, mazeInfo } = useMazeContext()

	const [paintStatus, setPaintStatus] = useState({ pending: false, completed: false, time: 0 })

	const handleTraversal = async (traversalSelect: HTMLSelectElement | null) => {
		if (!traversalSelect) return
		setPaintStatus((prev) => ({ ...prev, completed: false, pending: true }))
		await InitializeMazeTraversal({
			Algorithm: traversalSelect!.value as keyof typeof TRAVERSAL_ALGORITHMS,
			EndPoint: mazeInfo?.EndPoint,
			StartPoint: mazeInfo?.StartPoint,
			Nodes: mazeInfo?.Nodes,
			MazeProps: mazeProps
		})
	}

	useEffect(() => {
		function handlePending(args: CustomEvent<queueEvent>) {
			setPaintStatus({ pending: false, completed: true, time: args.detail?.timePassed ?? 0 })
		}

		RenderWithAnimationFrame.suscribeToEvent(handlePending)

		return RenderWithAnimationFrame.unsuscribeToEvent(handlePending)
	})

	const clearTraversal = () => {
		RenderWithAnimationFrame.stopIterating()

		//fix this. the updateMaze method can skip over squares painted in the last few frames
		setTimeout(() => {
			UpdateMaze(mazeInfo?.Nodes, mazeProps, mazeInfo?.EndPoint, mazeInfo?.StartPoint)
		}, 60)
	}

	return { handleTraversal, clearTraversal, paintStatus }
}
