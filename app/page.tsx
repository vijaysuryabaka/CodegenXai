import Image from "next/image";
import Link from "next/link";
import componentsImg from "./assets/components.svg";
import { DownArrow, RightArrow } from "./icons";
import "./home.css";
import 'typeface-roboto';


export default function Home() {
  return (
    <main className="">
      <article className="grid lg:grid-cols-2">
        <div className="px-8 py-20 md:px-20 lg:py-48">
          <h1 className="text-5xl font-semibold text-transparent md:text-6xl gradient">
            CODEGEN X AI
          </h1>
          <p className="mt-2 text-lg">
            Copy paste
          </p>
          <div className="flex gap-2 mt-8">
            <Link
              href="/optimizer"
              className="flex content-center gap-2 px-4 py-2 font-semibold text-white transition-colors duration-200 rounded-lg bg-primary-600 hover:bg-primary-700"
            >
              Get Started
              <div className="m-auto">
                <RightArrow />
              </div>
            </Link>
            <a
              className="flex gap-2 px-4 py-2 font-semibold text-gray-600 transition duration-100 rounded-lg hover:text-gray-800"
              href="#features"
            >
              Learn more
              <div className="m-auto">
                <DownArrow />
              </div>
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center">
        <Image
                src="/lanpag.png"
                alt="Clerk Logo"
                width={1000}
                height={70}
                priority
                className="rounded-xl"
              />
        </div>
      </article>
      <article
        className="px-8 py-12 bg-black bg-opacity-5 md:px-20 md:py-24"
        id="features"
      >
        <h2 className="text-3xl font-semibold">What's under the hood?</h2>
        <p className="mt-2">
        
        </p>
        <div className="grid gap-8 mt-8 lg:grid-cols-3">
          <div className="flex flex-col h-56 gap-1 p-8 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-medium">CODEGENXAI</h3>
            <p className="text-gray-700">
               CodeSynergy's real-time AI assistance and collaboration features offer immediate support and suggestions to developers as they code. This ensures efficient issue resolution and fosters a dynamic and productive development process.
            </p>
            
          <Link
              href="/app"
              className="text-primary-600 cta hover:underline"
            >
              Get Started <span className="arrow">-&gt;</span>
              <div className="m-auto">
                <RightArrow />
              </div>
            </Link>
            </div>
          <div className="flex flex-col h-56 gap-1 p-8 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-medium">Unique and Comprehensive Solution</h3>
            <p className="text-gray-700">
             CodeSynergy provides a comprehensive solution that uniquely combines generative AI with community collaboration, setting it apart from other projects. 
             This holistic approach covers code optimization, debugging, code review, and real-time collaboration.

            </p>
            <div className="grow"></div>
            <a
              href="https://clerk.com/docs/reference/clerk-react/useuser?utm_source=vercel-template&utm_medium=template_repos&utm_campaign=nextjs_template"
              className="text-primary-600 cta hover:underline"
              target="_blank"
            >
              React Hooks <span className="arrow">-&gt;</span>
            </a>
          </div>
          <div className="flex flex-col h-56 gap-1 p-8 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-medium">GENX Community</h3>
            <p className="text-gray-700">
            We are committed to building a collaborative developer community within CodeSynergy, where knowledge sharing and problem-solving flourish.
            By choosing our project, you're not just getting a tool; you're joining a supportive network of developers.
            </p>
            <div className="grow"></div>
            <a
              href="https://clerk.com/docs/organizations/overview?utm_source=vercel-template&utm_medium=template_repos&utm_campaign=nextjs_template"
              className="text-primary-600 cta hover:underline"
              target="_blank"
            >
              Organizations <span className="arrow">-&gt;</span>
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
