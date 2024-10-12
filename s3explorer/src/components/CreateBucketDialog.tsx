import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form'
import { useForm } from 'react-hook-form'
import { setErrorMap, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'
import useBucketStore from '../store/buckets'

interface CreateBucketDialogProps {
    open: boolean
    onClose: (open: boolean) => void
}

const createDialogValidator = z.object({
    bucketName: z.string().min(1, 'Name is required'),
})

const CreateBucketDialog: React.FC<CreateBucketDialogProps> = ({
    open,
    onClose,
}) => {
    const createBucketForm = useForm<z.infer<typeof createDialogValidator>>({
        resolver: zodResolver(createDialogValidator),
        defaultValues: {
            bucketName: '',
        },
    })
    const { toast } = useToast()
    const { setBuckets } = useBucketStore()
    const [error, setError] = useState('')

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new bucket</DialogTitle>
                </DialogHeader>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                )}
                <Form {...createBucketForm}>
                    <form
                        onSubmit={createBucketForm.handleSubmit(
                            async (data) => {
                                try {
                                    const result =
                                        await window.s3_api.createBucketPreload(
                                            data.bucketName
                                        )

                                    if (
                                        typeof result === 'string' &&
                                        result === 'BucketAlreadyExists'
                                    ) {
                                        setError(
                                            'The requested bucket name is not available. The bucket namespace is shared by all users of the system. Please select a different name and try again'
                                        )
                                        return
                                    }

                                    const buckets =
                                        await window.s3_api.getBuckets()
                                    setBuckets(
                                        buckets.map((bucket) => bucket.Name)
                                    )
                                    toast({
                                        title: 'Bucket created',
                                        description: `Bucket ${data.bucketName} created`,
                                    })
                                } catch (error) {
                                    console.log(error)

                                    toast({
                                        title: 'Error',
                                        description:
                                            'An error occurred while creating the bucket',
                                    })
                                } finally {
                                    onClose(false)
                                }
                            }
                        )}
                    >
                        <FormField
                            control={createBucketForm.control}
                            name="bucketName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name of the file</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="mt-4">
                            <Button className="w-full" type="submit">
                                Create Bucket
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBucketDialog
