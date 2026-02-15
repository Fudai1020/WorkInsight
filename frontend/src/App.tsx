
import { Route, Routes } from 'react-router-dom'
import './global.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import TodoList from './pages/TodoList'
import Schedule from './pages/Schedule'
import { ModalProvider } from './context/ModalContext'
import { AppLayout } from './layout/AppLayout'
import Profile from './pages/Profile'


function App() {

  return (
    <ModalProvider>
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/' element={<Register />}></Route>
      <Route element={<AppLayout/>}>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/todoList' element={<TodoList/>}/>
        <Route path='/schedule' element={<Schedule/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Route>
    </Routes>
    </ModalProvider>
  )
}

export default App
