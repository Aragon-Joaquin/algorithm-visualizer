import { NumForm } from './numFormalizer'

const TIME_IN_MS = {
	SECONDS: 1000,
	MINUTES: 60000
} as const

export function CalculatePerformanceNow() {
	const time = performance.now()
	return (): [string, 'm' | 's' | 'ms'] => {
		const res = performance.now() - time

		console.log({ res })

		if (res > TIME_IN_MS.MINUTES) return [NumForm(res / TIME_IN_MS.MINUTES), 'm']

		return res > TIME_IN_MS.SECONDS ? [NumForm(res / TIME_IN_MS.SECONDS), 's'] : [NumForm(res, { maxDigits: 3 }), 'ms']
	}
}

export type CalculatePerformanceType = ReturnType<ReturnType<typeof CalculatePerformanceNow>>
