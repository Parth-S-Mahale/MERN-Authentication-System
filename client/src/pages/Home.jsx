import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";

const Home = () => {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen
      bg-cover bg-center transition-all duration-600 ${darkMode ? "dark" : ""}`}
      style={{
        backgroundImage: darkMode
          ? "url('/bg_dark.png')" // Dark background
          : "url('/bg_img.png')", // Light background
      }}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <Header darkMode={darkMode} />
    </div>
  );
};

export default Home;
