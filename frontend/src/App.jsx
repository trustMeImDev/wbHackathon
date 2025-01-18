import { Route, Routes } from 'react-router'
import { Login } from './pages/Login'
import Summary from './pages/Summary'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/summary' element={<Summary/>} />
    </Routes>
  )

}

export default App
