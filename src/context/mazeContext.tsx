import { useLayoutEffect, useState, type ReactNode } from 'react'
import { getSquareSizes } from '../maze_helpers/nodeUtils'
import type { MazeInfo, MazeProps } from '../types'
import { useTriggerMazeUpdate } from './hooks'
import { defaultMazeProps, MazeContext } from './types'
import { getCtx } from './utils'

//TODO: make reducer?
export function MazeProvider({ children }: { children: ReactNode }) {
	//NOTE: mazeProps only will cause a re-creation of the maze.
	const [mazeProps, setMazeProps] = useState<MazeProps>(defaultMazeProps)

	//NOTE: meanwhile mazeInfo causes an update.
	const [mazeInfo, setMazeInfo] = useState<MazeInfo>()

	useTriggerMazeUpdate(mazeInfo, mazeProps)

	//exec only once
	useLayoutEffect(() => {
		const canvas = getCtx()
		if (!canvas) return

		const { canvasHeight, canvasWidth } = canvas
		setMazeProps((prev) => ({
			...prev,
			...canvas,
			SquareSizes: getSquareSizes(
				{ width: canvasWidth, height: canvasHeight },
				{ x: mazeProps.XSquares, y: mazeProps.YSquares }
			)
		}))
	}, [])

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
