import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import storage from './store-storage'

interface AccountsStore {
    accounts: {
        name: string
        access_key: string
        secret_key: string
        region: string
    }[]
    active_account: {
        name: string
        access_key: string
        secret_key: string
        region: string
    } | null
    addAccount: (
        account: {
            name: string
            access_key: string
            secret_key: string
            region: string
        },
        activate: boolean
    ) => void
    removeAccount: (i: number) => void
    setActiveAccount: (account_id: string) => void
}

const useAccountsStore = create(
    persist<AccountsStore>(
        (set) => ({
            accounts: [],
            active_account: null,
            addAccount: (account, activate) =>
                set((state) => {
                    if (
                        state.accounts.some((acc) => acc.name === account.name)
                    ) {
                        return
                    }
                    return {
                        accounts: [...state.accounts, account],
                        active_account: activate
                            ? account
                            : state.active_account,
                    }
                }),
            removeAccount: (i) =>
                set((state) => {
                    if (state.accounts.length == 1) {
                        return {
                            active_account_id: null,
                            accounts: [],
                        }
                    }
                    return {
                        accounts: state.accounts.filter((_, idx) => idx !== i),
                        active_account_id: state.accounts[i - 1]?.name,
                    }
                }),
            setActiveAccount: (account_id) =>
                set((state) => ({
                    active_account:
                        state.accounts.find((acc) => acc.name === account_id) ||
                        null,
                })),
        }),
        {
            name: 'accounts-store',
            storage: createJSONStorage(() => storage),
        }
    )
)

export default useAccountsStore
