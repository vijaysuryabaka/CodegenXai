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
  const [tlan, settLan] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isOtherFrom, setIsOtherFrom] = useState(false);
  const [isOtherTo, setIsOtherTo] = useState(false);

  const handleFromChange = (e) => {
    const selectedValue = e.target.value;
    setLan(selectedValue);

    if (selectedValue === "Other") {
      setIsOtherFrom(true);
    } else {
      setIsOtherFrom(false);
    }
  };

  const handleToChange = (e) => {
    const selectedValue = e.target.value;
    settLan(selectedValue);

    if (selectedValue === "Other") {
      setIsOtherTo(true);
    } else {
      setIsOtherTo(false);
    }
  };

  const handleClick = async () => {
    try {
      await llm.chat({
        messages: [
          {
            role: "system",
            content:  ` Your name is Codegenx AI. Your are converter will take code in one programming language as input, convert it into an optimized version in another programming language, and display the time and space complexities of both the original and converted code.

            Code Converter AI
            Objective:
            Develop an AI model capable of translating code from one programming language to another while optimizing the output. Additionally, the model should evaluate and display the time and space complexities of both the original and converted code.
            inputs are code ${code} and the language which you need to convert ${lan}
            Functionality:
            Code Input:
            Accept source code in a given programming language.
            The AI should recognize the input language or have a mechanism for the user to specify it.
            Code Conversion:
            Translate the source code into the target programming language.
            Ensure the logic, functionality, and intent of the original code remain intact.
            The AI should aim to produce optimized code, focusing on efficiency and readability.
            Complexity Evaluation:
            Analyze the time complexity of the original source code and the converted code.
            Analyze the space complexity of the original source code and the converted code.
            Output Display:
            converted code eg: use bash for the code segment seperate the code segment using triple backtick for the complete code segment
          
            Display the converted, optimized code.
            it should also provide the time and space complexity of the other language and original language code 
            Display a side-by-side comparison of time and space complexities for the original and converted code.
            Features:
            Language Support: The model should have a broad understanding of various popular programming languages including, but not limited to, Python, Java, C++, JavaScript, etc.
            
            Optimization Strategies: Implement techniques for code optimization, such as loop unrolling, constant folding, and dead code elimination, tailored to the intricacies of the target language.
            
            Complexity Analysis: Utilize algorithmic analysis to derive the time and space complexities. This may involve recognizing common coding patterns and known algorithms.
    
            `,  
          },
          { role: "user", content: `Language: ${tlan} \n\nCode: ${code}` },
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
      <h1 className="text-center mb-8 text-4xl font-extrabold text-blue-800 w-full">CODE CONVERTOR X AI</h1>
      
      
      <div className="flex w-full justify-center">
      
      <div className="mt-8 bg-white rounded-lg shadow-2xl p-8 max-w-5xl ml-4 relative bg-black-800 flex-1"> 
                {/* Select Language */}
                <div className="flex justify-evenly rounded-xl overflow-hidden p-8 w-full mr-4 bg-white"> 
                   
                    <select
                        value={lan}
                        onChange={handleFromChange}
                        className="w-1/4 rounded-md border p-4 text-xl text-black shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">From</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="R">R</option>
                        <option value="C#">C#</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="C++">C++</option>
                        <option value="Other">Other</option>
                    </select>

                    <select
                        value={tlan}
                        onChange={handleToChange}
                        className="w-1/4 rounded-md border p-4 text-xl text-black shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">To</option>
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
                <div className="flex justify-evenly">
                  {isOtherFrom && (
                      <div className="mb-6">
                          <label htmlFor="otherLanguage" className="block mb-2 font-bold text-lg">From</label>
                          <input
                              onChange={(e) => setLan(e.target.value)}
                              placeholder="Enter Language"
                              className="w-10/12 rounded-md border p-4 text-xl text-black shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                  )}

                  {isOtherTo && (
                      <div className="mb-6">
                          <label htmlFor="otherLanguage" className="block mb-2 font-bold text-lg">To</label>
                          <input
                              onChange={(e) => setLan(e.target.value)}
                              placeholder="Enter Language"
                              className="w-10/12 rounded-md border p-4 text-xl text-black shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                  )}
                </div>
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
        return (

          <div className="code-block p-4 rounded-md mb-4">

           <div className="flex justify-between items-center bg-gray-800 text-white p-2 rounded-t-md">
                        <span>{tlan || 'Select a language'}</span>
                        <button onClick={() => copyToClipboard(segment)} className="bg-grey-700 px-3 py-1 rounded-md hover:bg-grey-800 transition duration-300">Copy Code</button>
                    </div>
    {copied && <span className="absolute top-4 left-4 bg-green-600 text-white rounded-md p-3">Copied!</span>}
            <pre className="whitespace-pre-wrap text-xl text-white ">{segment}</pre>
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