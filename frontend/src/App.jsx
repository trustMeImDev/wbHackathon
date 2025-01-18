import { Route, Routes } from 'react-router'
import { Login } from './pages/Login'
import Summary from './pages/Summary'
import { Home } from './pages/Home';
import { Authenticated } from './pages/Authenticated';
import ProtectedRoute from './components/protected-route';

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/summary' element={
        <ProtectedRoute>
          <Summary/>
        </ProtectedRoute>
      } />
      <Route path='/authenticated' element={<Authenticated/>} />
    </Routes>
  )

}

export default App
