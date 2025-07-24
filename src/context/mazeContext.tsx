import { useContext, useState } from "react"
import type { ReactNode } from "react"
import type { MazeInfo, MazeProps } from "../types"
import { MazeContext } from "./types"

//TODO: make reducer?
export function MazeProvider({ children }: { children: ReactNode }) {
	//NOTE: mazeProps only will cause a re-creation of the maze.
	const [mazeProps, setMazeProps] = useState<MazeProps>({
		XSquares: 25,
		YSquares: 20,
		//Algorithm: "Kruskal"
	})

	//NOTE: meanwhile mazeInfo causes an update.
	const [mazeInfo, setMazeInfo] = useState<MazeInfo>()

	const [ctx, setCtx] = useState<CanvasRenderingContext2D>()

	return (
		<MazeContext.Provider
			value={{
				mazeProps,
				setMazeProps,
				ctx,
				setCtx,
			}}
		>
			{children}
		</MazeContext.Provider>
	)
}

export function useMazeContext() {
	return useContext(MazeContext)
}
