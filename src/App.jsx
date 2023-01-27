import { Container } from 'react-bootstrap'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import ProtectedRoutes from './Components/ProtectedRoutes'
import Home from './Pages/Home'
import Login from './Pages/Login'
import NewUser from './Pages/NewUser'
import Products from './Pages/Products'
import Purchases from './Pages/Purchases'

function App() {

  return (
    <HashRouter>
      <Header />
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/singin' element={<NewUser />} />
          <Route path='/products/:id' element={<Products />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path='/purchases' element={<Purchases />} />
        </Route> 
        </Routes>
      
    </HashRouter>
  )
}

export default App
