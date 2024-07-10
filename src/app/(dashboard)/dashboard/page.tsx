"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { getMailList } from "~/app/actions";
import { Mail } from "~/components/mail";
import { useGlobalContext } from "~/context/store";
import { type Mail as MailType } from '~/types';

export default function page() {
  const {mailContext, setMailContext} = useGlobalContext();

  const {data,isLoading, error} = useQuery<MailType[] | null, Error>({
    queryKey: ["mail1"],
    queryFn: async () => await getMailList(),
  })
  if (error) {
    console.error("Error fetching mails:", error);
    toast.error("Error fetching mail. Please try again later.");
  }
  useEffect(() => {
    if (data) {
      setMailContext(data);
    }
  }, [data]);
  return (
    <div className="flex-col md:flex">
      <Mail
        mails={data as MailType[]}
        isLoading={isLoading}
      />
    </div>
  );
}
