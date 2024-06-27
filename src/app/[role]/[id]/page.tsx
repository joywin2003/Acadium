import React from "react";
import { db } from "~/server/db";

interface User {
  id: string;
  usn: string;
  email: string;
  name: string;
  branch: string;
  
}

const profile = async ({ params }: { params: { id: string } }) => {
  const user: User | null = await db.student.findUnique({
    where: { id: "clxwyjxji0000784i4whd95dr" },
  });
  return (
    <div>
      <h2>{user!.email}</h2>
      <h2>{user!.id}</h2>
      hii
    </div>
  );
};

export default profile;
