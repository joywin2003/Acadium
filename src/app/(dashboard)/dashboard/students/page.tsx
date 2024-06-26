"use client";
import { Breadcrumb as BreadCrumb } from "~/components/ui/breadcrumb";
import { UserClient } from "~/components/tables/client";
// import { users } from '~/constants/data';
const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];

import { useMutation } from "@tanstack/react-query";
import { getStudentList } from "~/app/api/user/actions";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export default function page() {
  // let users:User[];
  const [users, setUsers] = useState<User[]>([]);

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
        <UserClient data={users} role="Student" />
      </div>
    </>
  );
}
