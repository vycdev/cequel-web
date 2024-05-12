import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import ErrorPage from './routes/error-page.tsx';
import Home from './routes/Home.tsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.tsx.css'

const router = createBrowserRouter([
    {
        path: "/", element: <App />, errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Home />
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
