import { createContext, type Dispatch, type SetStateAction } from 'react'
import type { MazeInfo, MazeProps } from '../types'

export const MazeContext = createContext({} as MazeContextType)

type StateDispatcher<T> = Dispatch<SetStateAction<T>>

interface MazeContextType {
	mazeProps: MazeProps
	setMazeProps: StateDispatcher<MazeProps>

	mazeInfo: MazeInfo | undefined
	setMazeInfo: StateDispatcher<MazeInfo | undefined>
}
