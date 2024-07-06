
import StudentForm from "~/components/forms/student-form";
import { ScrollArea } from '~/components/ui/scroll-area';
import React from 'react';

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <StudentForm/>
      </div>
    </ScrollArea>
  );
}