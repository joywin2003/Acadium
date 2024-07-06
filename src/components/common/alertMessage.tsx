import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/components/ui/alert"

export function AlertMessage({title,message}:{title:string,message:string}) {
  return (
    <Alert>
      <AlertTitle className="font-bold text-xl">{title}</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}
