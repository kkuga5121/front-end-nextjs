import { Tag } from "@/types/blog.type";
import React, { useState } from "react";
interface ItemProps {
  select: boolean; // Select
  label: string;
  onClick: (tag: Tag) => void; // Function to call on click
}
const Item: React.FC<ItemProps> = ({ select, onClick, label }) => {
  return (
    <div
      onClick={() => onClick(label as Tag)}
      className={`flex flex-row items-center p-2.5 gap-2.5  h-11  ${
        select ? "bg-[#D8E9E4]" : "bg-white"
      } hover:bg-gray-100 hover:cursor-pointer`}
    >
      <div className="flex flex-row items-center gap-2  h-6 relative w-full">
        {/* Lebel Item */}
        <span className="w-10 h-6 font-medium text-base leading-6 text-[#1C1C1C]">
          {label}
        </span>
        {/* Select Icon */}
        <div
          className={`w-5 h-5 flex-none order-1 absolute right-0 ${
            select ? "block" : "hidden"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#4A4A4A"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default Item;
