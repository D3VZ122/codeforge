import React from "react";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { isauthenticated } from "../../store/recoil"; // Adjust this import based on your actual Recoil setup

export default function Topbar() {
  const [isauth, setauth] = useRecoilState(isauthenticated);
  const server = import.meta.env.VITE_backend_url;
  const navigation = useNavigate();

  const handleLogout = async () => {
    try {
      const resp = await axios.get(server + '/api/v1/user/logout', {
        withCredentials: true
      });

      if (resp.data.success) {
        setauth(false); // Update Recoil state
        navigation("/signin"); // Navigate to signin page
      } else {
        // Handle logout failure
        console.error("Logout failed:", resp.data.message);
        // Optionally show an error message to the user
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle network or other errors
    }
  };

  return (
    <header>
      <div className="flex justify-between bg-gray-900 p-5 text-white items-center">
        <div className="flex justify-between">
          <Link to={"/home"}>
            <div className="font-medium mr-2">Home</div>
          </Link>
          <Link to={"/problem"}>
            <div className="font-medium mr-2">Problem</div>
          </Link>
          <Link to={"/profile"}>
            <div className="font-medium mr-2">Profile</div>
          </Link>
          <Link to={"/codeexec"}>
            <div className="font-medium mr-2">Compiler</div>
          </Link>
        </div>
        <div>
          <div className="flex justify-between">
            {isauth ? (
              <Link to={"/problem"}>
                <div className="font-medium mr-2">Start Solving</div>
              </Link>
            ) : null}
            {isauth === false ? (
              <Link to={"/signin"}>
                <div className="font-medium mr-2">Login</div>
              </Link>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
