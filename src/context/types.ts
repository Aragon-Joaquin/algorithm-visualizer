import { createContext, type Dispatch, type SetStateAction } from "react"
import type { MazeProps } from "../types"

export const MazeContext = createContext({} as MazeContextType)

type StateDispatcher<T extends unknown> = Dispatch<SetStateAction<T>>

interface MazeContextType {
	mazeProps: MazeProps
	setMazeProps: StateDispatcher<MazeProps>

	ctx: CanvasRenderingContext2D | undefined
	setCtx: StateDispatcher<CanvasRenderingContext2D | undefined>
}
