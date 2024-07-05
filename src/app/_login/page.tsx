"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TLoginSchema, loginSchema } from "~/server/api/schema/zod-schema";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import { toast } from "sonner";

export default function Login() {
  return (
    <div className="h-68 flex min-w-60  rounded-lg border p-4">
      <Tabs defaultValue="student" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3 gap-1">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <LoginForm role="student" />
        </TabsContent>
        <TabsContent value="faculty">
          <LoginForm role="faculty" />
        </TabsContent>
        <TabsContent value="admin">
          <LoginForm role="admin" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

import React, { use } from "react";

const LoginForm = (role: { role: string }) => {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  });
  const router = useRouter();
  const onLogin = async (data: TLoginSchema) => {
    console.log(data);


    try {
      const myPromise = signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      toast.promise(myPromise, {
        loading: 'Loading...',
        success: (result) => {
          if (result?.ok) {
            setTimeout(() => {
              router.push("/dashboard");
            }, 2000);

            return "Login successful";
          } else {
            toast.error(result?.error);
          }
        },
        error: 'Error',
      });

    } catch (error) {
      toast.error("Error logging in");
    }


  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLogin)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="my-4 w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};
