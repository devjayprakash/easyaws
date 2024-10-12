import { CodeBracketIcon } from '@heroicons/react/20/solid'

const KeyFeatures: React.FC = () => {
    return (
        <div className="container mx-auto py-20">
            <div className="flex justify-center">
                <h2 className="text-5xl text-center max-w-xl">
                    Key Features that will make your life simpler.
                </h2>
            </div>
            <div className="lg:flex mt-12 p-12">
                <div className="lg:w-2/5">
                    <h3 className="text-3xl font-bold lg:max-w-md">
                        Code and edit stuff on s3 with ease.
                    </h3>

                    <p className="py-12">
                        With S3 Explorer, you can easily edit your code and
                        files on the go. No need to download and re-upload
                        files, just edit them directly on the cloud.
                    </p>

                    <ul className="space-y-6">
                        <li className="flex gap-3">
                            <CodeBracketIcon width={24} height={24} />
                            <div>
                                <h4 className="text-lg font-semibold">
                                    Code Editor
                                </h4>
                                <p className="text-sm  text-gray-600">
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Deserunt, nihil. Odio
                                    maxime assumenda incidunt quibusdam.
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <CodeBracketIcon width={24} height={24} />
                            <div>
                                <h4 className="text-lg font-semibold">
                                    Code Editor
                                </h4>
                                <p className="text-sm  text-gray-600">
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Deserunt, nihil. Odio
                                    maxime assumenda incidunt quibusdam.
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <CodeBracketIcon width={24} height={24} />
                            <div>
                                <h4 className="text-lg font-semibold">
                                    Code Editor
                                </h4>
                                <p className="text-sm  text-gray-600">
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Deserunt, nihil. Odio
                                    maxime assumenda incidunt quibusdam.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="p-3 flex-grow relative">
                    <div className="bg-orange-100 p-2 left-1/2 absolute rounded-3xl w-[600px] h-[400px]">
                        <div className="bg-white top-10 left-12 shadow-md shadow-orange-200 rounded-2xl p-3 flex items-center gap-4 absolute">
                            <div className="p-2 bg-orange-100">
                                <CodeBracketIcon width={24} height={24} />
                            </div>
                            <div className="w-[230px]">
                                <div>Lorem, ipsum dolor.</div>
                                <div>
                                    Lorem ipsum, dolor sit amet consectetur
                                </div>
                            </div>
                        </div>
                        <div className="bg-white top-48 right-12 shadow-md shadow-orange-200 rounded-2xl p-3 flex items-center gap-4 absolute">
                            <div className="p-2 bg-orange-100">
                                <CodeBracketIcon width={24} height={24} />
                            </div>
                            <div className="w-[230px]">
                                <div>Lorem, ipsum dolor.</div>
                                <div>
                                    Lorem ipsum, dolor sit amet consectetur
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-md shadow-orange-200 rounded-2xl p-3 flex items-center gap-4 -bottom-12 --left-6 absolute">
                            <div className="p-2 bg-orange-100">
                                <CodeBracketIcon width={24} height={24} />
                            </div>
                            <div className="w-[230px]">
                                <div>Lorem, ipsum dolor.</div>
                                <div>
                                    Lorem ipsum, dolor sit amet consectetur
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KeyFeatures
