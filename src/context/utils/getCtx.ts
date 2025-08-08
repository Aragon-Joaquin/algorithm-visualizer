export const getCtx = () => {
	const canvas = document?.getElementById('main-canvas') as HTMLCanvasElement | null
	const ctx = canvas?.getContext('2d')

	if (!ctx || !canvas) return console.error('use a proper browser to view this page')
	const canvasSizes = { canvasHeight: canvas.height, canvasWidth: canvas.width }

	return { ...canvasSizes, ctx, canvasElement: canvas }
}
