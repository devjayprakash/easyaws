'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Navbar: React.FC = () => {
    const [isOnTop, setIsOnTop] = useState(true)

    useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY > 0) {
                setIsOnTop(false)
            } else {
                setIsOnTop(true)
            }
        }

        return () => {
            window.onscroll = null
        }
    }, [])

    return (
        <nav
            className="w-full fixed top-0 left-0 right-0 z-10"
            style={{
                boxShadow: isOnTop ? 'none' : '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                backgroundColor: isOnTop ? 'transparent' : 'white',
            }}
        >
            <div
                style={{
                    padding: isOnTop ? '2.5rem 0.5rem' : '0.5rem',
                }}
                className="flex justify-between duration-300 items-center w-full container mx-auto"
            >
                <div className="bg-orange-100 w-16 h-16 rounded-lg">
                    <Image
                        src={'/rocket.png'}
                        alt="Logo"
                        width={80}
                        height={80}
                    />
                </div>
                <div className="flex items-center gap-6">
                    <Link
                        className="hover:border-b-2 border-orange-500"
                        href={'#'}
                    >
                        Docs
                    </Link>
                    <Link
                        className="hover:border-b-2 border-orange-500"
                        href={'#'}
                    >
                        Updates
                    </Link>
                    <Link
                        className="hover:border-b-2 border-orange-500"
                        href={'#'}
                    >
                        FAQ
                    </Link>
                </div>
                <div>
                    <button className="bg-orange-500 px-3 py-1 rounded-full text-white">
                        Download
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
