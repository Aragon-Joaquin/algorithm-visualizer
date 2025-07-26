//make it class if its complexity increases

/**
 *
 * @param ctx the canvas context to draw the rectangle
 * @param xPos the starting X position of the square
 * @param yPos the starting Y position of the square
 * @param width
 * @param height
 * @param thick border thick
 */
export function borderBuilder(ctx: CanvasRenderingContext2D, xPos: number, yPos: number, width: number, height: number, thick: number = 2) {
	// i cant think a better way to do this
	// the idea is that you can pass the prop directly like: borderBuilder["top"]() but is not semantic
	return {
		top: () => ctx.fillRect(xPos, yPos, width, thick),
		right: () => ctx.fillRect(xPos + width, yPos, thick, height),
		bottom: () => ctx.fillRect(xPos, yPos + height, width, thick),
		left: () => ctx.fillRect(xPos, yPos, thick, height),
	} as const
}
