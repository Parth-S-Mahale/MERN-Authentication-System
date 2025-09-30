import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, ArrowRight } from "lucide-react";
import { AppContent } from "../contexts/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = ({ darkMode, setDarkMode }) => {
  
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {        
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-10 absolute top-0">
      <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />

      <div className="w-full flex justify-end items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-100 text-gray-800 dark:text-white hover:scale-105 transition-transform"
        >
          {darkMode ? (
            <Sun size={20} className="text-black" />
          ) : (
            <Moon size={20} className="text-black" />
          )}
        </button>

        {userData ? (
          <div
            className={`${
              darkMode
                ? "w-9 h-9 flex justify-center items-center border-2 rounded-full text-white hover:bg-white transition-all duration-500 hover:text-black relative group"
                : "w-9 h-9 flex justify-center items-center border-2 rounded-full bg-black text-white hover:bg-gray-100 transition-all duration-500 hover:text-black relative group"
            }`}
          >
            {userData.name[0].toUpperCase()}
            <div
              className={`${
                darkMode
                  ? "absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10"
                  : "absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10"
              }`}
            >
              <ul className="list-none m-0 p-2 bg-gray-100 text-sm transition-all">
                {!userData.isAccountVerified && 
                  <li
                    onClick={sendVerificationOtp}
                    className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    VerifyEmail
                  </li>
                }

                <li
                  onClick={logout}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className={`flex items-center gap-2 border border-gray-600 dark:border-gray-400 rounded-full px-6 py-2 transition-all duration-600 ${
              darkMode
                ? "dark:text-white dark:hover:bg-gray-200 dark:hover:text-gray-800"
                : "text-gray-800 hover:bg-gray-800 hover:text-white"
            }
          `}
          >
            Login
            <ArrowRight className="w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
