import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ContactUs from './pages/ContactUs.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <LandingPage />
      }, {
        path: '/profile',
        element: <ProfilePage />
      }, {
        path: '/dashboard',
        element: <Dashboard />
      }, {
        path:'/contact',
        element: <ContactUs />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
