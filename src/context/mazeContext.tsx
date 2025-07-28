import { useEffect, useState, type ReactNode } from 'react'
import type { MazeInfo, MazeProps } from '../types'
import { MazeContext } from './types'

//TODO: make reducer?
export function MazeProvider({ children }: { children: ReactNode }) {
	//NOTE: mazeProps only will cause a re-creation of the maze.
	const [mazeProps, setMazeProps] = useState<MazeProps>({
		XSquares: 25,
		YSquares: 20,
		canvasHeight: 0,
		canvasWidth: 0
	} as MazeProps)

	//NOTE: meanwhile mazeInfo causes an update.
	const [mazeInfo, setMazeInfo] = useState<MazeInfo>()

	//exec only once
	useEffect(() => {
		const canvas = document?.getElementById('main-canvas') as HTMLCanvasElement | null
		const ctx = canvas?.getContext('2d')

		if (!ctx || !canvas) return console.error('use a proper browser to view this page')
		const canvasSizes = { canvasHeight: canvas.height, canvasWidth: canvas.width }

		setMazeProps((prev) => ({ ...prev, ...canvasSizes, ctx }))
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
