import React from "react";
import { db } from "~/server/db";

interface User {
  id: string;
  email: string;
}

const profile = async ({ params }: { params: { id: string } }) => {
  const user: User | null = await db.user.findUnique({
    where: { id: params.id },
  });
  return (
    <div>
      {/* <h2>{user!.email}</h2>
      <h2>{user!.id}</h2> */}
      hii
    </div>
  );
};

export default profile;
