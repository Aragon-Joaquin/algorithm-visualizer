//make it class if its complexity increases

import type { Square } from '../../types'
import { COLORS_SQUARE } from '../../utils'

/**
 * @class
 * @param ctx the canvas context to draw the rectangle
 * @param xPos the starting X position of the square
 * @param yPos the starting Y position of the square
 * @param width
 * @param height
 * @param thick border thick
 */
export function borderBuilder(
	ctx: CanvasRenderingContext2D,
	xPos: number,
	yPos: number,
	width: number,
	height: number,
	thick: number = 2
) {
	ctx.fillStyle = COLORS_SQUARE.WHITE
	ctx.strokeStyle = COLORS_SQUARE.BLACK
	ctx.lineWidth = thick

	return ({ edges }: { edges: Square['edge'] }) => {
		const edgeDrawers = {
			top: () => {
				ctx.moveTo(xPos, yPos)
				ctx.lineTo(xPos + width, yPos)
			},
			right: () => {
				ctx.moveTo(xPos + width, yPos)
				ctx.lineTo(xPos + width, yPos + height)
			},
			bottom: () => {
				ctx.moveTo(xPos + width, yPos + height)
				ctx.lineTo(xPos, yPos + height)
			},
			left: () => {
				ctx.moveTo(xPos, yPos + height)
				ctx.lineTo(xPos, yPos)
			}
		} as const

		for (const key in edges) {
			const assertedKey = key as keyof Square['edge']
			if (!edges[assertedKey]) continue

			//draw borders
			ctx.beginPath()
			edgeDrawers[assertedKey]()
			ctx.stroke()
			ctx.closePath()
		}
	}
}
