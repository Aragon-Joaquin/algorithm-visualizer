import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react'
import { getSquareSizes } from '../maze_helpers'
import type { MazeInfo, MazeProps } from '../types'
import { useTriggerMazeUpdate } from './hooks'
import { useCanvasUtils } from './hooks/useCanvasUtils'
import { defaultMazeInfo, defaultMazeProps, MazeContext } from './types'
import { getCtx } from './utils'

//TODO: make reducer?
export function MazeProvider({ children }: { children: ReactNode }) {
	//NOTE: mazeProps only will cause a re-creation of the maze.
	const [mazeProps, setMazeProps] = useState<MazeProps>(defaultMazeProps)

	//NOTE: meanwhile mazeInfo causes an update.
	const [mazeInfo, setMazeInfo] = useState<MazeInfo>(defaultMazeInfo)

	// hooks
	const NMaze = useTriggerMazeUpdate(mazeInfo, mazeProps)
	const endpoint = useCanvasUtils(mazeProps, mazeInfo)

	//exec only once
	useLayoutEffect(() => {
		const canvas = getCtx()
		if (!canvas) return

		const { canvasHeight, canvasWidth, ctx, canvasElement } = canvas
		setMazeProps((prev) => ({
			...prev,
			...{ ctx, canvasHeight, canvasWidth, canvasElement },
			SquareSizes: getSquareSizes(
				{ width: canvasWidth, height: canvasHeight },
				{ x: mazeProps.XSquares, y: mazeProps.YSquares }
			)
		}))
	}, [])

	useEffect(() => {
		//cannot be the start point
		if (endpoint.x <= 0 || endpoint.y <= 0) return

		setMazeInfo((prev) => ({
			...(prev as MazeInfo),
			EndPoint: { x: endpoint.x, y: endpoint.y }
		}))
	}, [endpoint])

	useEffect(() => {
		setMazeInfo((prev) => ({ ...(prev as MazeInfo), Nodes: NMaze }))
	}, [NMaze])

	return (
		<MazeContext.Provider
			value={{
				mazeProps,
				setMazeProps,
				mazeInfo,
				setMazeInfo
			}}
		>
			{children}
		</MazeContext.Provider>
	)
}
