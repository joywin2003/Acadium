import { Mail } from "~/components/mail";
import { mails } from "~/components/data";
import { cookies } from "next/headers";

export default function page() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <div className="hidden flex-col md:flex">
      <Mail
        mails={mails}
        defaultLayout = {[265, 440, 655]}
        defaultCollapsed ={ false}
      />
    </div>
  );
}
