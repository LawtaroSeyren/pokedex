import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PokeDetail from './components/PokeDex/PokeDetail/PokeDetail.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/pokemon/:id',
    element: <PokeDetail/>
  }
]
  
)

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <RouterProvider router = { router }>
    <App />
    </RouterProvider>
  //</React.StrictMode>,
)
