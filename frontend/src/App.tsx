
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
import { DashboardProvider } from './context/DashboardContext'
import { UserProvider } from './context/UserContext'
import { SettingProvider } from './context/SettingContext'
import { AuthProvider } from './context/AuthContext'
import { TimerProvider } from './context/TimerContext'
import PrivateRoute from './components/PrivateRoute'


function App() {

  return (
    <ModalProvider> 
      <AuthProvider>
        <UserProvider>
          <DashboardProvider>
            <SettingProvider>
              <TimerProvider>
                <Routes>
                  <Route path='/login' element={<Login />}></Route>
                  <Route path='/' element={<Register />}></Route>
                    <Route element={
                      <PrivateRoute> 
                          <AppLayout/>
                      </PrivateRoute>
                        }>
                      <Route path='/dashboard' element={<Dashboard />}/>
                      <Route path='/todoList' element={<TodoList/>}/>
                      <Route path='/schedule' element={<Schedule/>}/>
                      <Route path='/profile' element={<Profile/>}/>
                    </Route>
                </Routes>
              </TimerProvider>
            </SettingProvider>
          </DashboardProvider>
        </UserProvider>
      </AuthProvider>
    </ModalProvider>
  )
}

export default App
