import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { Toaster } from "sonner";
import Providers from "~/components/layout/providers";

export const metadata = {
  title: "Acadium",
  description:
    "Centralized management system for colleges, enabling efficient oversight of students, faculty, and administrative tasks. Built using Nextjs, Tailwind, NextAuth and Prisma",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning={true} className="text-xl md:text-lg">
        <Providers>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                error: "text-red-400 border-red-400",
                success: "text-green-400 border-green-400",
                warning: "text-yellow-400 border-yellow-400",
                info: "text-blue-400 border-blue-400",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
