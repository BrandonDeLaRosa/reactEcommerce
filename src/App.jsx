import { Container } from 'react-bootstrap'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Products from './Pages/Products'
import Purchases from './Pages/Purchases'

function App() {

  return (
    <HashRouter>
      <Header />
      {/* <Container className='my-3'> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products/:id' element={<Products />} />
          <Route path='/purchases' element={<Purchases />} />
        </Routes>
      {/* </Container> */}
    </HashRouter>
  )
}

export default App
