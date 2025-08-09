import { createContext, type Dispatch, type SetStateAction } from 'react'
import { getSquareSizes } from '../maze_helpers'
import type { MazeInfo, MazeProps } from '../types'

export const MazeContext = createContext({} as MazeContextType)

type StateDispatcher<T> = Dispatch<SetStateAction<T>>

interface MazeContextType {
	mazeProps: MazeProps
	setMazeProps: StateDispatcher<MazeProps>

	mazeInfo: MazeInfo | undefined
	setMazeInfo: StateDispatcher<MazeInfo | undefined>
}

export const defaultMazeProps: MazeProps = {
	XSquares: 25,
	YSquares: 20,
	canvasHeight: 0,
	canvasWidth: 0,

	SquareSizes: getSquareSizes({ width: 0, height: 0 }, { x: 0, y: 0 })
	//ctx
} as MazeProps
