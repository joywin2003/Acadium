"use client";
import { PenIcon, Search } from "lucide-react";
import * as React from "react";

import { type Mail } from "~/components/mail/data";
import { MailList } from "~/components/mail/mail-list";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TooltipProvider } from "~/components/ui/tooltip";
import { useMail } from "~/hooks/use-mail";
import { Button } from "../ui/button";
import { MailDisplay } from "./mail-display";
import { useScreenDetector } from "~/hooks/useScreenDetector";
import { useRouter } from "next/navigation";

interface MailProps {
  mails: Mail[];
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
}

export function Mail({
  mails,
  defaultLayout = [265, 45, 55],
  defaultCollapsed = false,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();
  const { isMobile, isTablet, isDesktop } = useScreenDetector();

  const router = useRouter();

  

  return (
    <div className="h-full w-full">
      <TooltipProvider delayDuration={0}>
        <div className="flex h-full max-h-[800px] items-stretch">
          <Button className="absolute z-10 bottom-16 right-16 px-6 py-6 text-lg rounded-xl space-x-2">
            <PenIcon className="h-4 w-4 md:h-5 md:w-5" />
            <span>Compose</span>
          </Button>
          <div className="flex flex-col w-full xl:w-2/5 min-w-[200px]">
            <div className="flex flex-col h-full">
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
                <TabsContent value="all" className="m-0">
                  <MailList items={mails} />
                </TabsContent>
                <TabsContent value="unread" className="m-0">
                  <MailList items={mails.filter((item) => !item.read)} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="w-[1px] bg-gray-100"></div>
          <div className="flex-1">
            {isDesktop ? (
              <MailDisplay
                mail={mails.find((item) => item.id === mail.selected) || null}
              />
            ): null }
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
