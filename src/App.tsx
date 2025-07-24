import { useEffect } from "react"
import { useMazeContext } from "./context"
import { createMaze } from "./utils"

export default function App() {
	const { setCtx, mazeProps } = useMazeContext()

	useEffect(() => {
		const canvas = document?.getElementById("main-canvas") as HTMLCanvasElement | null
		const ctx = canvas?.getContext("2d")

		if (!ctx || !canvas) return
		const { width, height } = canvas

		createMaze(ctx, { width, height }, mazeProps)
		setCtx(ctx)
	}, [])

	return <></>
}
