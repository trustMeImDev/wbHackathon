import { Route, Routes } from 'react-router'
import { Login } from './pages/Login'
import Summary from './pages/Summary'
import { Home } from './pages/Home';

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/summary' element={<Summary/>} />
    </Routes>
  )

}

export default App
