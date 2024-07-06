import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/homepage';
import useGlobalStore from './store/global';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

function App() {
  const { setPath, path } = useGlobalStore();

  useEffect(() => {
    //mouse back click detect
    const backFn = (e: MouseEvent) => {
      if (e.button === 3) {
        setPath(path.slice(0, -1));
      }
    };
    window.addEventListener('mousedown', backFn);

    return () => {
      window.removeEventListener('mousedown', backFn);
    };
  }, []);

  return (
    <div className="bg-gray-800">
      <div className="w-full h-[30px] bg-gray-900  fixed allow_drag"></div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
