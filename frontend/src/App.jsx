import './App.css'
import { Button } from './components/ui/button'
import { ThemeProvider } from './lib/theme-provider'

function App() {

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='text-4xl'>
        <Button>Click Me!</Button>
      </div>
    </ThemeProvider>
  )

}

export default App
