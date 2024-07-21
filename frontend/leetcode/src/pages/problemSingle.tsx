import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import { toast } from "react-toastify";

interface resptype {
  question: string;
  description: string;
}

export default function ProblemSingle() {
  const server = import.meta.env.VITE_backend_url;

  const [ques, setQuest] = useState<resptype>({
    question: "",
    description: ""
  });
  const [lang, setLanguage] = useState("c_cpp");
  const [code, setCode] = useState("c_cpp");
  const [output,setoutput] = useState({
    success:false,
    status:"wrong",
    testcases:""
  });
  useEffect(() => {
    const getData = async () => {
      const resp = await axios.get(server + "/api/v1/problem/" + id);
      setQuest(resp.data);
    };
    getData();
  }, []);

  const { id } = useParams();

 

  async function handleSubmit() {
      try{
        const resp = await axios.post(server+"/api/v1/submission/subm",{
          code:code,
          language:lang,
          probid:id
        },{
          withCredentials:true
        })
        setoutput(resp.data);
        toast(resp.data.success);
      }
      catch(error){
        toast("somthing went wrong");
      }
  }

  return (
    <div className="flex-1 bg-gray-100 text-gray-900 overflow-auto">
      <div className="container mx-auto py-8 px-4 md:px-8 mt-8 bg-white">
        <div className="text-2xl font-bold">{ques.question}</div>
        <h2 className="text-lg font-medium mt-2 mb-2">Problem Description</h2>
        <p className="text-gray-600 mb-2">{ques.description}</p>

        <div className="relative">
          <div className="absolute top-0 right-0">
            {/* Dropdown content here */}
            <select
              className="bg-white border border-gray-300 rounded-lg px-3 py-1"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="c_cpp">C++</option>
              <option value="java">Java</option>
              {/* Add other language options as needed */}
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
        </div>
            
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 "
          onClick={handleSubmit}
        >
          Submit
        </button>

        <h2 className="text-lg font-medium mb-2">Test Cases</h2>
        <div className="bg-gray-900 text-white rounded-lg p-4 h-96 overflow-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Input</h3>
              <pre className="bg-gray-800 rounded-lg p-4 overflow-auto">
                <p>{`
nums = [2, 7, 11, 15]
target = 9
                  `}</p>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Output</h3>
              <pre className="bg-gray-800 rounded-lg p-4 overflow-auto">
                <code>[0, 1]</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Explanation</h3>
              <p>Because nums[0] + nums[1] == 9, we return [0, 1].</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
        <h2 className="text-lg font-medium mb-2">Result</h2>
       <div className="bg-gray-900 text-white rounded-lg p-4 h-32 overflow-auto">
      <pre className="whitespace-pre-wrap">{JSON.stringify(output)}</pre>
     </div>
    </div>
      </div>
    </div>
  );
}
