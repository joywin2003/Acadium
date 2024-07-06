"use server";


import { Faculty, Student} from "~/types";
import { db } from "~/server/db";
import { User } from "~/types";
import { TFacultyFormSchema, TStudentFormSchema, facultyFormSchema, studentFormSchema } from "~/server/api/schema/zod-schema";

export const getStudentList = async () => {
  const students: Student[] = await db.student.findMany();
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

export const createStudent = async (student: TStudentFormSchema) => {
  const validationResult = studentFormSchema.safeParse(student);

  if (!validationResult.success) {
    throw new Error("Validation error: " + validationResult.error.errors.map(e => e.message).join(", "));
  }

  const existingUser = await db.student.findMany({
      where: {
          OR:[
              {email: student.email},
              {phone: student.phone}
          ]
      }
  });

  if (existingUser.length > 0) {
    throw new Error("A student with this email or phone number already exists");
  }

  const newStudent = await db.student.create({
    data: student,
  });
  return newStudent;
};

export const createFaculty = async (faculty: TFacultyFormSchema) => {
  const validationResult = facultyFormSchema.safeParse(faculty);

  if (!validationResult.success) {
    throw new Error("Validation error: " + validationResult.error.errors.map(e => e.message).join(", "));
  }

  const existingUser = await db.faculty.findMany({
      where: {
          OR:[
              {email: faculty.email},
              {phone: faculty.phone}
          ]
      }
  }); 

  if (existingUser.length > 0) {
    throw new Error("A faculty member with this email or phone number already exists");
  }

  const newFaculty = await db.faculty.create({
    data: faculty,
  });
  return newFaculty;
};