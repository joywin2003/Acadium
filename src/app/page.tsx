import Link from "next/link";
import { db } from "~/server/db";
import {LoginButton} from "@/components/login-button";
import AuthenticationPage from "./components/AuthenticationPage";


export default async function Home() {
  return (
    <AuthenticationPage />
  );
}


