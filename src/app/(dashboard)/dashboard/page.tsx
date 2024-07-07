import { cookies } from "next/headers";
import { getMailList } from "~/app/actions";
import { Mail } from "~/components/mail";
import { type Mail as MailType } from '~/types';

export default async function page() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  const mails = await getMailList();

  return (
    <div className="flex-col md:flex">
      <Mail
        mails={mails as MailType[]}
        defaultLayout={defaultLayout}
        // defaultCollapsed={defaultCollapsed !== undefined ? defaultCollapsed : false}
      />
    </div>
  );
}
