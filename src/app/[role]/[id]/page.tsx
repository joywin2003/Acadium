"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query"; 
import { getUserProfile } from "~/app/actions"; 
import { User } from "~/types"; 

interface ProfileProps {
  params: { id: string };
}

const Profile: React.FC<ProfileProps> = ({ params }) => {
  const { data, error, isLoading } = useQuery<User | null, Error>({
    queryKey: ["user"],
    queryFn: async () => await getUserProfile(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user profile</div>;
  if (!data) return <div>No user profile found</div>; 

  return (
    <div>
      <h2>{data.email}</h2>
      <h2>{data.id}</h2>
      <h2>{data.name}</h2>
      <h2>{data.usn}</h2>
      <h2>{data.branch}</h2>
      <p>hii</p>
    </div>
  );
};

export default Profile;
