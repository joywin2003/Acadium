"use client";;
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { type TLoginSchema, loginSchema } from "~/server/api/schema/zod-schema";

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

const LoginForm = ({ role }: { role: "student" | "faculty" | "admin" | undefined }) => {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: role,
    },
  });
  const router = useRouter();
  const onLogin = async (data: TLoginSchema) => {
    console.log(data);
    try {
      const myPromise = signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        role: role,
      });

      toast.promise(myPromise, {
        loading: "Loading...",
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
        error: "Error",
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
                  <Input placeholder="" {...field} type="password"/>
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
