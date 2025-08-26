import { createContext, type Dispatch, type SetStateAction } from 'react'
import { MAZE_ALGORITHMS } from '../algos'
import { getSquareSizes } from '../maze_helpers'
import type { MazeInfo, MazeProps } from '../types'
import type { algoStatusType, paintStatusType } from './hooks'

export const MazeContext = createContext({} as MazeContextType)

type StateDispatcher<T> = Dispatch<SetStateAction<T>>

interface MazeContextType {
	mazeProps: MazeProps
	setMazeProps: StateDispatcher<MazeProps>

	mazeInfo: MazeInfo
	setMazeInfo: StateDispatcher<MazeInfo>

	mazeUI: {
		handleTraversal: (traversalSelect: HTMLSelectElement | null) => void
		clearTraversal: () => void
		paintStatus: paintStatusType
		algoStatus: algoStatusType
	}
}

export const defaultMazeProps: MazeProps = {
	XSquares: 25,
	YSquares: 20,
	canvasHeight: 0,
	canvasWidth: 0,

	SquareSizes: getSquareSizes({ width: 0, height: 0 }, { x: 0, y: 0 })
	//ctx
} as MazeProps

export const defaultMazeInfo: MazeInfo = {
	Nodes: [],
	EndPoint: { x: 0, y: 0 },
	StartPoint: { x: 0, y: 0 },
	Algorithm: MAZE_ALGORITHMS.Kruskal
}
