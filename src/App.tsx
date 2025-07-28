import { useEffect } from 'react'
import { useMazeContext } from './hooks'
import { initializeMaze } from './utils'

export default function App() {
	const { mazeProps } = useMazeContext()

	useEffect(() => {
		if (!mazeProps?.ctx) return
		initializeMaze(mazeProps)
	}, [mazeProps])

	return <></>
}
