import { useEffect, useState } from 'react'
import { InitializeMazeTraversal, type TRAVERSAL_ALGORITHMS } from '../algos'
import { RenderWithAnimationFrame, UpdateMaze, type queueEvent } from '../maze_helpers'
import type { CalculatePerformanceType } from '../utils'
import { useMazeContext } from './'

interface paintStatusType {
	pending: boolean
	completed: boolean
	time: CalculatePerformanceType
}

export function useMazeUI() {
	const { mazeProps, mazeInfo } = useMazeContext()

	const [paintStatus, setPaintStatus] = useState<paintStatusType>({
		pending: false,
		completed: false,
		time: ['0', 'ms']
	})

	const [algoStatus, setAlgoStatus] = useState<{ time: CalculatePerformanceType }>()

	const handleTraversal = async (traversalSelect: HTMLSelectElement | null) => {
		if (!traversalSelect) return

		//clear previous maze path
		if (paintStatus.completed) UpdateMaze(mazeInfo?.Nodes, mazeProps, mazeInfo?.EndPoint, mazeInfo?.StartPoint)

		setPaintStatus((prev) => ({ ...prev, completed: false, pending: true }))
		const time = await InitializeMazeTraversal({
			Algorithm: traversalSelect!.value as keyof typeof TRAVERSAL_ALGORITHMS,
			EndPoint: mazeInfo?.EndPoint,
			StartPoint: mazeInfo?.StartPoint,
			Nodes: mazeInfo?.Nodes,
			MazeProps: mazeProps
		})

		setAlgoStatus((prev) => ({ ...prev, time }))
	}

	useEffect(() => {
		function handlePending(args: CustomEvent<queueEvent>) {
			setPaintStatus({ pending: false, completed: true, time: args.detail?.timePassed ?? ['0', 'ms'] })
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
