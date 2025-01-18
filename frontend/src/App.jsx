import { Route, Routes } from 'react-router'
import { Login } from './pages/Login'
import Summary from './pages/Summary'
import { Home } from './pages/Home';
import FileSummary from './pages/FileSummary';

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/summary' element={<Summary/>} />
      <Route path='/file' element={<FileSummary/>} />
    </Routes>
  )

}

export default App
