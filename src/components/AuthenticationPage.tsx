/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import Link from "next/link";

import Acadium from "~/components/acadium.json";
import Login from "../app/_login/page";
// import Lottie from "lottie-react"
import ThemeToggle from "./layout/ThemeToggle/theme-toggle";

import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });



export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-4 top-8 md:right-8 md:top-8">
          <ThemeToggle />
        </div>

        <div className="relative hidden h-screen flex-col bg-muted p-10  text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acadium
          </div>

          <Lottie animationData={Acadium} className="mt-12 h-[70%]" />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-md">
                &ldquo;A well-designed system transforms our approach to
                education, turning chaos into order and allowing us to cultivate
                a thriving academic environment.&rdquo;
              </p>
              {/* <footer className="text-xs">Joywin Bennis</footer> */}
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="relative right-4  top-0 z-20 flex items-center py-8 text-lg font-medium md:absolute md:left-8 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acadium
          </div>
          <div className="mx-auto mt-16 flex h-[100%] w-full flex-col justify-center space-y-6 sm:w-[350px] md:mt-0">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your sjec email below to login to your account
              </p>
            </div>
            <Login />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
