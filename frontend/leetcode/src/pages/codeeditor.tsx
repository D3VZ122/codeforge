import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import {  useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function CodeEditor() {
    const [lang, setLanguage] = useState("c_cpp");
    const [code, setCode] = useState("");
    const [input, setInput] = useState([{ input: "" }]);
    const [output, setOutput] = useState({
        output: "",
        error: " ",
    });

    const refs = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        // Focus the output section when output state changes
        refs.current?.scrollIntoView({ behavior: "smooth" });
    }, [output]);

    const server = import.meta.env.VITE_backend_url;
    return (
        <div className="relative">
            <div className="absolute top-0 right-0">
                <select
                    className="bg-white border border-gray-300 rounded-lg px-3 py-1"
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="c_cpp">C</option>
                    <option value="c_cpp">C++</option>
                    <option value="java">Java</option>
                </select>
            </div>
            <AceEditor
                className="mt-2 rounded-lg m-10"
                mode={lang}
                theme="dracula"
                onChange={(e) => setCode(e)}
                name="UNIQUE_ID_OF_DIV"
                width="90%"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    enableMultiselect: true
                }}
            />
            {input.map((item, index) => (
                <textarea
                    key={index}
                    className="mt-2 rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-blue-500 w-full"
                    placeholder={`Enter input ${index + 1}...`}
                    value={item.input}
                    onChange={(e) => {
                        const newInput = [...input];
                        newInput[index] = { input: e.target.value };
                        setInput(newInput);
                    }}
                ></textarea>
            ))}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={async () => {
                    if (code === "") {
                        toast("Please write some code");
                    } else {
                        try {
                            const resp = await axios.post(server + "/api/v1/submission/test", {
                                code,
                                language: lang,
                                inputs: input
                            });
                            setOutput(resp.data.data);

                        } catch (error) {
                            console.error("Error submitting code:", error);

                            toast.error("Error submitting code");
                        }
                    }
                }}
            >
                Submit
            </button>
            <div className="mt-6">
                <h2 className="text-lg font-medium mb-2" ref={refs}>Result</h2>
                <div className={output.error ? "text-red-700 bg-gray-900 rounded-lg p-4 overflow-hidden" : "bg-gray-900 text-white rounded-lg p-4 overflow-hidden"}>
                    <pre className="whitespace-pre-wrap">{output.error ? output.error : output.output}</pre>
                </div>

            </div>
        </div>
    );
}
