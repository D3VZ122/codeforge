import axios from "axios";
import { useEffect, useState } from "react";
import Quesprobpage from "../components/quesprobpage";
import { useRecoilState } from "recoil";
import Sidebar from "../components/sidebar";

interface problemresp{
    question:string
    id:string
    difficulty:string
    
}

export default function Problems() {
    const [ques,setquest]= useState<problemresp[]>([]);
    const [page,setpage] = useState(0);
    const server = import.meta.env.VITE_backend_url;
    useEffect(() => {
        const fetchData = async () => { 
            try {
                const resp = await axios.get(server+"/api/v1/problem/all?page="+page);
                setquest(resp.data);
            } catch (error) {
                console.error("Error fetching problems:", error);
            }
        };

        fetchData();
    }, [page,server]);

    return (
        <>
        
        <div className="  p-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 ">
            <div className="cols-span-1">
               <Sidebar/>
            </div>
        
            <div className=" col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  mt-20">
            {ques.map(problem => (
               <Quesprobpage key={problem.id} id={problem.id} ques={problem.question} difficulty="MEDIUM"/>
            ))}
            <button onClick={()=>{setpage(page+1)}}>{'>>'}</button>
            </div>
            </div>
        </>
    );
}
