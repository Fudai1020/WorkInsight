
import { Route, Routes } from 'react-router-dom'
import './global.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { AppLayput } from './layout/AppLayput'

function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/' element={<AppLayput />}></Route>
    </Routes>

    </>
  )
}

export default App
