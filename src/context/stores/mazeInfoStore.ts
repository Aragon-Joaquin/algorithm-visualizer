import type { mazeCoords, MazeInfo, MazeNodes } from '@/types'
import { create } from 'zustand'

export const defaultMazeInfo: MazeInfo = {
	Nodes: [],
	EndPoint: { x: 0, y: 0 },
	StartPoint: { x: 0, y: 0 }
}

export interface IMazeInfoStore {
	mazeInfo: MazeInfo

	changeNodes: (nodes: MazeNodes) => void
	changeEndPoint: (pos: mazeCoords) => void
	changeStartPoint: (pos: mazeCoords) => void

	getNodes: () => MazeNodes
}

const store = create<IMazeInfoStore>((set, get) => ({
	mazeInfo: defaultMazeInfo,

	changeNodes: (n) => set(({ mazeInfo: m }) => ({ mazeInfo: { ...m, Nodes: n } })),
	changeStartPoint: (pos) => set(({ mazeInfo: m }) => ({ mazeInfo: { ...m, StartPoint: pos } })),
	changeEndPoint: (pos) => set(({ mazeInfo: m }) => ({ mazeInfo: { ...m, EndPoint: pos } })),

	getNodes: () => get().mazeInfo.Nodes
}))

export const useMazeInfoStore = () => store((state) => state)
