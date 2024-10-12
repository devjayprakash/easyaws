import { ArrowDownTrayIcon } from '@heroicons/react/16/solid'
import React from 'react'

function Banner() {
    return (
        <div className="container rounded-3xl my-20 mx-auto flex flex-col justify-center items-center p-12 bg-orange-600">
            <h2 className="text-white max-w-2xl text-center text-4xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Consectetur, magni!
            </h2>
            <button className="mt-12 bg-white px-3 py-2 flex items-center gap-3 rounded-full hover:opacity-85">
                Download for mac
                <ArrowDownTrayIcon width={24} height={24} />
            </button>
        </div>
    )
}

export default Banner
