//make it class if its complexity increases

type Positions = 'top' | 'right' | 'bottom' | 'left'

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
	//TODO: check if condition can be null
	return ({ pos, remove = false }: { pos: Positions; remove: boolean }) => {
		ctx.fillStyle = !remove ? 'black' : 'white'

		const positionsToPaint = {
			top: () => ctx.fillRect(xPos, yPos, width, thick),
			right: () => ctx.fillRect(xPos + width, yPos, thick, height),
			bottom: () => ctx.fillRect(xPos, yPos + height, width, thick),
			left: () => ctx.fillRect(xPos, yPos, thick, height)
		} as const

		positionsToPaint[pos]()
		// ctx.fillStyle = 'black'
	}
}
