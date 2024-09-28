import mixpanel from 'mixpanel-browser'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import errorImage from '../images/error.png'
import { useToast } from './ui/use-toast'
import { useRouteError } from 'react-router-dom'

const ErrorBoundary: React.FC = () => {
    const { toast } = useToast()
    const error = useRouteError()

    useEffect(() => {
        mixpanel.track('ErrorBoundary')
    }, [])

    return (
        <div className="w-full h-screen flex justify-center flex-col items-center">
            <img src={errorImage} width={100} />
            <div className="text-4xl mt-3">Something went wrong !!!</div>
            <Button
                onClick={() => {
                    mixpanel.track('ReportError', {
                        error: JSON.stringify(error),
                    })
                    toast({
                        title: 'Error reported',
                        description: 'Thank you for reporting the issue',
                    })
                }}
                size="lg"
                className="mt-6"
            >
                Report this error
            </Button>
            <div>
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
        </div>
    )
}

export default ErrorBoundary
