import Link from "next/link";
import { useState } from "react";
import HomeIcon from "./Icons/HomeIcon";
import BlogIcon from "./Icons/BlogIcon";
import { useDispatch } from "react-redux";
import ArrowBackIcon from "./Icons/ArrowBackIcon";
import { BiUserCircle } from "react-icons/bi";
import { clearUser } from "@/store/userSlice";

export default function Sidebar(props: any) {
  const { isOpen, setIsOpen, path, isAuthenticated } = props;
  const dispatch = useDispatch();
  return (
    <div className="fixed z-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-green-500 z-50
      transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0 " : "translate-x-full "
      } w-[280px] p-8 rounded-l-lg`} // Adjust rounded corners for right side
      >
        {/* Navigation Items */}
        <nav className=" flex flex-col gap-4 text-white p-0 z-50">
          <button
            className=" flex items-center py-3 rounded-md hover:bg-green-600 pl-3"
            onClick={() => setIsOpen(false)}
          >
            <ArrowBackIcon className="stroke-white" bold={true} />
          </button>
          <Link
            href="/"
            className="flex items-center p-3 rounded-md hover:bg-green-600  gap-3"
          >
            <HomeIcon className="stroke-white" bold={path === "/"} />
            <span className={`${path === "/" ? "font-bold" : "font-medium"}`}>
              Home
            </span>
          </Link>
          <Link
            href="/ownblog"
            className="flex items-center p-3 rounded-md hover:bg-green-600 gap-3"
          >
            <BlogIcon className="stroke-white" bold={path === "/blog"} />
            <span
              className={`${path === "/ownblog" ? "font-bold" : "font-medium"}`}
            >
              Our Blog
            </span>
          </Link>

          {isAuthenticated ? (
            <div
              className="flex items-center p-3 rounded-md hover:bg-green-600 gap-3"
              onClick={() => {
                dispatch(clearUser());
                setIsOpen(false);
              }}
            >
              <BiUserCircle className="stroke-white  w-6 h-6" />
              <span className={`font-medium`}>Sign Out</span>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center p-3 rounded-md hover:bg-green-600 gap-3"
            >
              <BiUserCircle className="stroke-white w-6 h-6" />
              <span className={`font-medium`}>Sign In</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
