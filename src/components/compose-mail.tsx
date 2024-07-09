import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "./ui/input";
import { PenIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, Form } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { sendMail } from "~/app/actions";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sub } from "date-fns";
import { useSession } from "next-auth/react";
import { Mail } from "~/types";
import cuid from "cuid";

export default function ComposeMail() {
  const { data: session } = useSession();
  const email = session?.user.email;
  const name = session?.user.name;
  const defaultValues: Mail = {
    id: "",
    name: name || "",
    subject: "",
    text: "",
    email: email || "",
    date: "",
    read: false,
    labels: ["personal"],
  };
  const form = useForm({ defaultValues });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: Mail) => {
      const id = cuid();
      const date = sub(new Date(), { days: 0 }).toISOString();
      data = { ...data, email, date, labels: ["personal"], name, id };
      console.log(data);
      return await sendMail(data);
    },
    onSuccess: () => {
      toast.success("Mail sent successfully");
      queryClient.invalidateQueries({ queryKey: ["mail"] });
      form.reset(defaultValues);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="absolute bottom-16 right-16 z-10 space-x-2 rounded-xl px-6 py-6 text-lg">
          <PenIcon className="h-4 w-4 md:h-5 md:w-5" /> <span>Compose</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New Email</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() =>
              mutation.mutate(form.getValues()),
            )}
          >
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type your message here." />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Send</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
