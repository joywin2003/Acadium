"use client";

import { MailDisplay } from "~/components/mail/mail-display";
import { mails } from "~/components/mail/data";
import { TooltipProvider } from "~/components/ui/tooltip";
import { useScreenDetector } from "~/hooks/useScreenDetector";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OpenMail({ params }: { params: { id: string } }) {
  const { isDesktop } = useScreenDetector();
  const mail = mails.find((mail) => mail.id === params.id) || null;
  const router = useRouter();


  useEffect(() => {
    if(isDesktop) {
      router.replace("/dashboard/")
    }
  })

  return ( 
    <TooltipProvider>
      <MailDisplay mail={mail} />
    </TooltipProvider>
  );
}
