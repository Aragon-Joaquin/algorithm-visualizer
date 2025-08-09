import type { Square } from '../types'
import { COLORS_SQUARE } from '../utils'

interface PaintOptions {
	edges?: Square['edge']
	color?: (typeof COLORS_SQUARE)[keyof typeof COLORS_SQUARE]
}

const defaultPaintOptions: PaintOptions = {
	edges: { top: true, right: true, bottom: true, left: true },
	color: COLORS_SQUARE.WHITE
}

export class SquarePainter {
	private ctx: CanvasRenderingContext2D
	private w: number //square width
	private h: number //square height
	private t: number //square thickness

	constructor(ctx: CanvasRenderingContext2D, SWidth: number, SHeight: number, SThick: number = 2) {
		this.ctx = ctx
		this.w = SWidth
		this.h = SHeight
		this.t = SThick
	}

	paintOne(
		x: number,
		y: number,
		{ edges = defaultPaintOptions.edges, color = defaultPaintOptions.color }: PaintOptions = defaultPaintOptions
	) {
		//delete previous
		this.ctx.clearRect(x, y * this.h, this.w + this.t * 2, this.h + this.t * 2)

		//paint square
		this.ctx.fillStyle = color as string
		this.ctx.fillRect(x * this.w + this.t / 2, y * this.h + this.t / 2, this.w - this.t, this.h - this.t)

		//border
		this.borderBuilder(x, y, edges as Square['edge'])
	}

	private borderBuilder(x: number, y: number, edges: Square['edge']) {
		this.ctx.strokeStyle = COLORS_SQUARE.BLACK
		this.ctx.lineWidth = this.t / 2

		const edgeDrawers = {
			top: () => {
				this.ctx.moveTo(x, y)
				this.ctx.lineTo(x + this.w, y)
			},
			right: () => {
				this.ctx.moveTo(x + this.w, y)
				this.ctx.lineTo(x + this.w, y + this.h)
			},
			bottom: () => {
				this.ctx.moveTo(x + this.w, y + this.h)
				this.ctx.lineTo(x, y + this.h)
			},
			left: () => {
				this.ctx.moveTo(x, y + this.h)
				this.ctx.lineTo(x, y)
			}
		} as const

		for (const key in edges) {
			const assertedKey = key as keyof Square['edge']
			if (!edges[assertedKey]) continue

			//draw borders
			this.ctx.beginPath()
			edgeDrawers[assertedKey]()
			this.ctx.stroke()
			this.ctx.closePath()
		}
	}
}
