import type { MazeNodes } from '@/types'
import type { MazeAlgoProps } from '../types'

export function mazeBTree({ xAxis, yAxis, mNodes }: MazeAlgoProps): MazeNodes {
	//! this has to be consistent:
	// depends on where i start the algorithm will prefer these options:
	// [0,0]: 			!south/east
	// [yAxis], xAxis]: !north/east,
	// [0, xAxis]: 		!south/west
	// [yAxis, 0]: 		!north/east

	return mNodes
}
