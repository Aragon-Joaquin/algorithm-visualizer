import { create } from 'zustand'
import { type algoStatusType, type paintStatusType } from '../hooks'

interface StoreType {
	paintStatus: paintStatusType
	pendingPaintStatus: () => void
	completePaintStatus: (time: paintStatusType['time']) => void

	algoStatus: algoStatusType
	pendingAlgoStatus: () => void
	completeAlgoStatus: (time: algoStatusType['time'], iterations: algoStatusType['iterations']) => void

	pendingAll: () => void
}

const store = create<StoreType>((set) => ({
	//only takes account of the canvas paint time
	paintStatus: {
		pending: false,
		completed: false,
		time: ['0', 'ms']
	},

	//tracks the algorithm time and space
	algoStatus: {
		time: ['0', 'ms'],
		iterations: 0
	},

	pendingPaintStatus: () => set(({ paintStatus: stPS }) => ({ paintStatus: { ...stPS, pending: true } })),
	completePaintStatus: (time) =>
		set(({ paintStatus: stPS }) => ({ paintStatus: { ...stPS, pending: false, completed: true, time } })),

	pendingAlgoStatus: () =>
		set(({ algoStatus: stAS }) => ({ algoStatus: { ...stAS, time: ['0', 'ms'], iterations: 0 } })),
	completeAlgoStatus: (time, iterations) =>
		set(({ algoStatus: stAS }) => ({ algoStatus: { ...stAS, time, iterations } })),

	pendingAll: () =>
		set(() => ({
			paintStatus: { completed: false, time: ['0', 'ms'], pending: true },
			algoStatus: { time: ['0', 'ms'], iterations: 0 }
		}))
}))

export const useMazeUIStore = () => store((state) => state)
