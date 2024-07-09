"use client";
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
import { TMailSchema, mailSchema } from "~/server/api/schema/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

export default function ComposeMail() {
  const [open, setOpen] = React.useState(false);
  const defaultValues: TMailSchema = {
    subject: "",
    text: "",
    // labels: ["personal"],
  };
  const form = useForm<TMailSchema>({
    defaultValues,
    resolver: zodResolver(mailSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: TMailSchema) => {
      data = { ...data };
      console.log(data);
      return await sendMail(data);
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Mail sent successfully");
      queryClient.invalidateQueries({ queryKey: ["mail"] });
      form.reset(defaultValues);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
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
                    <Textarea
                      placeholder="Type your message here."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">Send</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
