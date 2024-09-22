function App() {
    return (
        <div className="w-full min-h-screen">
            <header className="w-full p-3 h-screen flex flex-col-reverse md:flex-row justify-center items-center">
                <div>
                    <h1 className="from-primary text-4xl  md:text-6xl font-bold text-transparent to-accent bg-gradient-to-tl bg-clip-text">
                        Easy AWS
                    </h1>
                    <p className="md:text-4xl text-2xl mt-4">
                        Easy AWS helps you explore s3 buckets with ease.
                    </p>
                    <button className="px-4 py-2 mt-4 hover:scale-105 duration-300 text-lg rounded-md ring-accent ring-2 bg-gradient-to-tr from-primary to-accent text-white">
                        Download now
                    </button>
                </div>
                <div>
                    <img
                        src="/bg-image.jpg"
                        alt="main image"
                        className="md:w-[600px] w-96 h-96 md:h-[600px]"
                    />
                </div>
            </header>
        </div>
    )
}

export default App
