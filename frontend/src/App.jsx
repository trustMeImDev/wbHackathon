import './App.css'
import { Route, Routes } from 'react-router'
import { Login } from './pages/Login'
import { Home } from './pages/Home';

function App() {

  return (

    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/' element={<> </>} />
    </Routes>
  )

}

export default App
