import type { Metadata } from "next";
import "@fontsource-variable/montserrat";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Photograms",
    template: "%s | Photograms",
  },
  description: "",
  icons: [
    {
      type: "image/png",
      url: "/logo.png",
      href: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["system", "light", "dark", "blue"]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
