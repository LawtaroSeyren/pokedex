import React from 'react'
import ReactDOM from 'react-dom/client'
import * as comp from './components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'



const router = createBrowserRouter([
  {
    path: '/',
    element: <comp.App/>
  },
  {
    path: '/pokemon',
    element: <comp.App/>
  },
  {
    path: '/pokemon/:id',
    element: <comp.PokeDetail/>
  },
  {
    path: '*',
    element: <comp.Error/>
  }

]
  
)

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <RouterProvider router = { router }>
    <comp.App />
    </RouterProvider>
  //</React.StrictMode>,
)
