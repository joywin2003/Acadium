/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { useSession } from "next-auth/react";

interface MailProps {
  mails: Mail[];
  isLoading?: boolean;
}

export function Mail({ mails= [], isLoading }: MailProps) {
  const [selectedMail, setSelected] = useState<Mail | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state
  const router = useRouter();
  const [mail] = useMail();
  const { isMobile,isTablet, isDesktop } = useScreenDetector();
  const { data: session } = useSession();
  useEffect(() => {
    setIsClient(true);
  }, []);
  

  useEffect(() => {
    if (!mails?.length) return;
    const selectedMail =
      mails.find((item) => item.id === mail.selected) ?? null;
    setSelected(selectedMail);

    if (selectedMail) {
      if (isMobile || isTablet) {
        router.push(`dashboard/mail/${selectedMail.id}`);
      } else if (isDesktop) {
        router.replace("/dashboard/");
      }
    }
  }, [mail.selected, mails, isMobile, isTablet, isDesktop, router]);

  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter mails based on search query
  const filteredMails = mails.filter(mail => 
    mail.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>{session?.user.role === "admin" && (<ComposeMail />)}
    <div className="h-full w-full">

      <TooltipProvider delayDuration={0}>
        <div className="flex h-full max-h-[800px] items-stretch">
        
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
                      <Input 
                        placeholder="Search" 
                        className="pl-8" 
                        value={searchQuery}
                        onChange={handleSearchChange} // Handle search input change
                      />
                    </div>
                  </form>
                </div>
                {isLoading ? (
                  <div className="h-24 text-center">Loading...</div>
                ) : filteredMails && filteredMails.length > 0 ? (
                  <>
                    <TabsContent value="all" className="m-0">
                      <MailList items={filteredMails} />
                    </TabsContent>
                    <TabsContent value="unread" className="m-0">
                      <MailList items={filteredMails.filter((item) => !item.read)} />
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
              <MailDisplay mail={selectedMail ?? null} />
            ) : null}
          </div>
        </div>
      </TooltipProvider>
    </div>
    </>
  );
}
