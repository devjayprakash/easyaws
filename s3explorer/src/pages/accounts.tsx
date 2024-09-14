import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../components/ui/form'
import { Input } from '../components/ui/input'
import { useToast } from '../components/ui/use-toast'
import rocketImage from '../images/rocket.png'
import useAccountsStore from '../store/accounts-store'

const FormValues = z.object({
    key_name: z
        .string()
        .min(2, {
            message: 'Key name must be at least 2 characters long',
        })
        .max(255, {
            message: 'Key name must be less than 255 characters long',
        }),
    access_key: z.string().length(20, {
        message: 'Access key must be 20 characters long',
    }),
    secret_key: z.string().length(40, {
        message: 'Secret key must be 40 characters long',
    }),
    region: z.string(),
})

function AmazonCredPage() {
    const { addAccount } = useAccountsStore()
    const nav = useNavigate()
    const { toast } = useToast()

    const add_cred_form = useForm<z.infer<typeof FormValues>>({
        resolver: zodResolver(FormValues),
        defaultValues: {
            key_name: '',
            access_key: '',
            secret_key: '',
            region: '',
        },
    })

    const handleFormSubmission = async (info: z.infer<typeof FormValues>) => {
        const validate = await window.s3_api.validateCredentialsPreload(
            info.access_key,
            info.secret_key,
            info.region
        )

        console.log(validate)

        if (validate) {
            addAccount(
                {
                    name: info.key_name,
                    access_key: info.access_key,
                    secret_key: info.secret_key,
                    region: info.region,
                },
                true
            )
            nav('/', {
                replace: true,
            })
        } else {
            toast({
                title: 'Invalid credentials',
                description:
                    'Please check your access key, secret key and region',
            })
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-900">
            <Card>
                <CardHeader>
                    <h1 className="text-3xl font-semibold">
                        Let's add your account
                    </h1>
                    <span className="text-gray-400">
                        All access keys are stored locally and we do not collect
                        any information on any aws s3 usage.
                    </span>
                </CardHeader>
                <CardContent className="flex">
                    <div className="flex justify-center flex-shrink-0 px-12">
                        <img
                            className="aspect-auto w-[340px]"
                            src={rocketImage}
                            alt="rocket"
                        />
                    </div>
                    <Form {...add_cred_form}>
                        <form
                            onSubmit={add_cred_form.handleSubmit(
                                handleFormSubmission
                            )}
                            className="space-y-3"
                        >
                            <FormField
                                name="key_name"
                                control={add_cred_form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Key Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Write any name for your key"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="access_key"
                                control={add_cred_form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Access Key</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Your access key"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="secret_key"
                                control={add_cred_form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Secret Key</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder={'Your secret key'}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="region"
                                control={add_cred_form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Region</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your region"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        nav('/')
                                    }}
                                    variant={'secondary'}
                                >
                                    Use default account
                                </Button>
                                <Button
                                    className="gap-2 flex items-center"
                                    type="submit"
                                >
                                    <Plus />
                                    <span>Add access keys</span>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AmazonCredPage
