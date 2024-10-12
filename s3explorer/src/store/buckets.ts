import { create } from 'zustand'

interface BucketsStore {
    buckets: string[]
    loading: boolean
    error: string | null
    setBuckets: (buckets: string[]) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    reset: () => void
}

const useBucketStore = create<BucketsStore>((set) => ({
    buckets: [],
    loading: false,
    error: null,
    setBuckets: (buckets: string[]) => set({ buckets }),
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
    reset: () => set({ buckets: [], loading: false, error: null }),
}))

export default useBucketStore
