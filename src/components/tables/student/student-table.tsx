/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getStudentList } from "~/app/actions";
import { AlertMessage } from "~/components/common/alertMessage";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { type Student } from "~/types";
import { columns } from "./columns";

export const StudentTable: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data, error, isLoading } = useQuery<Student[] | null, Error>({
    queryKey: ["student"],
    queryFn: async () => await getStudentList(),
  });


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          className="text-7xl "
          title={`St. Joseph Engineering College - Student (${isLoading?"Loading...":data?.length})`}
          description={`Manage student records and functionalities on the client-side.`}
        />

        {session?.user.role === "admin" && (
          <Button
            className="mt-4 text-xs md:mt-0 md:text-sm"
            onClick={() => router.push(`/dashboard/student/new`)}
          >
            <Plus className="mr-2 h-4 w-4 " /> Add New
          </Button>
        )}
      </div>
      <Separator />
      {error ? (
        <AlertMessage
          title="Error Fetching Data"
          message={`Oops! We couldn't fetch the requested data right now. Please try again later.`}
        />
      ) : (
        <DataTable searchKey="name" columns={columns} loading={isLoading} data={data ?? []} />
      )}
    </>
  );
};
