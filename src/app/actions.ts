"use server";


import { Faculty, faculty } from "~/constants/data";
import { db } from "~/server/db";
import { User } from "~/types";

export const getStudentList = async () => {
  const students = await db.student.findMany();
  return students;
};

export const getFacultyList = async () => {
  const faculty: Faculty[] = await db.faculty.findMany();
  return faculty;
};

export const getUserProfile = async (email: string) => {
  const user = await db.user.findUnique({
    where: { id: email },
  });
  console.log(user);
  const userTemp: User = {
    id: user?.id || "",
    usn:  "",
    role: user?.role || "student",
    name: "John Doe",
    email: user?.email || "",
    branch: "CSE",
  };

  return userTemp;
}

