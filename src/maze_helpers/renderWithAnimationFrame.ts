import type { MazeProps, Square } from '../types'
import { CalculatePerformanceNow, INTERVAL_VEL, type CalculatePerformanceType, type COLORS_SQUARE } from '../utils'
import { SquarePainter } from './SquarePainter'

const CHANNEL_NAME = 'RenderWithAnimationFrame' as const

export type queueEvent = { timePassed: CalculatePerformanceType }
export type squarePainted = Square & { color: (typeof COLORS_SQUARE)[keyof typeof COLORS_SQUARE] }

export class RenderWithAnimationFrame {
	static continueExec: boolean = true
	static intervalVel: number = 50

	public queueToPaint: squarePainted[] = []

	private ctx: CanvasRenderingContext2D
	private SquareProps: MazeProps['SquareSizes']

	constructor(ctx: CanvasRenderingContext2D, sp: MazeProps['SquareSizes']) {
		this.ctx = ctx
		this.SquareProps = sp
	}

	renderSquare() {
		RenderWithAnimationFrame.continueExec = true
		const { SWidth, SHeight, SThick } = this.SquareProps
		const painter = new SquarePainter(this.ctx, SWidth, SHeight, SThick)
		const calcTime = CalculatePerformanceNow()

		const render = async () => {
			if (!this.queueToPaint.length || !RenderWithAnimationFrame.continueExec) {
				//ADD EVENT HERE!
				dispatchEvent(new CustomEvent<queueEvent>(CHANNEL_NAME, { detail: { timePassed: calcTime() } }))
				return RenderWithAnimationFrame.stopIterating()
			}

			const { x, y, edge, color } = this.queueToPaint.shift()!
			await new Promise((resolve) => setTimeout(resolve, RenderWithAnimationFrame.intervalVel))
			painter.paintOne(x, y, { color, edges: edge })

			requestAnimationFrame(render)
		}
		requestAnimationFrame(render)
	}

	static stopIterating = () => (RenderWithAnimationFrame.continueExec = false)
	static changeIntervalVel = (vel: number) =>
		(RenderWithAnimationFrame.intervalVel =
			vel > INTERVAL_VEL.MAX ? INTERVAL_VEL.MAX : vel < INTERVAL_VEL.MIN ? INTERVAL_VEL.MIN : vel)

	pushToPaint = (square: squarePainted) => this.queueToPaint.push(square)

	static subscribeToEvent = (cb: (args: CustomEvent<queueEvent>) => void) =>
		addEventListener(CHANNEL_NAME, (args) => cb(args as CustomEvent))

	static unsubscribeToEvent = (cb: (args: CustomEvent<queueEvent>) => void) =>
		removeEventListener(CHANNEL_NAME, (args) => cb(args as CustomEvent))
}
