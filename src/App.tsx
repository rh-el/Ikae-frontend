import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Product from './components/Product'
import Basket from './components/Basket'


function App() {

  const router = createBrowserRouter([
  {
      path: "/",
      element: <Home />
  },
  {
      path: "/login",
      element: <Login />
  },
  {
      path: "/product/:id",
      element: <Product />
  },
  {
      path: "/basket",
      element: <Basket />
  }
])


  
  return (
    <>            
    <Header />
    <div className='relative min-h-svh'>
      <RouterProvider router={router} />
      <Footer />

    </div>
    </>
  )
}

export default App






