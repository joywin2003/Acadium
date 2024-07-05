"use client";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { Student } from "~/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getStudentList } from "~/app/actions";

export const StudentTable: React.FC = () => {
  const router = useRouter();
  const { data, error, isLoading } = useQuery<Student[] | null, Error>({
    queryKey: ["student"],
    queryFn: async () => await getStudentList(),
  });

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading className="text-7xl "
          title={`St. Joseph Engineering College - Student (${data?.length || 'Loading...'})`}
          description={`Manage student records and functionalities on the client-side.`}
        />

        <Button
          className="text-xs md:text-sm mt-4 md:mt-0"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data || []} />
    </>
  );
};
