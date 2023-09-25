import React, { useState, useEffect } from "react";
import logo from "./static/logo.png";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";


function Navbar(props) {
  const navigate = useNavigate();
  let previousScrollY = 0;
  const [scrollDir, setscrollDir] = useState("up");
  const [searchTxt, setSearchTxt] = useState('')
  const userDarkMode =
    localStorage.getItem("darkMode") === null
      ? localStorage.setItem("darkMode", true)
      : localStorage.getItem("darkMode");
  if (userDarkMode === "false") {
    document.documentElement.classList.remove("dark");
  }
  const [darkMode, setdarkMode] = useState(
    userDarkMode === "false" ? false : true
  );

const searchHandle = (elem) =>{
  const inputText = elem.target.value;
  setSearchTxt(inputText);
}

const searchRequest = ()=>{
  props.searchHandle(searchTxt)
  navigate(`search/${searchTxt}`)
}

  const toggleMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      setdarkMode(false);
      localStorage.setItem("darkMode", false);
    } else {
      document.documentElement.classList.add("dark");
      setdarkMode(true);
      localStorage.setItem("darkMode", true);
    }
  };
  const hamBurger = () => {
    let bars = document.querySelectorAll(".bar");
    let content = document.querySelector("#content-box");
    bars = Array.from(bars);
    bars[0].classList.toggle("-rotate-45");
    bars[2].classList.toggle("rotate-45");
    bars[1].classList.toggle("opacity-0");
    bars[0].classList.toggle("translate-y-[6px]");
    bars[2].classList.toggle("-translate-y-[10px]");
    content.classList.toggle("-translate-y-[1000px]");
  };

  const search = () => {
    const navLinks = document.getElementById("navlinks");
    let content = document.getElementById("searchinp");
    content.classList.remove("-translate-y-full");
    navLinks.style.opacity = "0";

    const backbtn = document.getElementById("search-back-btn");
    backbtn.addEventListener("click", () => {
      content.classList.add("-translate-y-full");
      navLinks.style.opacity = "100%";
    });
  };

  const MIN_SCROLL_DISTANCE = 10;
  const debouncedOnScroll = debounce((scrollY) => {
    if (Math.abs(scrollY - previousScrollY) >= MIN_SCROLL_DISTANCE) {
      if (scrollY > previousScrollY) {
        // User is scrolling down
        setscrollDir("down");
      } else if (scrollY <= previousScrollY) {
        // User is scrolling up
        setscrollDir("up");
      }

      // Update the previous scroll position
      previousScrollY = scrollY;
    }
  }, 10); // Adjust the debounce delay as needed

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      debouncedOnScroll(scrollY);
    });

    // Remove the scroll event listener when the component unmounts
    return () => window.removeEventListener("scroll", debouncedOnScroll);
  });

  return (
    <>
      <header
        className={`${
          scrollDir === "up" ? "top-0" : "-top-full"
        } sticky left-0 right-0 w-full transition-all z-10`}
      >
        <nav className="flex justify-between items-center h-12 p-7 px-3 sm:px-7 z-[5] relative bg-white dark:bg-[#1e1e78]">
          <div className="left flex justify-between items-center space-x-3 xmd:hidden dark:invert">
            <div
              className="hamburger cursor-pointer h-[14px]"
              onClick={hamBurger}
            >
              <div className="bar transition-all bg-black w-6 h-[3px]"></div>
              <div className="bar transition-all bg-black w-6 h-[3px] my-[5px]"></div>
              <div className="bar transition-all bg-black w-6 h-[3px]"></div>
            </div>

            <div className="opacity-0 w-7"></div>
          </div>

          <div className="flex justify-center items-center space-x-4">
            <div className="logo w-[3rem] xmd:order-1 cursor-pointer dark:invert">
              <img src={logo} alt="logo" />
            </div>
            <div className="hidden xmd:block xmd:order-2" id="navlinks">
              <ul className="font-semibold font-serif flex text-sm [&>li]:cursor-pointer [&>li]:decoration-2  [&>li]:underline-offset-4 [&>li]:dark:invert">
            <li className="items-center flex h-14 mx-2 hover:underline"><NavLink exact={true ? "true" : "false"} to="/">Home</NavLink></li>
            <li className="items-center flex h-14 mx-2 hover:underline"><NavLink exact={true ? "true" : "false"} to='/world'>World</NavLink></li>
            <li className="items-center flex h-14 mx-2 hover:underline"><NavLink exact={true ? "true" : "false"} to='/nation'>Nation</NavLink></li>
            <li className="items-center flex h-14 mx-2 hover:underline"><NavLink exact={true ? "true" : "false"} to='/business'>Business</NavLink></li>
            <li className="items-center flex h-14 mx-2 hover:underline"><NavLink exact={true ? "true" : "false"} to='/technology'>Technology</NavLink></li>
            <li className="items-center flex h-14 mx-2 hover:underline"><NavLink exact={true ? "true" : "false"} to='/entertainment'>Entertainment</NavLink></li>
            <li className="items-center flex h-14 mx-2 hover:underline"><NavLink exact={true ? "true" : "false"} to='/sports'>Sports</NavLink></li>
            <li className="items-center flex h-14 mx-2 hover:underline"><NavLink exact={true ? "true" : "false"} to='/science'>Science</NavLink></li>
            <li className="items-center flex h-14 mx-2 hover:underline"><NavLink exact={true ? "true" : "false"} to='/health'>Health</NavLink></li>
              </ul>
            </div>
          </div>

          <div className="right flex justify-between items-center space-x-3 2xl:space-x-4 md:order-4 font-light font-serif text-xs dark:invert">
            <div
              className="cart xmd:flex items-center justify-around cursor-pointer hover:underline decoration-2  underline-offset-4 space-x-1 "
              onClick={search}
            >
              <span className="hidden 2xl:inline">Search</span>
              <div className="search w-7" id="searchbtn">
                <IconContext.Provider
                  value={{ color: "", className: "", size: "1.5em" }}
                >
                  <BsSearch />
                </IconContext.Provider>
              </div>
            </div>
            <div className="darkandlight xmd:flex items-center justify-around cursor-pointer space-x-1">
              <span className="hidden 2xl:inline">Mode</span>
              <div
                className="fill-transparent w-8 border border-black rounded-md h-8 flex justify-center items-center transition-all duration-1000"
                onClick={toggleMode}
              >
                {darkMode ? (
                  <IconContext.Provider
                    value={{ color: "black", className: "", size: "1.5em" }}
                  >
                    <BsFillBrightnessHighFill />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider
                    value={{ color: "black", className: "", size: "1.5em" }}
                  >
                    <BsMoon />
                  </IconContext.Provider>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div
          id="searchinp"
          className="h-14 w-full dark:bg-[#1e1e78] bg-white flex items-center justify-between xmd:justify-around px-2 absolute top-0 xmd:right-0 z-[6] -translate-y-full transition-all xmd:w-[84%]"
        >
          <div id="search-back-btn" className="dark:invert cursor-pointer">
            <IconContext.Provider
              value={{ color: "", className: "", size: "1.5em" }}
            >
              <FaArrowLeft />
            </IconContext.Provider>
          </div>
          <div className="flex border-blue-700 dark:border-white border-solid border-[2px] p-1 w-[87%] ">
            <div className="search w-7 mx-1 dark:invert" onClick={searchRequest}>
              <IconContext.Provider
                value={{ color: "", className: "", size: "1.4em" }}
              >
                <BsSearch />
              </IconContext.Provider>
            </div>
            <input
              type="search"
              className="outline-none bg-white  dark:text-white text-sm p-1 flex items-center w-full dark:bg-[#1e1e78]"
              placeholder="Search On News Beast"
              onChange={searchHandle}
              value={searchTxt}
              onKeyDown={(e)=>(e.keyCode === 13? searchRequest():'')}
            />
          </div>
        </div>
        <hr className="w-full h-[1.5px] bg-gray-300" />
        <div
          id="content-box"
          className="bg-[#f2f2f2] -translate-y-[1000px] top-15 w-full transition-all z-[4] absolute dark:bg-[#02021fe6] dark:[&>hr]:bg-white"
        >
          <ul className="text-base font-serif [&>li]:dark:invert font-bold">
            <li className="items-center flex h-14 mx-2" onClick={hamBurger}><Link to="/">Home</Link></li>
            <hr className="h-[1.5px] bg-gray-300" />
            <li className="items-center flex h-14 mx-2" onClick={hamBurger}><Link to='/world'>World</Link></li>
            <hr className="h-[1.5px] bg-gray-300" />
            <li className="items-center flex h-14 mx-2" onClick={hamBurger}><Link to='/nation'>Nation</Link></li>
            <hr className="h-[1.5px] bg-gray-300" />
            <li className="items-center flex h-14 mx-2" onClick={hamBurger}><Link to='/business'>Business</Link></li>
            <hr className="h-[2px] bg-gray-300" />
            <li className="items-center flex h-14 mx-2" onClick={hamBurger}><Link to='/technology'>Technology</Link></li>
            <hr className="h-[1.5px] bg-gray-300" />
            <li className="items-center flex h-14 mx-2" onClick={hamBurger}><Link to='/entertainment'>Entertainment</Link></li>
            <hr className="h-[1.5px] bg-gray-300" />
            <li className="items-center flex h-14 mx-2" onClick={hamBurger}><Link to='/sports'>Sports</Link></li>
            <hr className="h-[1.5px] bg-gray-300" />
            <li className="items-center flex h-14 mx-2" onClick={hamBurger}><Link to='/science'>Science</Link></li>
            <hr className="h-[1.5px] bg-gray-300" />
            <li className="items-center flex h-14 mx-2" onClick={hamBurger}><Link to='/health'>Health</Link></li>
            <hr className="h-[2px] bg-black shadow-2xl shadow-black" />
          </ul>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
