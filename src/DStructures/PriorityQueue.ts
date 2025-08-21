type KeysMatching<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T]

export class PriorityQueue<T extends [] | object> {
	queue: T[]
	sortBy: KeysMatching<T, number>

	constructor(sortBy: typeof this.sortBy) {
		this.queue = []
		this.sortBy = sortBy
	}

	// i enforced this to be as generic as possible
	enqueue(node: T) {
		this.queue.push(node)
		this.queue.sort((a, b) => (a[this.sortBy] as number) - (b[this.sortBy] as number))
	}

	dequeue = () => this.queue.shift()

	isEmpty = () => !this.queue.length
}
