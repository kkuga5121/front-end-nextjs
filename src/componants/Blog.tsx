import { IBlog } from "@/types/blog.type";
import CommentIcon from "./Icons/CommentIcon";
import { useRouter } from "next/router";
import EditIcon from "./Icons/EditIcon";
import DeletleIcon from "./Icons/DeletleIcon";
import { useEffect, useState } from "react";
import BlogDialog from "./Dialog/BlogDialog";
import DeleteBlogDialog from "./Dialog/DeleteBlogDialog";
interface BlogProps {
  data: IBlog | null;
  full: boolean;
  refresh: () => void;
}
const Blog: React.FC<BlogProps> = ({ data, full, refresh }) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDelDialog, setOpenDelDialog] = useState<boolean>(false);

  // Handle click event to route new page
  const handleClick = () => {
    if (!full && data != null) {
      console.log("Blog Click");
      router.push("/blog?blogId=" + data.id);
    }
  };
  return (
    <div
      className={`flex flex-col justify-start items-start gap-2 w-full  min-h-[200px] bg-white ${
        !full ? "border-b border-gray-400 p-5" : ""
      }`}
    >
      {/* User Profile */}
      <div className="flex flex-row space-x-4 items-center w-full ">
        {/* User Image */}
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="/images/Avatar.png"
            alt={`${data?.user.username}'s profile`}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        {/* User name */}
        <span className="w-full text-gray-300 text-base font-medium  font-inter ">
          {data?.user.username}
        </span>
        {/* Edit And Delete Click */}
        <div className={` flex flex-row}`}>
          <button onClick={() => setOpenDialog(true)}>
            <EditIcon />
          </button>
          <button onClick={() => setOpenDelDialog(true)}>
            <DeletleIcon />
          </button>
        </div>
      </div>
      {/* Tag community */}
      <div className="flex flex-row items-center justify-center p-1 px-2 w-[80px] h-[24px] bg-gray-200 rounded-full">
        <span className="text-badge text-xs font-normal leading-4 text-center capitalize">
          {data?.community}
        </span>
      </div>
      {/* Title and  Content*/}
      <div
        className={`flex flex-col gap-y-4 w-full ${
          !full ? "hover:cursor-pointer select-none" : "cursor-text select-text"
        }`}
        onClick={!full ? handleClick : undefined}
      >
        {/* Title */}
        <span className="flex text-title text-xl font-semibold text-left capitalize ">
          {data?.title}
        </span>
        {/* Content */}
        <span
          className={`font-inter font-normal text-clip text-xs leading-[15px] ${
            !full ? "line-clamp-2" : "indent-8"
          } text-gray-900`}
        >
          {data?.content}
        </span>
      </div>
      {/* Count of Comment */}
      <div className="flex flex-row gap-1 items-center ">
        <CommentIcon />
        <span className="font-inter font-normal text-xs leading-[15px] text-gray-300">
          {data?._count.comments as string} Comments
        </span>
      </div>

      {/* Dialog */}
      <BlogDialog
        blog={data}
        isOpen={openDialog}
        onClose={() => {
          setOpenDialog(false);
          refresh();
        }}
      />
      <DeleteBlogDialog
        blog={data}
        isOpen={openDelDialog}
        onClose={() => {
          setOpenDelDialog(false);
          refresh();
        }}
      />
    </div>
  );
};
export default Blog;
