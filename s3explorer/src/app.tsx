import React, { lazy, Suspense } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import RoutingComp from './components/RoutingComp'
import { ThemeProvider } from './components/ThemeProvider'
import { Toaster } from './components/ui/toaster'

import mixpanel from 'mixpanel-browser'
import ErrorBoundary from './components/ErrorBoundry'
import { TooltipProvider } from '@radix-ui/react-tooltip'

const HomePage = lazy(() => import('./pages/homepage'))
const AmazonCredPage = lazy(() => import('./pages/accounts'))

const MIXPANEL_TOKEN = 'token_here'

mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: true,
    persistence: 'localStorage',
})

const router = createHashRouter([
    {
        element: <RoutingComp />,
        children: [
            {
                path: '/',
                element: <HomePage />,
                errorElement: <ErrorBoundary />,
            },
            {
                path: '/accounts',
                element: <AmazonCredPage />,
                errorElement: <ErrorBoundary />,
            },
        ],
    },
])

function App() {
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <ThemeProvider defaultTheme="dark" storageKey="theme-key">
                <TooltipProvider>
                    <div className="dark:bg-gray-800 ">
                        <div className="w-full h-[30px] dark:bg-gray-900 z-50 fixed allow_drag flex justify-center items-center dark:text-white">
                            S3 Explorer
                        </div>
                        <RouterProvider router={router} />
                        <Toaster />
                    </div>
                </TooltipProvider>
            </ThemeProvider>
        </Suspense>
    )
}

export default App
