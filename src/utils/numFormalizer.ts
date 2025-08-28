type NumFormOpts = {
	maxDigits?: number
	minDigits?: number
}

const NumFormOptsDefault: NumFormOpts = {
	maxDigits: 2,
	minDigits: 0
}
export const NumForm = (num: number, { maxDigits = 2, minDigits = 0 }: NumFormOpts = NumFormOptsDefault) =>
	new Intl.NumberFormat('en-US', {
		//@ts-expect-error: https://caniuse.com/mdn-javascript_builtins_intl_numberformat_numberformat_options_parameter_options_roundingmode_parameter
		roundingMode: 'floor',
		style: 'decimal',
		minimumFractionDigits: minDigits,
		maximumFractionDigits: maxDigits
	}).format(num)
