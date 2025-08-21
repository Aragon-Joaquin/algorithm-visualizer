import type { MazeInfo, MazeNodes, MazeProps } from '../types'

//!NOTE: types declarations:
export interface MazeAlgoProps {
	xAxis: number
	yAxis: number
	mNodes: MazeNodes
}

export interface TraversalProps {
	StartPoint: MazeInfo['StartPoint']
	EndPoint: MazeInfo['EndPoint']
	Nodes: MazeNodes
	MazeProps: MazeProps
}
