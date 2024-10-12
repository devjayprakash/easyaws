import { ArrowDownTrayIcon } from '@heroicons/react/16/solid'

const Hero: React.FC = () => {
    return (
        <div className="bg-white bg-opacity-90 h-screen">
            <div className="flex h-[70vh]  to-transparent flex-col justify-center container mx-auto items-start z-20">
                <h1
                    style={{ fontSize: 64 }}
                    className="font-semibold max-w-[800px]"
                >
                    <span className="text-orange-500">Easy AWS:</span>{' '}
                    Simplifying Your Cloud Experience
                </h1>
                <h2 className="max-w-md py-6">
                    Ready to simplify your AWS experience? Download S3 Explorer
                    now and take control of your cloud storage!
                </h2>
                <button className="mt-6 bg-orange-500 px-4 py-2 rounded-full text-white flex gap-3 items-center">
                    Download for Mac OS{' '}
                    <ArrowDownTrayIcon width={24} height={24} />
                </button>
            </div>
        </div>
    )
}

export default Hero
