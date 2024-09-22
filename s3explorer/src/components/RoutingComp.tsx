import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAccountsStore from '../store/accounts-store'
import mixpanel from 'mixpanel-browser'

function RoutingComp() {
    const nav = useNavigate()
    const { active_account } = useAccountsStore()
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        const handleAccounts = async () => {
            setLoading(true)
            if (active_account) {
                mixpanel.track('found_active_account', {
                    account: active_account.name,
                })
                await window.s3_api.setCredentialsPreload(
                    active_account.access_key,
                    active_account.secret_key,
                    active_account.region
                )
            } else {
                mixpanel.track('no_active_account', {
                    event: 'no_active_account',
                })
                nav('/accounts')
            }
            setLoading(false)
        }
        handleAccounts()
    }, [active_account])

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center text-xl">
                Loading ...
            </div>
        )
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default RoutingComp
