import type { createMazeSize } from '@/maze_helpers'
import type { MazeInfo, MazeNodes, MazeProps } from '../types'

//!NOTE: types declarations:
export interface MazeAlgoProps {
	xAxis: number
	yAxis: number
	mNodes: createMazeSize
}

export interface TraversalProps {
	StartPoint: MazeInfo['StartPoint']
	EndPoint: MazeInfo['EndPoint']
	Nodes: MazeNodes
	MazeProps: MazeProps
}
