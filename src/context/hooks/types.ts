import type { CalculatePerformanceType } from '../../utils'

export interface paintStatusType {
	pending: boolean
	completed: boolean
	time: CalculatePerformanceType
}

export interface algoStatusType {
	time: CalculatePerformanceType
	iterations: number
}
