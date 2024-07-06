"use client";
import { Faculty } from "~/types";
import { useQuery } from "@tanstack/react-query";
import { getFacultyList } from "~/app/actions";
import { FacultyTable } from "~/components/tables/faculty/faculty-table";

export default function page() {

  const { data, error, isLoading } = useQuery<Faculty[] | null, Error>({
    queryKey: ["user"],
    queryFn: async () => await getFacultyList(),
  });
  console.log("1", data);



  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        {/* <BreadCrumb items={breadcrumbItems} /> */}
        <FacultyTable />
      </div>
    </>
  );
}
