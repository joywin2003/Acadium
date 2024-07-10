"use client";
import { useQuery } from "@tanstack/react-query";
// import { cookies } from "next/headers";
import { use, useEffect } from "react";
import { getMailList } from "~/app/actions";
import { Mail } from "~/components/mail";
import { type Mail as MailType } from '~/types';
import { useGlobalContext } from "~/context/store";
import { toast } from "sonner";

export default function page() {
  // const layout = cookies().get("react-resizable-panels:layout");
  // const collapsed = cookies().get("react-resizable-panels:collapsed");
  // const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  // const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
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
  
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading mails</div>;
  // if (!data) return <div>No mails found</div>;
  return (
    <div className="flex-col md:flex">
      <Mail
        mails={data as MailType[]}
        isLoading={isLoading}
        // defaultLayout={defaultLayout}
        // defaultCollapsed={defaultCollapsed !== undefined ? defaultCollapsed : false}
      />
    </div>
  );
}
