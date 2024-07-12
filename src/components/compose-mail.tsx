"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PenIcon } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { sendMail } from "~/app/actions";
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
import { TMailSchema, mailSchema } from "~/server/api/schema/zod-schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { FileUploader } from "./file-uploader";


async function uploadFile(file: File) {
  const cloudinaryAPI = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const cloudinaryURL = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;

  if (!cloudinaryAPI || !cloudinaryURL) {
    console.error("Cloudinary API Key or URL is not set");
    return;
  }

  if ( typeof file === 'undefined' ) return;

  const formData = new FormData();
  console.log(1, formData);
  formData.append('file', file);
  formData.append('upload_preset', 'q9e18w3l');
  formData.append('api_key', `${cloudinaryAPI}`);
  console.log(2, formData);

  const results = await fetch(`${cloudinaryURL}`, {
    method: 'POST',
    body: formData
  }).then(r => r.json());
  console.log(results.url);
  return results.url;
}


export default function ComposeMail() {
  const [open, setOpen] = React.useState(false);
  const defaultValues: TMailSchema = {
    subject: "",
    text: "",
    image: [],
    url: "",
    // labels: ["personal"],
  };
  const form = useForm<TMailSchema>({
    defaultValues,
    resolver: zodResolver(mailSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: TMailSchema) => {
      if(data.image.length !== 0){
        console.log(data.image[0]);
        const url = await uploadFile(data.image[0] as File);
        console.log(url);
        data = { ...data, image: [], url };
      }
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
        <Button className="absolute bottom-12 right-8 z-10 space-x-2 rounded-xl px-6 py-6 text-xl md:text-lg">
          <PenIcon className="h-4 w-4 md:h-5 md:w-5" /> <span>Compose</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New Email</AlertDialogTitle>
          <AlertDialogDescription>
            Send a mail using the form below
          </AlertDialogDescription>
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
                    <Input placeholder="Subject" {...field} />
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
            <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <div className="space-y-6">
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    maxFiles={4}
                    maxSize={4 * 1024 * 1024}
                    // progresses={progresses}
                    // pass the onUpload function here for direct upload
                    // onUpload={handleOnSubmit(field.value[0])}
                    // disabled={isUploading}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>           
            </div>
          )}
        />
            <AlertDialogFooter className="flex justify-between my-4">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">Send</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
