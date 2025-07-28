import { useContext } from 'react'
import { MazeContext } from '../context/types'

export function useMazeContext() {
	return useContext(MazeContext)
}
