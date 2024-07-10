"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type Mail } from "~/components/mail/data";
import { MailList } from "~/components/mail/mail-list";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TooltipProvider } from "~/components/ui/tooltip";
import { useMail } from "~/hooks/use-mail";
import { useScreenDetector } from "~/hooks/useScreenDetector";
import ComposeMail from "../compose-mail";
import { MailDisplay } from "./mail-display";

interface MailProps {
  mails: Mail[];
  isLoading?: boolean;
}

export function Mail({ mails, isLoading }: MailProps) {
  const [selectedMail, setSelected] = useState<Mail | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [mail] = useMail();
  const { isMobile, isTablet, isDesktop } = useScreenDetector();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!mails || !mails.length) return;
    const selectedMail =
      mails.find((item) => item.id === mail.selected) || null;
    setSelected(selectedMail);

    if (selectedMail) {
      if (isMobile) {
        router.push(`dashboard/mail/${selectedMail.id}`);
      } else if (isDesktop) {
        router.replace("/dashboard/");
      }
    }
  }, [mail.selected, mails, isMobile, isDesktop, router]);

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
                  <div className="h-24 text-center">Loading...</div>
                ) : mails && mails.length > 0 ? (
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
