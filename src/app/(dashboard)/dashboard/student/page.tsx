"use client";;
import { StudentTable } from "~/components/tables/student/student-table";

export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        {/* <BreadCrumb items={breadcrumbItems} /> */}
        <StudentTable />
      </div>
    </>
  );
}
