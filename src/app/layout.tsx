import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import Providers from "~/components/layout/providers";

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
