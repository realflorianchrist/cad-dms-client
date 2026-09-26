import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import reactLogo from "./assets/react.svg"
import viteLogo from "/electron-vite.animate.svg"

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="mx-auto min-h-screen max-w-7xl min-w-80 p-8 text-center font-sans antialiased">
      <div className="flex justify-center">
        <a href="https://electron-vite.github.io" target="_blank">
          <img
            src={viteLogo}
            className="h-24 p-6 transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="h-24 p-6 transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] motion-safe:animate-[spin_20s_linear_infinite]"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-5xl leading-tight font-bold">Vite + React</h1>
      <div className="space-y-4 p-8">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-muted-foreground">
        Click on the Vite and React logos to learn more
      </p>
    </main>
  )
}

export default App
