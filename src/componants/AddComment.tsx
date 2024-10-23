import { useEffect, useState } from "react";
import CommentDialog from "./Dialog/CommentDialog";
import { useSelector } from "react-redux";
import { CreateComment, addCommentPost } from "@/utils/fetchComments";

const AddComment = (props: any) => {
  const { blogId, refresh } = props;
  const user = useSelector((state: any) => state.user);
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  // const [openDialog, setOpenDialog] = useState(false);
  const handleSubmit = async () => {
    setError("");
    if (user) {
      try {
        const createCommentDto: CreateComment = {
          blogId: blogId,
          content: content,
          userId: user.id,
        };
        console.log("createCommentDto", createCommentDto);
        const responce = await addCommentPost(createCommentDto);
        console.log("responce", responce);

        if (responce.data) {
          setContent(""); // Clear the textarea after submission
          setIsOpenComment(false);
          refresh();
        } else {
          setError(responce.message);
        }
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      setError("Please sign in.");
    }
  };
  return (
    <div className="flex flex-col items-start p-0 gap-2.5 w-full h-full">
      {/* Add Comment button */}
      <div className={`my-6 ${!isOpenComment ? "flex" : "hidden"}`}>
        <button
          className="w-[132px] h-[40px]  text-success  font-semibold text-sm rounded-lg border border-success shadow-sm transition-colors "
          onClick={() => {
            setIsOpenComment(true);
          }}
        >
          Add Comment
        </button>
      </div>
      {/* Textarea Input Field */}
      {isOpenComment == true && (
        <div className=" flex-col items-start p-0 w-full h-[100px] mt-4 hidden lg:flex">
          <label className="hidden w-[74px] h-[20px] text-[#1C1C1C] font-medium text-sm">
            Label
          </label>
          <div className="flex flex-row items-center p-3.5 w-full h-full bg-white border border-[#DADADA] rounded-lg">
            <textarea
              className="w-full h-[80px] resize-none bg-transparent border-none text-[#5B5B5B] placeholder:text-[#3C3C3C] focus:outline-none"
              placeholder="Enter your text here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
      )}
      {/* Error Message */}
      {error && (
        <div
          className="p-4 text-sm rounded-lg bg-red-500 text-white  w-full"
          role="alert"
        >
          <span className="font-medium">{error}</span>
        </div>
      )}
      {/* Buttons */}
      {isOpenComment == true && (
        <div className=" flex-row justify-end items-start gap-3 w-full h-[40px] hidden lg:flex">
          <button
            onClick={() => setIsOpenComment(false)}
            className=" w-[105px] h-full bg-white border border-success rounded-lg shadow-sm"
          >
            <span className="text-success font-semibold text-sm">Cancel</span>
          </button>
          <button
            onClick={() => handleSubmit()}
            className=" w-[105px] h-full bg-success border border-success rounded-lg shadow-sm"
          >
            <span className="text-white font-semibold text-sm">Submit</span>
          </button>
        </div>
      )}

      {/* Dialog Box */}
      <div className="lg:hidden lg">
        <CommentDialog
          blogId={blogId}
          comment={null}
          isOpen={isOpenComment}
          onClose={() => {
            setIsOpenComment(false);
            refresh();
          }}
          header="Add"
        />
      </div>
    </div>
  );
};
export default AddComment;
