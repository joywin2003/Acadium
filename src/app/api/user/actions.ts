"use server";

import exp from "constants";
import { revalidatePath } from "next/cache";
import { faculty, students } from "~/constants/data";

export const getStudentList = async () => {
  return students;
};

export const getFacultyList = async () => {
  return faculty;
};
