import { useRecoilState } from "recoil"

import  {isauthenticated} from "../../store/recoil"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Topbar(){
    const [isauth,setauth] = useRecoilState(isauthenticated);
    const server = import.meta.env.VITE_backend_url;
    const navigation = useNavigate();
    return(
        <>
        <header>
        <div className="  flex justify-between bg-gray-900 p-5  text-white items-center">
            <div className="flex justify-between ">
        <Link to={"/home"}><div className="font-medium mr-2">Home</div></Link>
        <Link to={"/problem"}><div className="font-medium mr-2">Problem</div></Link>
        <Link to={"/profile"}><div className="font-medium mr-2">Profile</div></Link>
        <Link to={"/codeexec"}><div className="font-medium mr-2">Compiler</div></Link>
        </div>
        <div>
            <div className="flex justify-between">
        {isauth?<Link to={"/problem"}><div className="font-medium mr-2">Start Solving</div></Link>:null}
        {isauth==false?
        <Link to={"/signin"}><div className="font-medium mr-2">Login</div></Link>:
        <button onClick={async()=>{
            const resp = await axios.get(server+'/api/v1/user/'+"logout",{
                withCredentials:true
            });
            if(resp.data.success==true){
                setauth(false);
                navigation("/signin");
            }
            
            
        }}>Logout</button>
        }

          </div>
        </div>
        </div>
        </header>
        </>
    )
} 