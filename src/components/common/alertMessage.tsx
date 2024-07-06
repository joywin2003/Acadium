import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export function AlertMessage({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <Alert>
      <AlertTitle className="text-xl font-bold">{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
