"use client";
import useLLM from "usellm";
import { useState, useRef, useEffect } from "react";
import React from 'react';
import AceEditor from 'react-ace';
import "./page.css"
import "app/globals.css"

import 'ace-builds/src-noconflict/mode-javascript'; // For JavaScript mode
import 'ace-builds/src-noconflict/theme-monokai'; // Monokai theme
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-r';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-csharp';



import { motion, AnimatePresence} from "framer-motion"

export default function Home() {
  const llm = useLLM();
  const [code, setCode] = useState("");
  const [lan, setLan] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const handleLanguageChange = (e) => {
    const selectedValue = e.target.value;
    setLan(selectedValue);

    if (selectedValue === "Other") {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
    }
  };

  const handleClick = async () => {
    try {
      await llm.chat({
        messages: [
          {
            role: "system",
            content: `Harness the power of Codegenx AI, a sophisticated tool designed to review and analyze code written in diverse programming languages. Our system meticulously evaluates your code, benchmarking it against universal coding standards to provide both a numeric rating and actionable feedback.

            Input:
            
            Language: Specify the programming language of the provided code.
            Code: The code segment you wish to analyze.
            Output:
            
            Rating: On a scale of 1 to 10, where 1 indicates the lowest adherence to coding standards and 10 represents exemplary code.
            
            Feedback: Detailed insights about the code's strengths and weaknesses, and suggestions for improvement.

            Steps to Improve your code: detailed explaination of tips to improve your code
            
            Optimized Code (if applicable): Ensure the {language} isn't mentioned within the code block. Any suggested code revisions will be presented in the following format:{optimized code}.

            Example Output:
            "Rating: 8/10.
             Your code is well-structured but could benefit from more comments for clarity. Additionally, consider refactoring function XYZ to enhance efficiency.
              See the optimized code below:{optimized code} Leverage Codegenx AI to ensure your code not only functions optimally but also adheres to best practices in software development.
            `,  
          },
          { role: "user", content: `Language: ${lan} \n\nCode: ${code}` },
        ],
        max_tokens: 5000,
        stream: true,
        onStream: ({ message }) => setResult(message.content),
      });
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };

  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]); 

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const getEditorMode = () => {
    switch (lan) {
      case 'Python':
        return 'python';
      case 'JavaScript':
        return 'javascript';
      case 'Java':
        return 'java';
      case 'R':
        return 'r';
      case 'C#':
        return 'csharp';
      case 'C++':
        return 'c_cpp'; // AceEditor uses 'c_cpp' for both C and C++
      default:
        return 'text'; // Default mode for other languages
    }
};

    return (
<div className="dynamic-bg min-h-screen mx-auto my-8 max-w-9xl p-6 bg-slate-100 rounded-xl">
      <h1 className="text-center mb-8 text-4xl font-extrabold text text-blue-800 w-full">CODE REVIEW X AI</h1>
      
      
      <div className="flex w-full justify-center align-center">
      
      <div className="mt-8 bg-white rounded-lg shadow-2xl p-8 max-w-5xl ml-4 relative bg-black-800 flex-1"> 
                {/* Select Language */}
                <div className="rounded-xl overflow-hidden  p-8 bg-white max-w-xl w-1/2 mr-4"> 
                   
                    <select
                        value={lan}
                        onChange={handleLanguageChange}
                        className="w-full rounded-md border p-4 text-xl text-black shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a language</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="R">R</option>
                        <option value="C#">C#</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="C++">C++</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Other Language Input */}
                {isOtherSelected && (
                    <div className="mb-6">
                        <label htmlFor="otherLanguage" className="block mb-2 font-bold text-lg dark:text-white">Specify Language</label>
                        <input
                            value={lan}
                            onChange={(e) => setLan(e.target.value)}
                            placeholder="Type your language"
                            className="w-full rounded-md border p-4 text-xl text-black shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}
          <div className="editor-container mb-6 relative">
                    <div className="flex justify-between items-center bg-gray-800 text-white p-2 rounded-t-md">
                        <span>{lan || 'Select a language'}</span>
                        <button onClick={() => copyToClipboard(code)} className="bg-blue-700 px-3 py-1 rounded-md hover:bg-blue-800 transition duration-300">Copy Code</button>
                    </div>
  
                    <AceEditor
                      mode={getEditorMode()} // Set the mode dynamically
                      theme="monokai"
                      value={code}
                      fontSize={20}
                      onChange={setCode}
                      name="code-editor"
                      editorProps={{ $blockScrolling: true }}
                      setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 4,
                      }}
                      width="100%"
                      height="500px"
                      className="rounded-b-md flex"
                    />
          </div>
          <button
            className="rounded-md bg-blue-700 text-white hover:bg-blue-800 transition duration-300 p-4 shadow-md mt-4 transform hover:scale-105 w-full"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
        

      <AnimatePresence>
        {result && (
  <motion.div className="slide-in mt-8 bg-white rounded-lg shadow-xl p-8 w-1/2 ml-4 max-w-5xl relative bg-black-800 flex-1"
              initial={{scaleX:0}}
              animate={{scaleX:1}}
              exit={{scaleX:0}}
              transition={{duration:2, ease:[0.22, 1, 0.36, 1]}}>
  <h2 className="text-2xl font-bold mb-6 text-blue-800 dark:text-white">Solution:</h2>
   {result.split(/```(.*?)```/s).map((segment, index) => {
  if (index % 2 === 1) { // This checks if the segment is inside triple quotes, thus is code
    // Remove the language from the code segment if it exists
    const cleanedSegment = segment.replace(new RegExp(`^${lan}\\s*\\n`, 'gm'), '');
    return (
      <div className="code-block p-4 rounded-md mb-4">
        <div className="flex justify-between items-center bg-gray-800 text-white p-2 rounded-t-md">
          <span>{lan || 'Select a language'}</span>
          <button onClick={() => copyToClipboard(cleanedSegment)} className="bg-grey-700 px-3 py-1 rounded-md hover:bg-grey-800 transition duration-300">Copy Code</button>
        </div>
        {copied && <span className="absolute top-4 left-4 bg-green-600 text-white rounded-md p-3">Copied!</span>}
        <pre className="whitespace-pre-wrap text-xl text-white ">{cleanedSegment}</pre>
      </div>
    );
  } else {
    return <pre className="whitespace-pre-wrap text-xl">{segment}</pre>;
  }
})}
    <button 
      onClick={() => copyToClipboard(result)}
      className="absolute top-4 right-4 bg-blue-700 text-white rounded-md p-3 hover:bg-blue-800 transition duration-300 shadow-md"
    >
      Copy
    </button>
    {copied && <span className="absolute top-4 left-4  text-white rounded-md p-3">Copied!</span>}
  </motion.div>
)} 
</AnimatePresence>
</div>
    </div>
  );
}