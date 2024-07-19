import { useState } from "react";
import Button from "./button";
import LabbeledInputs from "./input";
import axios from "axios";
import { useNavigate } from "react-router";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {useSetRecoilState } from "recoil";
import { isauthenticated } from "../../store/recoil";

interface AuthType {
    type: string;
}

interface UserDataType {
    username: string;
    name: string;
    password: string;
}



export default function Auth({ type }: AuthType) {
    const navigate = useNavigate();
    const setauth = useSetRecoilState(isauthenticated)
  
    const [userData, setUserData] = useState<UserDataType>({
        username: "",
        name: "",
        password: "",
    }); 

    
    const server = import.meta.env.VITE_backend_url;
    console.log(server);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
     
        try {
                const resp = await axios.post(server+"/api/v1/user/"+type,userData,{
                    withCredentials:true
                });
                
           if(type=="signin"&&resp.data.success==true){
            setauth(true);
            navigate("/home");
           }
           else if(resp.data.success==true&&type=="signup"){
            toast(resp.data.message);
            navigate("/signin");
           }
           else{
            toast(resp.data.message);
           }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
      
            if (error.response && error.response.data && error.response.data.message) {
            
                toast(error.response.data.message);
            } else {
                toast("An error occurred while processing your request.");
            }
        }
    };
    
    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-200">
                <div className="bg-white p-8 rounded-md border border-gray-300">
                    <div className="text-2xl font-bold mb-5">
                        {type === "signin" ? (
                            <div>Login To Sheetcode</div>
                        ) : (
                            <div>Sign Up for Sheetcode</div>
                        )}
                    </div>
                    <form onSubmit={handleSubmit}>
                        {type === "signup" ? (
                            <LabbeledInputs
                                type="text"
                                label="Name"
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Dev Pratap Singh"
                            />
                        ) : null}
                        <LabbeledInputs
                            type="text"
                            label="Email"
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    username: e.target.value,
                                })
                            }
                            placeholder="abc@gmail.com"
                        />
                        <LabbeledInputs
                            type="password"
                            label="Password"
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    password: e.target.value,
                                })
                            }
                            placeholder="*****"
                        />
                        {type === "signin" ? (
                            <Button
                                name="LOGIN"
                                size="large"
                                onclick={()=>{}}
                            />
                        ) : (
                            <Button
                                name="Register"
                                size="large"
                                onclick={()=>{}}
                            />
                        )}
                        {type === "signin" ? (
                                <span>Don't have an account? <Link to="/signup">Sign up</Link></span>
                            ) : (
                                <span>Already have an account? <Link to="/signin">Sign in</Link></span>
                            )}

                    </form>
                </div>
            </div>
        </>
    );
}
