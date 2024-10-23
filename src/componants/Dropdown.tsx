import { useState } from "react";
import Item from "./Item";
import { Tag } from "@/types/blog.type";
const Dropdown = (props: any) => {
  const { setTag, title, tag } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(tag);
  //Taoggle Menu Item
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  //handle Change Tag
  const handleClick = (tag: Tag) => {
    let preTag = selectedTag;
    console.log(`Selected Tag: ${tag}`); // Handle selected tag (e.g., API call or state update)
    if (tag == preTag) {
      setSelectedTag(null);
      setTag(null);
    } else {
      setSelectedTag(tag);
      setTag(tag);
    }
    setIsOpen(!isOpen);
  };
  return (
    <div className=" inline-block text-left relative">
      {/* Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black opacity-50`}
          onClick={() => toggleDropdown()}
        ></div>
      )}
      {/* Dropdwon Header */}
      <button
        onClick={toggleDropdown}
        className={`text-success border-success lg:w-[215px] w-full z-10 flex flex-row ustify-start rounded-md border  shadow-sm px-4 py-2 h-[40px] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none`}
      >
        {/* Show Tag Selected */}
        <span className="flex w-full h-5 font-semibold text-sm leading-5 capitalize">
          {selectedTag != null ? selectedTag : title}
        </span>
        {/* Arrow Down Icon */}
        <div className="flex z-0">
          <svg
            className={`ml-2 w-5 h-5 z-0 transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </button>
      {/* Menu Item */}
      {isOpen && (
        <div
          className="absolute  mt-2 w-full lg:w-[320px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {/* List Item */}
          <div className="py-1" role="none">
            {Object.values(Tag).map((tag, index) => (
              <Item
                key={index}
                label={tag}
                select={selectedTag == tag ? true : false}
                onClick={() => handleClick(tag as Tag)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
