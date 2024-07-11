import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email().regex(/^[^\s@]+@sjec\.ac\.in$/, "must use sjec email id"),
    password: z.string(),
    role: z.enum(["student", "faculty", "admin"]),
});

export type TLoginSchema = z.infer<typeof loginSchema>;


export const facultyFormSchema = z.object({
    name: z.string().regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z.string().email("Invalid email").regex(/^[^\s@]+@sjec\.ac\.in$/, "must use sjec email id"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
    branch: z.enum(["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"]),
    subjects: z.string().nonempty("Subjects are required"),
    section: z.enum(["A", "B", "C"]),
});


export type TFacultyFormSchema = z.infer<typeof facultyFormSchema>;


export const studentFormSchema = z.object({
    name: z.string().regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    usn: z.string().regex(/^[0-9][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/, "Invalid USN"),
    email: z.string().email("Invalid email").regex(/^[^\s@]+@sjec\.ac\.in$/, "must use sjec email id"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
    branch: z.enum(["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"]),
    section: z.enum(["A", "B", "C"]),
})

export type TStudentFormSchema = z.infer<typeof studentFormSchema>;


export const mailSchema = z.object({
    subject: z.string().nonempty("Subject is required"),
    text: z.string().min(1, "Text is required"),
    image: z.array(z.instanceof(File)).max(5,"maximum 5 files can be uploaded")
});

export type TMailSchema = z.infer<typeof mailSchema>;