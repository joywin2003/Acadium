"use client";
import { useQuery } from "@tanstack/react-query";
// import { cookies } from "next/headers";
import { use } from "react";
import { getMailList } from "~/app/actions";
import { Mail } from "~/components/mail";
import { type Mail as MailType } from '~/types';

export default function page() {
  // const layout = cookies().get("react-resizable-panels:layout");
  // const collapsed = cookies().get("react-resizable-panels:collapsed");
  // const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  // const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;


  const {data,isLoading, error} = useQuery<MailType[] | null, Error>({
    queryKey: ["mail"],
    queryFn: async () => await getMailList(),
  })
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading mails</div>;
  if (!data) return <div>No mails found</div>;
  return (
    <div className="flex-col md:flex">
      <Mail
        mails={data as MailType[]}
        // defaultLayout={defaultLayout}
        // defaultCollapsed={defaultCollapsed !== undefined ? defaultCollapsed : false}
      />
    </div>
  );
}
