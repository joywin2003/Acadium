'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
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
import { studentFormSchema, type TStudentFormSchema } from '~/server/api/schema/zod-schema';

const defaultValues: TStudentFormSchema = {
    name: '',
    usn: '',
    email: '',
    phone: '',
    branch: 'CSE',
    section: 'A',
};

export default function StudentForm() {
    const onSubmit = async (data: TStudentFormSchema) => { };

    const form = useForm<TStudentFormSchema>({
        resolver: zodResolver(studentFormSchema),
        defaultValues,
    });

    return (
        <>
            <Heading
                title="Add New Student"
                description="Please fill in the details below to add a new student to the acadium."
            />
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            name="usn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>USN</FormLabel>
                                    <FormControl>
                                        <Input placeholder="USN" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
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
                                                <SelectValue />
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
                            name="section"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Section</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="A">A</SelectItem>
                                                <SelectItem value="B">B</SelectItem>
                                                <SelectItem value="C">C</SelectItem>
                                            </SelectContent>
                                        </Select>
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