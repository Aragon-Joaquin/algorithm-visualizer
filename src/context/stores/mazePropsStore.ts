import { getSquareSizes } from '@/maze_helpers'
import type { MazeProps } from '@/types'
import { create } from 'zustand'

const defaultMazeProps: MazeProps = {
	XSquares: 25,
	YSquares: 20,
	canvasHeight: 0,
	canvasWidth: 0,

	SquareSizes: getSquareSizes({ width: 0, height: 0 }, { x: 0, y: 0 })
	//ctx
	// canvasElement: HTMLCanvasElement
} as MazeProps

export interface IMazePropsStore {
	mazeProps: MazeProps

	initializeMazeProps: (mazeProps: Partial<MazeProps>) => void

	changeMazeSize: (x: number, y: number) => void
	changeCanvasSize: (h: number, w: number) => void
	changeSquareSizes: (...args: Parameters<typeof getSquareSizes>) => void
	changeAlgorithm: (algo: MazeProps['Algorithm']) => void

	getCtx: () => MazeProps['ctx']
	setCtx: (ctx: MazeProps['ctx']) => void
}

const store = create<IMazePropsStore>((set, get) => ({
	mazeProps: defaultMazeProps,

	initializeMazeProps: (maze) => set(({ mazeProps: m }) => ({ mazeProps: { ...m, ...maze } })),

	changeAlgorithm: (algo) => set(({ mazeProps: m }) => ({ mazeProps: { ...m, Algorithm: algo } })),
	changeMazeSize: (x, y) => set(({ mazeProps: m }) => ({ mazeProps: { ...m, XSquares: x, YSquares: y } })),
	changeCanvasSize: (h, w) => set(({ mazeProps: m }) => ({ mazeProps: { ...m, canvasHeight: h, canvasWidth: w } })),
	//TODO: get the props from the store instead of passing them
	changeSquareSizes: (cv, sq, th) =>
		set(({ mazeProps: m }) => ({ mazeProps: { ...m, SquareSizes: getSquareSizes(cv, sq, th) } })),

	getCtx: () => get().mazeProps.ctx,
	setCtx: (ctx) => set(({ mazeProps: m }) => ({ mazeProps: { ...m, ctx } }))
}))

export const useMazePropsStore = () => store((state) => state)
