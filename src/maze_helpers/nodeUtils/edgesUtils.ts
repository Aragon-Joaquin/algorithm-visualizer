import type { Square } from '@/types'

export function getRandomEdge(edges: Square['edge']) {
	const keys = Object.keys(edges) as [keyof Square['edge']]
	while (keys.length) {
		const pos = Math.floor(Math.random() * keys.length)
		const selectedKey = keys[pos]
		if (!edges[selectedKey]) {
			keys.splice(pos, 1)
			continue
		}
		return selectedKey
	}
}

export const randomizeEdges = (ed: Square['edge']) =>
	Object.keys(ed)
		.map((e) => ({ e, r: Math.random() }))
		.sort((a, b) => a.r - b.r)
		.map((a) => a.e)
