import { cookies } from "next/headers";
import { Mail } from "~/components/mail";
import { mails } from "~/components/mail/data";

export default function page() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <div className="flex-col md:flex">
      <Mail
        mails={mails}
        defaultLayout={defaultLayout}
        defaultCollapsed={false}
      />
    </div>
  );
}
