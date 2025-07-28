import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { MazeProvider } from './context/mazeContext'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MazeProvider>
			<App />
		</MazeProvider>
	</StrictMode>
)
