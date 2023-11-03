import {
  ClerkProvider,
  OrganizationSwitcher,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Docs, Github, Times } from "./icons";
import { Twitter } from "./icons";
import { Discord } from "./icons";
import { Metadata } from "next";

import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Next.js ",
  description:
    "A simple and powerful Next.js template featuring authentication and user management powered by Clerk.",
  openGraph: { images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#000000" },
          elements: {
            formButtonPrimary:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            socialButtonsBlockButton:
              "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
            socialButtonsBlockButtonText: "font-semibold",
            formButtonReset:
              "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
            membersPageInviteButton:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            card: "bg-[#fafafa]",
          },
        }}
      >
        <body className={`${roboto.className} min-h-screen flex flex-col`}>
          <header className="header-color flex items-center h-20 gap-4 px-4 rounded-b bg-slate-50">
            <Link href="/" className="flex items-center h-20 gap-2 sm:gap-4">
              <Image
                src="/Frame 5.png"
                alt="Clerk Logo"
                width={200}
                height={32}
                priority
              />

            </Link>


            <div className="grow" />

              
            <div className="flex items-center text-black">
              <div className="px-5 rounded-xl hover:bg-yellow-300 transition duration-300 shadow-md mr-3 height-100">
                <Link href="/optimizer">Optimizer</Link>
              </div>
              <div className="px-5 rounded-xl hover:bg-yellow-300 transition duration-300 shadow-md mr-3">
                <Link href="/review">Review</Link>
              </div>
              <div className="px-5 rounded-xl hover:bg-yellow-300 transition duration-300 shadow-md mr-3">
              <Link href="/summarizer">Summarizer</Link>
              </div>
              <div className="px-5 rounded-xl hover:bg-yellow-300 transition duration-300 shadow-md mr-3">
              <Link href="/convertor">Convertor</Link>
              </div>
              <div className="px-5 rounded-xl hover:bg-yellow-300 transition duration-300 shadow-md mr-3">
              <Link href="">Community</Link>
              </div>
            </div>
            <SignedIn>
              <div className="hidden sm:block">
                <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" />
              </div>
              <div className="block sm:hidden">
                <OrganizationSwitcher
                  afterCreateOrganizationUrl="/dashboard"
                  appearance={{
                    elements: {
                      organizationSwitcherTriggerIcon: `hidden`,
                      organizationPreviewTextContainer: `hidden`,
                      organizationSwitcherTrigger: `pr-0`,
                    },
                  }}
                />
              </div>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>
          <main className="grow">{children}</main>
          
        </body>
      </ClerkProvider>

      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </html>
  );
}



