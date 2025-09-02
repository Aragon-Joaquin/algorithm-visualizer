import { createContext } from 'react'
import type { algoStatusType, paintStatusType } from './hooks'
import type { IMazeInfoStore, IMazePropsStore } from './stores'

export const MazeContext = createContext({} as MazeContextType)

// type StateDispatcher<T> = Dispatch<SetStateAction<T>>

interface MazeContextType {
	mProps: Omit<IMazePropsStore, 'initializeMazeProps'>

	mInfo: IMazeInfoStore

	mazeUI: {
		handleTraversal: (traversalSelect: HTMLSelectElement | null) => void
		clearTraversal: () => void
		paintStatus: paintStatusType
		algoStatus: algoStatusType
	}
}
