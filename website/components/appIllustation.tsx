import Image from 'next/image'

const AppIllustration: React.FC = () => {
    return (
        <div className="container rounded-3xl h-[600px] overflow-hidden mx-auto bg-orange-100 flex justify-center items-start p-20">
            <Image
                className="rounded-lg overflow-hidden"
                src={'/screenshot.png'}
                alt="App Illustration"
                width={1200}
                height={800}
            />
        </div>
    )
}

export default AppIllustration
