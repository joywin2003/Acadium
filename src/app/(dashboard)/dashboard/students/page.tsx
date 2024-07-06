"use client";;
import { StudentTable } from "~/components/tables/student/student-table";
import { Student } from "~/types";
import { useEffect, useState } from "react";
import { getStudentList } from "~/app/actions";



export default function page() {
  // let users:User[];
  const [users, setUsers] = useState<Student[]>([]);

  useEffect(() => {
    const updateStudent = async () => {
      const userList = await getStudentList();
      setUsers(userList);
      console.log(userList);
    };
    updateStudent();
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        {/* <BreadCrumb items={breadcrumbItems} /> */}
        <StudentTable/>
      </div>
    </>
  );
}
