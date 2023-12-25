import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Users from './components/Users'
import { useSelector } from 'react-redux'

function App() {
  const token = useSelector((state) => state.application.token)
  if(!token){
  return(
    <div>
      <Routes>
        <Route path='/' element={<Navigate to='/auth' />}/>  
        <Route path='/auth' element={<SignUp />}/>
        <Route path='/login' element={<SignIn />}/>
      </Routes>
    </div> 
  )
  }

  return(
    <div>
      <Routes>
        <Route path='/' element={<Users/>}/>
        <Route path='/login' element={<Navigate to='/' />}/>
      </Routes>
    </div>
  )
}

export default App
