import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/homepage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

function App() {
  return (
    <div className="dark:bg-gray-800 ">
      <div className="w-full h-[30px] dark:bg-gray-900 z-50 fixed allow_drag flex justify-center items-center dark:text-white">
        S3 Explorer
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
