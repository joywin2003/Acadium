import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "./ui/input";
import { PenIcon } from "lucide-react";

export default function ComposeMail() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button  className="rounded-xl px-6 py-6 text-lg space-x-2 absolute bottom-16 right-16 z-10">
          <PenIcon className="h-4 w-4 md:h-5 md:w-5" /> <span>Compose</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New Email</AlertDialogTitle>

          <form>
            <Input id="email" placeholder="Email" />
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
