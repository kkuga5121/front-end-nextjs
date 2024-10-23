import { PropsWithChildren, use, useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import Link from "next/link";
import Sidebar from "./SideBar";
import HomeIcon from "./Icons/HomeIcon";
import BlogIcon from "./Icons/BlogIcon";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
// import { RootState } from "@/store";

const MainLayout = (props: PropsWithChildren) => {
  const router = useRouter();
  const currentPath = router.asPath; // Gets the current path, including the query string
  const user = useSelector((state: any) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    console.log("currentPath", currentPath);
  };

  useEffect(() => {
    console.log("user.username out", user);
    if (user != null) {
      console.log("user.username In", user);
    }
  }, [user]);

  return (
    <div data-theme="light" className="flex flex-col">
      {/* Header */}
      <header className="flex w-full h-[60px] bg-green-500 justify-between items-center px-8">
        <div className="italic text-[20px] text-white font-header">a Board</div>
        <UserHeader
          isAuthenticated={user ? true : false}
          username={user ? user.username : ""}
        />
        {/* Toggle Drawer In mobile Mode */}
        <div className=" block lg:hidden w-6 h-6 items-center ">
          <button
            className=" text-white r w-full h-full"
            onClick={toggleDrawer}
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>
        </div>
      </header>
      <Sidebar
        isAuthenticated={user ? true : false}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        path={currentPath}
      />
      {/* Main LayOut */}
      <main
        className={` flex flex-row lg:h-[calc(100vh_-_60px)] bg-gray-100 transition-opacity duration-300 ease-in-out ${
          isOpen ? "bg-black bg-opacity-50" : "bg-gray-100"
        } h-screen `}
      >
        {/* Side Bar Desktop Mode */}
        <div className=" hidden lg:block p-8">
          <nav className=" flex flex-col w-[280px] h-full text-color-base">
            <Link
              href="/"
              className="flex items-center p-3 rounded-md hover:bg-green-600  gap-3"
            >
              <HomeIcon
                className="stroke-green-500"
                bold={currentPath === "/"}
              />
              <span
                className={`${
                  currentPath === "/" ? "font-bold" : "font-medium"
                }`}
              >
                Home
              </span>
            </Link>
            <Link
              href="/ownblog"
              className="flex items-center p-3 rounded-md hover:bg-green-600 gap-3"
            >
              <BlogIcon
                className="stroke-green-500"
                bold={currentPath === "/"}
              />
              <span
                className={`${
                  currentPath === "/ownblog" ? "font-bold" : "font-medium"
                }`}
              >
                Our Blog
              </span>
            </Link>
          </nav>
        </div>
        {/* Children Componant */}
        {props.children}
      </main>
    </div>
  );
};
export default MainLayout;
