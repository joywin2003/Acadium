"use server";

import { faculty, students } from "~/constants/data";
import { db } from "~/server/db";
import { User } from "~/types";

export const getStudentList = async () => {
  return students;
};

export const getFacultyList = async () => {
  return faculty;
};

export const getUserProfile = async () => {
  const user = await db.student.findUnique({
    where: { id: "clxwyjxji0000784i4whd95dr" },
  });
  console.log(user);
  return user;
}