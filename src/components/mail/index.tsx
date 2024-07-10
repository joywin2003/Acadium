"use client";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMailList } from "~/app/actions";
import { type Mail } from "~/components/mail/data";
import { MailList } from "~/components/mail/mail-list";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TooltipProvider } from "~/components/ui/tooltip";
import { useGlobalContext } from "~/context/store";
import { useMail } from "~/hooks/use-mail";
import { useScreenDetector } from "~/hooks/useScreenDetector";
import { type Mail as MailType } from "~/types";
import ComposeMail from "../compose-mail";
import { MailDisplay } from "./mail-display";

interface MailProps {
  // mails: Mail[];
  // isLoading?: boolean;
}

export function Mail(
  {
    // mails,
  }: MailProps,
) {
  const [selectedMail, setSelected] = useState<Mail | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [mail] = useMail();
  const { isMobile, isTablet, isDesktop } = useScreenDetector();
  const { mailContext, setMailContext } = useGlobalContext();
  const [mails, setMails] = useState<Mail[] | null>(null);

  // Fetch mail data
  const { data, isLoading, error } = useQuery<MailType[] | null, Error>({
    queryKey: ["mail"],
    queryFn: getMailList,
  });

  // Update global context with fetched mail data
  useEffect(() => {
    if (data) {
      setMails(data);
      setMailContext(data);
    }
  }, [data, setMailContext]);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle mail selection and navigation based on device type
  useEffect(() => {
    if (!mailContext || !mailContext.length) return;

    const selectedMail =
      mailContext.find((item) => item.id === mail.selected) || null;
    setSelected(selectedMail);

    if (selectedMail) {
      if (isMobile) {
        console.log("mobile");
        router.push(`dashboard/mail/${selectedMail.id}`);
      } else if (isDesktop) {
        console.log("not mobile");
        router.replace("/dashboard/");
      }
    }
  }, [mail.selected, mailContext, isMobile, isDesktop, router]);

  return (
    <div className="h-full w-full">
      <TooltipProvider delayDuration={0}>
        <div className="flex h-full max-h-[800px] items-stretch">
          <ComposeMail />
          <div className="flex w-full min-w-[200px] flex-col xl:w-2/5">
            <div className="flex h-full flex-col">
              <Tabs defaultValue="all" className="flex-1">
                <div className="flex items-center px-4 py-2">
                  <h1 className="text-xl font-bold">Inbox</h1>
                  <TabsList className="ml-auto">
                    <TabsTrigger
                      value="all"
                      className="text-zinc-600 dark:text-zinc-200"
                    >
                      All mail
                    </TabsTrigger>
                    <TabsTrigger
                      value="unread"
                      className="text-zinc-600 dark:text-zinc-200"
                    >
                      Unread
                    </TabsTrigger>
                  </TabsList>
                </div>
                <Separator />
                <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <form>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search" className="pl-8" />
                    </div>
                  </form>
                </div>
                {isLoading ? (
                  <div className="h-24 text-center" >Loading...</div>
                ) :  mails ? (
                  <>
                    <TabsContent value="all" className="m-0">
                      <MailList items={mails} />
                    </TabsContent>
                    <TabsContent value="unread" className="m-0">
                      <MailList items={mails.filter((item) => !item.read)} />
                    </TabsContent>
                  </>
                ) : (
                  <div className="h-24 text-center">No mails found</div>
                )}
              </Tabs>
            </div>
          </div>
          <div className="w-[1px] bg-gray-100 dark:bg-gray-800"></div>
          <div className="flex-1">
            {isClient && isDesktop ? (
              <MailDisplay mail={selectedMail || null} />
            ) : null}
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
