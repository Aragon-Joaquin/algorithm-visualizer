import { useEffect, useState } from 'react'
import { SquarePainter } from '../../maze_helpers'
import type { MazeInfo, MazeProps } from '../../types'
import { COLORS_SQUARE } from '../../utils'

export function useCanvasUtils(mazeProps: MazeProps, mazeInfo: MazeInfo | undefined) {
	const {
		canvasElement,
		SquareSizes: { SWidth, SHeight, SThick },
		ctx,
		XSquares,
		YSquares
	} = mazeProps

	const [endpoint, setEndpoint] = useState<MazeInfo['EndPoint']>({ x: XSquares - 1, y: YSquares - 1 })

	const listener = (e: MouseEvent) => {
		e.preventDefault()

		const rect = canvasElement.getBoundingClientRect()
		const x = (e.clientX - rect.left) * (canvasElement.width / rect.width) // mouse location in canvas * scale factor
		const y = (e.clientY - rect.top) * (canvasElement.height / rect.height)

		const posX = Math.floor(x / SWidth)
		const posY = Math.floor(y / SHeight)

		if ((posX === 0 && posY === 0) || (endpoint.x === posX && endpoint.y === posY)) return
		const paint = new SquarePainter(ctx, SWidth, SHeight, SThick)

		//remove previous endpoint square
		paint.paintOne(endpoint.x, endpoint.y, {
			color: COLORS_SQUARE.NONE,
			edges: mazeInfo ? mazeInfo['Nodes'][endpoint.y][endpoint.x]['edge'] : undefined
		})

		//paint it again
		paint.paintOne(posX, posY, {
			color: COLORS_SQUARE.GREEN,
			edges: mazeInfo ? mazeInfo['Nodes'][posY][posX]['edge'] : undefined
		})

		setEndpoint({ x: posX, y: posY })
	}

	useEffect(() => {
		if (!canvasElement || !mazeInfo) return
		canvasElement.addEventListener('click', listener)

		return () => canvasElement.removeEventListener('click', listener)
	}, [mazeInfo])

	return endpoint
}
