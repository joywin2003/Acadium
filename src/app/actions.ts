/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//can be ignored as it is covered by zod validation
"use server";

import {
  type TFacultyFormSchema,
  type TMailSchema,
  type TStudentFormSchema,
  facultyFormSchema,
  mailSchema,
  studentFormSchema,
} from "~/server/api/schema/zod-schema";
import { db } from "~/server/db";
import { type Faculty, type Student, type User, type Mail } from "~/types";
import { getServerSession } from "next-auth";
import cuid from "cuid";
import { sub } from "date-fns";
import { genSalt, hash } from "bcrypt-ts";

export const getStudentList = async () => {
  try {
    const students: Student[] = await db.student.findMany();
    console.log("in student");
    return students;
  } catch (error) {
    console.error("Database connection error: ", error);
    throw error;
  }
};

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};
export const getFacultyList = async () => {
  try {
    await hashPassword("Hi");
    const faculty: Faculty[] = await db.faculty.findMany();
    return faculty;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (email: string) => {
  let student
  const user = await db.user.findUnique({
    where: { email: email },
    
  });
  if(user?.role == "student"){
     student = await db.student.findUnique({
      where: { email: email },

    })
  }
  console.log(user);
  const userTemp: User = {
    id: user?.id,
    usn: student?.usn,
    role: user?.role,
    name: user?.name ,
    email: user?.email,
    branch: "CSE",
  };
  return userTemp;
};

export const createStudent = async (student: TStudentFormSchema) => {
  const validationResult = studentFormSchema.safeParse(student);

  if (!validationResult.success) {
    throw new Error(
      "Validation error: " +
        validationResult.error.errors.map((e) => e.message).join(", "),
    );
  }

  const existingUSN = await db.student.findUnique({
    where: { usn: student.usn },
  });
  if (existingUSN) {
    throw new Error("A student with this USN already exists");
  }

  const existingUser = await db.student.findMany({
    where: {
      OR: [{ email: student.email }, { phone: student.phone }],
    },
  });

  if (existingUser.length > 0) {
    throw new Error("A student with this email or phone number already exists");
  }

  const isStudentExistInUser = await db.user.findMany({
    where: {
      email: student.email,
    },
  });

  if (isStudentExistInUser.length > 0) {
    throw new Error("A student with this email already exists");
  } else {
    const hashedPassword = await hashPassword(student.name);
    await db.user.create({
      data: {
        email: student.email,
        name: student.name,
        role: "student",
        password: hashedPassword,
      },
    });
  }

  const newStudent = await db.student.create({
    data: student,
  });
  return newStudent;
};



export const createFaculty = async (faculty: TFacultyFormSchema) => {
  const validationResult = facultyFormSchema.safeParse(faculty);

  if (!validationResult.success) {
    throw new Error(
      "Validation error: " +
        validationResult.error.errors.map((e) => e.message).join(", "),
    );
  }

  const existingUser = await db.faculty.findMany({
    where: {
      OR: [{ email: faculty.email }, { phone: faculty.phone }],
    },
  });

  if (existingUser.length > 0) {
    throw new Error(
      "A faculty member with this email or phone number already exists",
    );
  }

  const isFacultyExistInUser = await db.user.findMany({
    where: {
      email: faculty.email,
    },
  });

  if (isFacultyExistInUser.length > 0) {
    throw new Error("A faculty with this email already exists");
  } else {
    const hashedPassword = await hashPassword(faculty.name);
    await db.user.create({
      data: {
        email: faculty.email,
        name: faculty.name,
        role: "faculty",
        password: hashedPassword,
      },
    });
    const newFaculty = await db.faculty.create({
      data: faculty,
    });
    return newFaculty;
  }
};

export const sendMail = async (mail: TMailSchema) => {
  try {
    const validationResult = mailSchema.safeParse(mail);
    console.log(1, validationResult);
    console.log(2, mail);
    if (!validationResult.success) {
      throw new Error(
        "Validation error: " +
          validationResult.error.errors.map((e) => e.message).join(", "),
      );
    }
    const session = await getServerSession();
    // console.log(session);
    if (!session) {
      throw new Error("Not logged in");
    }
    const id = cuid();
    const date = sub(new Date(), { days: 0 }).toISOString();

    const newMail: Mail = await db.mail.create({
      data: {
        name: session.user?.name,
        email: session.user?.email,
        id,
        read: false,
        date,
        url: mail.url,
        subject: mail.subject,
        text: mail.text, 
      },
    });
    return newMail;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getMailList = async () => {
  try {
    const mails: Mail[] = await db.mail.findMany(
      {
        orderBy: {
          date: 'desc', 
        },
      }
    );
    console.log(1, mails);
    return mails;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const setMailAsRead = async (id: string) => {
  try {
    const mail = await db.mail.findUnique({
      where: { id },
    });
    if (!mail) {
      throw new Error("Mail not found");
    }
    const updatedMail = await db.mail.update({
      where: { id },
      data: { read: true },
    });
    return updatedMail;
  } catch (err) {
    console.log(err);
    throw err;
  }
}