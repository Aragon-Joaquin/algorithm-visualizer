import { useCallback, useEffect, useState } from 'react'
import type { MazeProps } from '../../types'
import { COLORS_SQUARE, matrixToArray } from '../../utils'

export function useCanvasUtils(mazeProps: MazeProps) {
	const {
		canvasElement,
		SquareSizes: { SWidth, SHeight, SThick },
		ctx,
		XSquares,
		YSquares
	} = mazeProps

	const [endpoint, setEndpoint] = useState<number>(XSquares * YSquares - 1)

	//is the callback even necessarily?
	const listener = useCallback(
		(e: MouseEvent) => {
			e.preventDefault()

			const rect = canvasElement.getBoundingClientRect()
			const x = (e.clientX - rect.left) * (canvasElement.width / rect.width) // mouse location in canvas * scale factor
			const y = (e.clientY - rect.top) * (canvasElement.height / rect.height)

			const posX = Math.floor(x / SWidth)
			const posY = Math.floor(y / SHeight)

			ctx.fillStyle = COLORS_SQUARE.RED
			ctx.fillRect(posX * SWidth + SThick / 2, posY * SHeight + SThick / 2, SWidth - SThick, SHeight - SThick)

			setEndpoint(matrixToArray(posY, posX, mazeProps.YSquares))
		},
		[mazeProps]
	)

	useEffect(() => {
		if (!canvasElement) return
		canvasElement.addEventListener('click', listener)

		return () => canvasElement.removeEventListener('click', listener)
	}, [mazeProps])

	return endpoint
}
