import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'

const router = createBrowserRouter([
  {
      path: "/",
      element: <Home />
  },
  {
      path: "/login",
      element: <Login />
  }
])

function App() {


  
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






