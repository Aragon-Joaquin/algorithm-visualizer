const TIME_IN_MS = {
	SECONDS: 1000,
	MINUTES: 60000
} as const

export function CalculatePerformanceNow() {
	const time = performance.now()
	return (): [string, 'm' | 's' | 'ms'] => {
		const res = performance.now() - time

		if (res > TIME_IN_MS.MINUTES) return [NumForm(res / TIME_IN_MS.MINUTES), 'm']
		return res > TIME_IN_MS.SECONDS ? [NumForm(res / TIME_IN_MS.SECONDS), 's'] : [NumForm(res, 5), 'ms']
	}
}

const NumForm = (num: number, maxDigits: number = 2) =>
	new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: maxDigits }).format(num)

export type CalculatePerformanceType = ReturnType<ReturnType<typeof CalculatePerformanceNow>>
