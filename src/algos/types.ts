import type { mazeCoords, MazeInfo, MazeNodes, MazeProps } from '../types'

//!NOTE: types declarations:
export interface MazeAlgoProps {
	xAxis: number
	yAxis: number
	mNodes: MazeNodes
}

export interface TraversalProps {
	EndPoint: MazeInfo['EndPoint']
	Nodes: MazeNodes
	MazeProps: MazeProps
	Path: mazeCoords[]
}
