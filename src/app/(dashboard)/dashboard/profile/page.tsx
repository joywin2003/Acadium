"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "~/app/actions";
import { User } from "~/types";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

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
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Card className="h-[550px] w-[550px] text-4xl">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Details of the user profile</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4 text-6xl">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={data.name} readOnly />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={data.email} readOnly />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="id">ID</Label>
                <Input id="id" value={data.id} readOnly />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="usn">USN</Label>
                <Input id="usn" value={data.usn} readOnly />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="branch">Branch</Label>
                <Input id="branch" value={data.branch} readOnly />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Edit</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;