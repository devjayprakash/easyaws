function App() {
  return (
    <div className="w-full min-h-screen">
      <header className="w-full h-screen flex justify-center items-center">
        <div>
          <h1 className="from-primary text-6xl font-bold text-transparent to-accent bg-gradient-to-tl bg-clip-text">
            Easy AWS
          </h1>
          <p className="text-4xl mt-4">
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
            className="w-[600px] h-[600px]"
          />
        </div>
      </header>
    </div>
  );
}

export default App;
