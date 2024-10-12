import Image from 'next/image'
import Link from 'next/link'

const Footer: React.FC = () => {
    return (
        <div className="border-t-2 border-t-orange-100 flex py-20 container mx-auto justify-between">
            <div className="w-[400px]">
                <div className="flex items-center gap-3 ">
                    <div className="bg-orange-100 w-16 h-16 rounded-lg">
                        <Image
                            src={'/rocket.png'}
                            alt="Logo"
                            width={80}
                            height={80}
                        />
                    </div>
                    <div className="text-xl font-semibold">S3 Explorer</div>
                </div>
                <div className="mt-3">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis, beatae?
                </div>
            </div>
            <div className="p-12">
                <ul className="space-y-2">
                    <li>
                        <Link
                            className="px-3 hover:border-b-2 border-b-orange-500"
                            href={'#'}
                        >
                            Docs
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="px-3 hover:border-b-2 border-b-orange-500"
                            href={'#'}
                        >
                            Download
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="px-3 hover:border-b-2 border-b-orange-500"
                            href={'#'}
                        >
                            FAQ
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
