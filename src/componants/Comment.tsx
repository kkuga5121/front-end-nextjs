import React, { useState } from "react";
import PersonIcon from "./Icons/PersonIcon";
import CommentDialog from "./Dialog/CommentDialog";
import { IComment } from "@/types/comment.type";
import EditIcon from "./Icons/EditIcon";
import DeletleIcon from "./Icons/DeletleIcon";
import DeleteBlogDialog from "./Dialog/DeleteBlogDialog";
import DeleteCommentDialog from "./Dialog/DeleteCommentDialog";
import { da } from "date-fns/locale";

// Define the props for the component
interface CommentProps {
  username: string;
  additionalInfo: string;
  content: string;
  data: IComment;
  refresh: () => void;
}

const Comment: React.FC<CommentProps> = ({
  username,
  additionalInfo,
  content,
  data,
  refresh,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDelDialog, setOpenDelDialog] = useState<boolean>(false);

  return (
    <div className=" flex flex-col items-start gap-2 w-full  bg-white mt-6">
      <div className="flex flex-row items-center gap-2.5 w-full h-[40px] ">
        <PersonIcon />

        <div className="flex flex-row items-center gap-2.5 w-full h-8 justify-between">
          <div className="flex flex-row gap-2.5 "> 
            {/* User Name Text */}
            <div className=" h-5 font-inter font-bold text-sm leading-[17px] text-color-base">
              {username}
            </div>
            {/* Time */}
            <div className="w-20 h-4 font-inter font-normal text-xs leading-[15px] text-gray-300">
              {additionalInfo}
            </div>
          </div>
          {/* Edit And Delete Click */}
          <div className={` flex flex-row justify-end`}>
            <button onClick={() => setOpenDialog(true)}>
              <EditIcon />
            </button>
            <button onClick={() => setOpenDelDialog(true)}>
              <DeletleIcon />
            </button>
          </div>
        </div>
      </div>
      {/* Content Text */}
      <div className="flex flex-col items-start gap-2.5 w-full  px-0 lg:px-6">
        <div className="mx-6  font-inter font-normal text-xs leading-[15px] text-color-base">
          {content}
        </div>
      </div>
      {/* Dialog */}
      <CommentDialog
        comment={data}
        blogId={data.blogId}
        isOpen={openDialog}
        onClose={() => {
          setOpenDialog(false);
          refresh();
        }}
      />
      <DeleteCommentDialog
        comment={data}
        isOpen={openDelDialog}
        onClose={() => {
          setOpenDelDialog(false);
          refresh();
        }}
      />
    </div>
  );
};
export default Comment;
