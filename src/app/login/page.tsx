"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../components/ui/input";
import { TLoginSchema, loginSchema } from "~/server/api/schema/zod-schema";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  return (
    <div className="flex h-52 w-48 rounded-lg border">
      <Tabs defaultValue="student" className="w-[400px]">
        <TabsList>
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

import React from "react";

const LoginForm = (role: { role: string }) => {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  });

  const onLogin = (data: TLoginSchema) => {
    console.log(data);
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
