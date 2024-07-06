
import { FacultyForm } from '~/components/forms/faculty-form';
import { ScrollArea } from '~/components/ui/scroll-area';
import React from 'react';

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <FacultyForm/>
      </div>
    </ScrollArea>
  );
}