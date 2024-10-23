import React from "react";

const SearchIcon = ({ className = "", bold = false }) => {
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 15.938L12.875 12.313M14.8333 7.60465C14.8333 11.2866 11.8486 14.2713 8.16667 14.2713C4.48477 14.2713 1.5 11.2866 1.5 7.60465C1.5 3.92276 4.48477 0.937988 8.16667 0.937988C11.8486 0.937988 14.8333 3.92276 14.8333 7.60465Z"
        stroke="#191919"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
