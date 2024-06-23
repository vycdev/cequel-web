import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.tsx'
import ErrorPage from './routes/error-page.tsx';
import Home from './routes/Home.tsx';
import Login from './routes/Login.tsx'

import './main.tsx.css'
import Documentation from './routes/Documentation.tsx';
import Exercises from './routes/Exercises.tsx';
import Exercise from './routes/Exercise.tsx';

const router = createBrowserRouter([
    {
        path: "/", element: <App />, errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "documentation",
                element: <Documentation />
            },
            {
                path: "exercises",
                element: <Exercises />
            },
            {
                path: "exercise/:id",
                element: <Exercise />
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
