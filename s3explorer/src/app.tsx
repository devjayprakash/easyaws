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
    <div className="bg-gray-800">
      <div className="w-full h-[30px] bg-gray-900  fixed allow_drag"></div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
