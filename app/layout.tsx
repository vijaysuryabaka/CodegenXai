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


// import { Light300 } from 'next/font/google';

// const light300Font = Light300({
//   weight: ['300'],
//   style: ['normal'],
//   subsets: ['latin'],
//   display: 'swap',
// });




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
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet" />
    </head>
    {/* <body className={`${light300Font.className} min-h-screen flex flex-col`}> */}
    <body className={`min-h-screen flex flex-col`}>
          <header className="header-color flex justify-between items-center h-20 gap-4 px-4 rounded-b bg-slate-50">
            <div>
              <Link href="/" className="flex items-center h-20 gap-2 sm:gap-4">
                <Image
                  src="/Frame 5.png"
                  alt="Clerk Logo"
                  width={200}
                  height={32}
                  priority
                />

              </Link>
            </div>
            
            <div className="flex items-center text-black">
              <div className="px-5 rounded-xl hover:bg-black hover:text-white transition duration-300 mr-3">
                <Link href="/optimizer">Optimizer</Link>
              </div>
              <div className="px-5 rounded-xl hover:bg-yellow-300 transition duration-300 mr-3">
                <Link href="/review">Review</Link>
              </div>
              <div className="px-5 rounded-xl hover:bg-black hover:text-white transition duration-300 mr-3">
              <Link href="/summarizer">Summarizer</Link>
              </div>
              <div className="px-5 rounded-xl hover:bg-yellow-300 transition duration-300 mr-3">
              <Link href="/convertor">Convertor</Link>
              </div>
              <div className="px-5 rounded-xl hover:bg-black hover:text-white duration-300 mr-3">
              <Link href="">Community</Link>
              </div>
            </div>


            {/* <div className="grow" />    */}
         
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
          <main className="grow mt-5">{children}</main>
          
        </body>
      </ClerkProvider>

      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </html>
  );
}



