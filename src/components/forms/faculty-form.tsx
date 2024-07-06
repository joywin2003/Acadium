'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { createFaculty, createStudent } from '~/app/actions';
import { Button } from '~/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '~/components/ui/form';
import { Heading } from '~/components/ui/heading';
import { Input } from '~/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '~/components/ui/select';
import { Separator } from '~/components/ui/separator';
import { facultyFormSchema, type TFacultyFormSchema } from '~/server/api/schema/zod-schema';


const defaultValues: TFacultyFormSchema = {
    name: '',
    email: '',
    phone: '',
    branch: 'CSE',
    subjects: '',
};


export function FacultyForm() {
    const queryClient = useQueryClient();

    const form = useForm<TFacultyFormSchema>({
        resolver: zodResolver(facultyFormSchema),
        defaultValues
    });


    const mutation = useMutation({
        mutationFn: async (data: TFacultyFormSchema) => {
            return await createFaculty(data);
        },
        onSuccess: () => {
            toast.success('Faculty added successfully');
            queryClient.invalidateQueries({ queryKey: ['faculty'] });
            form.reset();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })


    return (
        <>
            <Heading title="Add New Faculty" description="Please fill in the details below to add a new faculty to the acadium."
            />
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(() => mutation.mutate(form.getValues()))}
                    className="w-full space-y-8"
                >
                    <div className="gap-8 md:grid md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phone" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="branch"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Branch</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Branch" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="CSE">CSE</SelectItem>
                                                <SelectItem value="IT">IT</SelectItem>
                                                <SelectItem value="ECE">ECE</SelectItem>
                                                <SelectItem value="EEE">EEE</SelectItem>
                                                <SelectItem value="MECH">MECH</SelectItem>
                                                <SelectItem value="CIVIL">CIVIL</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subjects"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subjects</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Subjects" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center justify-center md:justify-end gap-2 p-8">
                        <Button type="submit" className='w-full md:w-24 text-md'>Submit</Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
