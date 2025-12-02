
import { Route, Routes } from 'react-router-dom'
import './global.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { AppLayput } from './layout/AppLayput'
import Dashboard from './pages/Dashboard'
import TodoList from './pages/TodoList'

function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route element={<AppLayput/>}>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/todoList' element={<TodoList/>}/>
      </Route>
    
    </Routes>

    </>
  )
}

export default App
