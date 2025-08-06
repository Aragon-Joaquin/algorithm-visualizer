/* 
    a disjoint set is practically a dataStructure that has no elements overlapping, like a Set

	- the parent class holds all the maze elements position number, if its a 25*20, it would be a 500 element size (500 * 4 = 2kb approximately).
		the position of the element (ex.: parent[4]) determines which groups is on. (parent[4] = 2, the fourth cell is united to the second one) 
	- the size class tracks the number of elements each group has  
*/
export class DisjointSet {
	public parent: number[] = []
	public size: Map<number, number> = new Map()

	constructor(arraySize: number) {
		for (let i = 0; i < arraySize; i++) {
			this.parent[i] = i
			this.size.set(i, 1)
		}
	}

	find(idNode: number) {
		//find if the parent[i] == i return node number, else, make it recursive until node is found
		if (this.parent[idNode] !== idNode) this.parent[idNode] = this.find(this.parent[idNode])
		return this.parent[idNode]
	}

	/**
	 * @returns {boolean} returns true if the merge was successful
	 */
	union(nodeI: number, nodeJ: number): boolean {
		const mergeA = this.find(nodeI)
		const mergeB = this.find(nodeJ)

		//they're already in the same group
		if (mergeA === mergeB) return false

		const sizeA = this.size.get(mergeA) ?? 0
		const sizeB = this.size.get(mergeB) ?? 0

		//merge the node (i could probably make this less imperative)
		if (sizeA > sizeB) {
			this.parent[mergeB] = mergeA
			this.size.set(mergeA, sizeA + 1)
			this.size.set(mergeB, sizeB - 1)
			return true
		}

		this.parent[mergeA] = mergeB
		this.size.set(mergeB, sizeB + 1)
		this.size.set(mergeA, sizeA - 1)
		return true
	}
}
