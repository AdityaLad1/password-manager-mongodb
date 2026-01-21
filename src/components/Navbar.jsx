import React from "react";
import github from "../assets/github.svg";

const Navbar = () => {
  return (
    <nav className="bg-emerald-950 text-white font-bold">
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-5 ">
        <div className="logo text-2xl">
          <span className="text-green-500">&lt;</span>
          Password-Manager
          <span className="text-green-500">OP/&gt;</span>
        </div>
        <a
          target="_blank"
          rel="noopener noreferrer" //prevents security vulnerabilities when opening external links in a new tab by blocking access to window.opener and hiding referrer information
          href="https://github.com/AdityaLad1"
        >
          <button className="cursor-pointer text-white bg-emerald-900 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1">
            <img className="invert  w-10 p-1" src={github} alt="github logo" />
            <span className="font-bold px-2">GitHub</span>
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
