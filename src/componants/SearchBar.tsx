import { FaSearch } from "react-icons/fa"; // You can use any icon library or SVG for the search icon
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { Tag } from "@/types/blog.type";
import BlogDialog from "./Dialog/BlogDialog";
import { tr } from "date-fns/locale";
import DropdownSearch from "./DropDownSearch";
interface SearchProps {
  searchBlog: string;
  selectedTag: Tag | null;
  refresh: () => void;
  setSearchBlog: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTag: React.Dispatch<React.SetStateAction<Tag | null>>;
}
const SearchBar: React.FC<SearchProps> = ({
  refresh,
  searchBlog,
  selectedTag,
  setSearchBlog,
  setSelectedTag,
}) => {
  //Dialog Taoggle
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openSearch, setOpenSeach] = useState<boolean>(false);

  return (
    <div
      className={`flex flex-row justify-between items-center w-full  h-[40px] gap-5 mx-auto my-6 ${
        !openSearch ? "" : " my-12 "
      }`}
    >
        {/* Search Text Input */}
      <div
        className={`flex  flex-row items-center h-[40px] xl:w-full rounded-lg px-4  
           ${
             !openSearch ? "" : " border w-full "
           } xl:border border-[#D8E9E4] gap-x-3`}
      >
        <FaSearch
          className="text-[#5B5B5B] w-5 h-5 lg:cursor-auto cursor-pointer select-none"
          onClick={() => setOpenSeach(!openSearch)}
        />
        {/* Text Input */}
        <input
          type="text"
          placeholder="Search"
          value={searchBlog}
          onChange={(e) => setSearchBlog(e.target.value)}
          className={`flex-grow text-[#5B5B5B] 
                    text-[16px] leading-[24px] min-w-2
                    focus:outline-none bg-gray-100 xl:block ${
                      !openSearch ? "hidden" : " "
                    }`}
        />
      </div>
      {/* Dropdown Select and Create blog Button */}
      <div
        className={`flex flex-row justify-end gap-x-2 ${
          openSearch ? "hidden xl:flex" : ""
        } `}
      >
        <DropdownSearch
          tag={selectedTag}
          setTag={setSelectedTag}
          title={"community"}
        />
        {/* Create blog Button */}
        <button
          onClick={() => setOpenDialog(true)}
          className="bg-success text-white font-semibold text-[14px] leading-[20px] items-center p-0 w-[105px]  rounded-lg"
        >
          Create +
        </button>
      </div>
      {/* Dialog */}
      <BlogDialog
        blog={null}
        isOpen={openDialog}
        onClose={() => {
          setOpenDialog(false);
          refresh();
        }}
      />
    </div>
  );
};
export default SearchBar;
