import { Route, Routes } from 'react-router'
import { Login } from './pages/Login'
import Summary from './pages/Summary'
import { LandingPage } from './pages/LandingPage';
import FileSummary from './pages/FileSummary';
import { Authenticated } from './pages/Authenticated';
import ProtectedRoute from './components/protected-route';
import { Home } from './pages/Home';

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<LandingPage />} />
      <Route path='/summary' element={
        <ProtectedRoute>
          <Summary />
        </ProtectedRoute>
      } />
      <Route path='/home' element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path='/authenticated' element={<Authenticated />} />
      <Route path='/file' element={<FileSummary />} />
    </Routes>
  )

}

export default App
