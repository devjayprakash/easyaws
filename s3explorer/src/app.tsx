import React from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import RoutingComp from './components/RoutingComp'
import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from './components/ui/toaster'
import AmazonCredPage from './pages/accounts'
import HomePage from './pages/homepage'

const router = createHashRouter([
    {
        element: <RoutingComp />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/accounts',
                element: <AmazonCredPage />,
            },
        ],
    },
])

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="theme-key">
            <div className="dark:bg-gray-800 ">
                <div className="w-full h-[30px] dark:bg-gray-900 z-50 fixed allow_drag flex justify-center items-center dark:text-white">
                    S3 Explorer
                </div>
                <RouterProvider router={router} />
                <Toaster />
            </div>
        </ThemeProvider>
    )
}

export default App
