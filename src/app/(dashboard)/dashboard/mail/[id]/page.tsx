"use client";

import { MailDisplay } from "~/components/mail/mail-display";
import { mails } from "~/components/mail/data";
import { TooltipProvider } from "~/components/ui/tooltip";
import { useScreenDetector } from "~/hooks/useScreenDetector";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "~/context/store";

export default function OpenMail({ params }: { params: { id: string } }) {
  const { mailContext, setMailContext } = useGlobalContext();
  let mail = null;
  const { isDesktop } = useScreenDetector();
  if (mailContext) {
    mail = mailContext.find((mail) => mail.id === params.id) || null;
  } 
  const router = useRouter();

  useEffect(() => {
    if (isDesktop) {
      router.replace("/dashboard/");
    }
  });

  return (
    <TooltipProvider>
      <MailDisplay mail={mail} />
    </TooltipProvider>
  );
}
