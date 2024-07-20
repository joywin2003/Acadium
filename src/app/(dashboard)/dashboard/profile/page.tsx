/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import React from "react";
import StudentProfile from "~/components/profile/studentProfile";
import { useSession } from "next-auth/react";
import AdminProfile from "~/components/profile/adminProfile";
import FacultyProfile from "~/components/profile/facultyProfile";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();
  return (
    <div>
      {session?.user.role === "student" && <StudentProfile />}
      {session?.user.role === "admin" && <AdminProfile />}
      {session?.user.role === "faculty" && <FacultyProfile />}
    </div>
  );
};

export default page;
