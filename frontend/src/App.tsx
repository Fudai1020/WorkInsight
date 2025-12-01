
import { Route, Routes } from 'react-router-dom'
import './global.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { AppLayput } from './layout/AppLayput'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route element={<AppLayput/>}>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Route>
    
    </Routes>

    </>
  )
}

export default App
