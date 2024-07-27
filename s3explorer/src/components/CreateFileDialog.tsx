import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form'
import { Input } from './ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTitle } from '@radix-ui/react-dialog'
import { FileIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { object, string, z } from 'zod'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'

const CreateFileValidation = object({
    name: string().min(1, 'Name is required'),
})

function CreateFileDialog({
    bucket,
    path,
    onFileCreate,
}: {
    bucket: string
    path: string
    onFileCreate: (key: string) => void
}) {
    const [isCreateFileDialogOpen, setIsCreateFileDialogOpen] = useState(false)

    const { toast } = useToast()

    const createFileForm = useForm<z.infer<typeof CreateFileValidation>>({
        resolver: zodResolver(CreateFileValidation),
        defaultValues: {
            name: '',
        },
    })

    return (
        <Dialog
            open={isCreateFileDialogOpen}
            onOpenChange={setIsCreateFileDialogOpen}
        >
            <DialogTrigger asChild={true}>
                <Button variant={'secondary'} size="sm">
                    <FileIcon size={24} className="p-1 " />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new file</DialogTitle>
                </DialogHeader>
                <Form {...createFileForm}>
                    <form
                        onSubmit={createFileForm.handleSubmit(
                            async (values) => {
                                try {
                                    await window.s3_api.saveObjectContent(
                                        `${path}/${values.name}`,
                                        '',
                                        bucket
                                    )

                                    toast({
                                        title: 'File created',
                                        description: `File ${values.name} created successfully`,
                                    })

                                    onFileCreate(values.name)
                                    setIsCreateFileDialogOpen(false)
                                } catch (error) {
                                    console.error(error)
                                }
                            }
                        )}
                    >
                        <FormField
                            control={createFileForm.control}
                            name="name"
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
                        <div className="flex justify-end mt-4">
                            <Button type="submit">Create</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateFileDialog
