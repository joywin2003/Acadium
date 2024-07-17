/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getFacultyList } from "~/app/actions";
import { AlertMessage } from "~/components/common/alertMessage";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { type Faculty } from "~/types";
import { columns } from "./columns";

export const FacultyTable: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, error, isLoading } = useQuery<Faculty[] | null, Error>({
    queryKey: ["faculty"],
    queryFn: async () => await getFacultyList(),
  });

  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`St. Joseph Engineering College - Faculty (${isLoading ? "Loading..." : data?.length})`}
          description={`Manage faculty records and functionalities on the client-side.`}
        />
        {session?.user.role === "admin" && (
          <Button
            className="mt-4 text-xs md:mt-0 md:text-sm"
            onClick={() => router.push(`/dashboard/faculty/new`)}
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
        <DataTable searchKey="name" loading={isLoading} columns={columns} data={data ?? []} />
      )}
    </>
  );
};
