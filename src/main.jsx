import React from 'react'
import ReactDOM from 'react-dom/client'
import * as comp from './components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Provider } from 'react-redux';
import store from './store/store'; // Importa tu almacén


const router = createBrowserRouter([
  {
    path: '/',
    element: <comp.App/>
  },
  {
    path: '/pokemon/:id',
    element: <comp.PokeDetail/>
  }
]
  
)

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <Provider store={store}>
  <RouterProvider router = { router }>
    <comp.App />
    </RouterProvider>
    </Provider>
  //</React.StrictMode>,
)
