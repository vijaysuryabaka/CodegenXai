"use client";
import useLLM from "usellm";
import { useState, useRef, useEffect } from "react";
import React from 'react';
import AceEditor from 'react-ace';
import "./page.css"

import 'ace-builds/src-noconflict/mode-javascript'; // For JavaScript mode
import 'ace-builds/src-noconflict/theme-monokai'; // Monokai theme
import 'ace-builds/src-noconflict/mode-python';
import OpenAI from "openai";


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
            content: ` Your name is Codegenx AI. You have access to a Code Review and Analysis tool that can evaluate code written in various programming languages. This tool provides a detailed review of the code, including a rating on a scale of 1 to 10, and an explanation of its findings.Input as Language:{input} Code:{input} and the ouput should provide the scale of the code by analising the code with the other universal codes and provide the rating of the code and describe about the code and how to improvise this.the output { rating and steps to improvise the code} the asistant should reply with the rating of the code in scale of 10 and tips to improvise the code 
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
    return (
      <div className="dynamic-bg min-h-screen mx-auto my-8 max-w-4xl p-6 bg-slate-100 rounded-xl ">
            <h1 className="text-center mb-8 text-4xl font-bold text-blue-800">CODE REVIEW</h1>
            <div className="rounded-xl overflow-hidden shadow-2xl p-8 bg-white">

                {/* Select Language */}
                <div className="mb-6">
                    <label htmlFor="language" className="block mb-2 font-bold text-lg dark:text-white">Language</label>
                    <select
                        value={lan}
                        onChange={handleLanguageChange}
                        className="w-full rounded-md border p-4 text-xl text-black shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a language</option>
                        <option value="Python">Python</option>
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
                        mode="javascript"
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
                        height="318px"
                        className="rounded-b-md"
                    />
          </div>
          <button
            className="rounded-md bg-blue-700 text-white hover:bg-blue-800 transition duration-300 p-4 shadow-md mt-4 transform hover:scale-105 w-full"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
        {result && (
  <div className="mt-8 bg-white rounded-lg shadow-xl p-8 dark:bg-black-800 relative">
  <h2 className="text-2xl font-bold mb-6 text-blue-800 dark:text-white">Review Result:</h2>
    {result.split(/'''(.*?)'''/s).map((segment, index) => {
      if (index % 2 === 1) { // This checks if the segment is inside triple quotes, thus is code
        return (
          <div className="code-block p-4 bg-gray-800 text-white rounded-md mb-4">
            <pre className="whitespace-pre-wrap text-xl">{segment}</pre>
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
    {copied && <span className="absolute top-4 left-4 bg-green-600 text-white rounded-md p-3">Copied!</span>}
  </div>
)}
    </div>
  );
}