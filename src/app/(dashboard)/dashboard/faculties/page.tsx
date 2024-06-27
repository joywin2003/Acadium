"use client";
import { Faculty } from "@prisma/client";
import { useEffect, useState } from "react";
import { getFacultyList } from "~/app/actions";
import { FacultyTable } from "~/components/tables/faculty/faculty-table";

export default function page() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  useEffect(() => {
    const updateFaculty = async () => {
      const userList = await getFacultyList();
      setFaculty(userList);
      console.log(userList);
    };
    updateFaculty();
  }, []);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        {/* <BreadCrumb items={breadcrumbItems} /> */}
        <FacultyTable data={faculty} />
      </div>
    </>
  );
}
