import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAccountsStore from '../store/accounts-store'

function RoutingComp() {
    const nav = useNavigate()
    const { active_account } = useAccountsStore()
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        const handleAccounts = async () => {
            setLoading(true)
            if (active_account) {
                await window.s3_api.setCredentialsPreload(
                    active_account.access_key,
                    active_account.secret_key,
                    active_account.region
                )
            } else {
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
