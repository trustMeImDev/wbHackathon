import './App.css'
import { Route, Routes } from 'react-router'
import { Login } from './pages/Login'

function App() {

  return (

    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<> </>} />
    </Routes>
  )

}

export default App
