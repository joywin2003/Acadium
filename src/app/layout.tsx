import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import Providers from "~/components/layout/providers";
import { Toaster } from 'sonner';

export const metadata = {
  title: "Acadium",
  description: "Centralized management system",
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
      <body suppressHydrationWarning={true}>
        <Providers>{children}<Toaster position="top-center" toastOptions={{
          classNames: {
            error: 'text-red-400 border-red-400',
            success: 'text-green-400 border-green-400',
            warning: 'text-yellow-400 border-yellow-400',
            info: 'text-blue-400 border-blue-400',
          },

        }
        } /></Providers>
      </body>
    </html>
  );
}
