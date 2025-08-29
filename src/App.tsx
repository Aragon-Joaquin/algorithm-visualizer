import { StatusBar, UIMaze } from './components'
//@ts-expect-error: css
import './index.css'

export default function App() {
	return (
		<main className="flex flex-col items-center justify-center gap-4 w-screen">
			<StatusBar />
			<section className="flex flex-row justify-center items-center w-screen gap-4">
				<canvas id="main-canvas" width="1280" height="720"></canvas>

				<UIMaze />
			</section>
		</main>
	)
}
