import { IComment } from "@/types/comment.type";
import { CreateComment, addCommentPost, updateComment } from "@/utils/fetchComments";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface DialogCommentProps {
  isOpen: boolean;
  onClose: () => void;
  comment:IComment | null;
  blogId: string;
}

const CommentDialog: React.FC<DialogCommentProps> = ({
  isOpen,
  onClose,
  comment,
  blogId,
}) => {
  const user = useSelector((state: any) => state.user);
  const [header, setHeader] = useState<string>(comment ? "Edit" : "Create");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  //handle Submit Add
  const handleSubmit = async () => {
    setError("");
    if (user) {
      try {
        const payload: CreateComment = {
          blogId: blogId,
          content: content,
          userId: user.id,
        };
        console.log("payload", payload);
        let responce = null;
        if(!comment){
          responce = await addCommentPost(payload);
        }else{
          if (comment.userId == user.id) {
            responce = await updateComment(comment.id, payload);
          } else {
            responce = { message: "Can not Edit this Comment." };
          }
        }

        if (responce.data) {
          setContent(""); // Clear the textarea after submission
          alert("Success To " + header);
          onClose(); // Close the dialog
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
  //Clear error message
  useEffect(() => {
    setError("");
    if (comment) {
      setContent(comment.content);
    }
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <dialog
      open={isOpen}
      onClose={onClose}
      id="my_modal_3"
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Dialog Box */}
      <div className="bg-white rounded-lg shadow-lg w-80 flex flex-col p-6 gap-3 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-6 h-6 border-2 border-none text-black flex justify-center items-center rounded-full"
          onClick={onClose}
          aria-label="Close dialog"
        >
          X
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{header} Comment</h2>

        {/* Content */}
        <div className="flex-grow">
          <textarea
            className="w-full h-[150px] border border-gray-300 rounded-md p-2 resize-none text-color-base"
            placeholder="Enter your comments here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {/* Error Message */}
        {error && (
          <div
            className="p-4 text-sm text-red-800 rounded-lg bg-red-500 text-white"
            role="alert"
          >
            <span className="font-medium">{error}</span>
          </div>
        )}
        {/* Footer with buttons */}
        <div className="flex flex-col justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-white border border-success shadow-md rounded-md px-4 py-2 text-success font-semibold"
          >
            Cancel
          </button>
          <button
            className="bg-success border border-success shadow-md rounded-md px-4 py-2 text-white font-semibold"
            onClick={() => handleSubmit()}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
};
export default CommentDialog;
