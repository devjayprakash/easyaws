import React from 'react'
import { Card, CardDescription } from './ui/card'
import { Button } from './ui/button'
import useTabs from '../store/tab-store'
import useAccountsStore from '../store/accounts-store'
import useSettingsStore from '../store/settings'
import useBucketStore from '../store/buckets'

const DeveloperCenter: React.FC = () => {
    const { reset: resetTabs } = useTabs()
    const { reset: resetAccounts } = useAccountsStore()
    const { reset: resetSettings } = useSettingsStore()
    const { reset: resetBuckets } = useBucketStore()

    return (
        <div className="p-3">
            <h1 className="text-2xl">Developer center</h1>
            <Card className="mt-5">
                <CardDescription className="flex justify-between p-3 items-center">
                    <div className="text-xl">Delete user data</div>
                    <div>
                        <Button
                            onClick={() => {
                                window.developer.deleteUserData()
                                resetTabs()
                                resetAccounts()
                                resetSettings()
                                resetBuckets()
                                window.location.reload()
                            }}
                            variant="destructive"
                        >
                            Delete data
                        </Button>
                    </div>
                </CardDescription>
            </Card>
        </div>
    )
}

export default DeveloperCenter
