/**
 * @description transforms a matrix index number into a array index, e.x.: matrix[5][10] (if yAxis is 20) would be array[110]
 * @param yAxis total of columns in the maze
 */
export const matrixToArray = (row: number, col: number, yAxis: number) => row * yAxis + col

/**
 * @description transforms a array index into a matrix, e.x.: array[110] === matrix[y][x]
 * @param yAxis total of columns in the maze
 */
export const arrayToMatrix = (pos: number, yAxis: number) => ({
	y: Math.floor(pos / yAxis),
	x: pos % yAxis
})
