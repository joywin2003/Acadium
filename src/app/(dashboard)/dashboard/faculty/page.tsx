"use client";

import { FacultyTable } from "~/components/tables/faculty/faculty-table";

export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        {/* <BreadCrumb items={breadcrumbItems} /> */}
        <FacultyTable />
      </div>
    </>
  );
}
