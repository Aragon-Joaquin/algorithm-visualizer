interface IgetSquareSizes {
	canvas: {
		width: number
		height: number
	}
	//quantity of squares
	squares: {
		x: number
		y: number
	}
}
export const getSquareSizes = (canvas: IgetSquareSizes["canvas"], squares: IgetSquareSizes["squares"], thickness: number = 2) =>
	({
		SWidth: canvas.width / squares.x,
		SHeigth: canvas.height / squares.y,
		SThick: thickness,
	} as const)
