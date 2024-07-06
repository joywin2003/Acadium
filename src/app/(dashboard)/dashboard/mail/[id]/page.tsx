import { MailDisplay } from "~/components/mail/mail-display";
import { mails } from "~/components/mail/data";
import { TooltipProvider } from "~/components/ui/tooltip";

export default function OpenMail({ params }: { params: { id: string } }) {
  const mail = mails.find((mail) => mail.id === params.id) || null;
  console.log(mail);

  return (
    <TooltipProvider>
      <MailDisplay mail={mail} />
    </TooltipProvider>
  );
}
