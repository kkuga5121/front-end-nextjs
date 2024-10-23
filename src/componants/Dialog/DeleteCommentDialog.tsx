import { IBlog } from "@/types/blog.type";
import { IComment } from "@/types/comment.type";
import { deleteBlogPost } from "@/utils/fetchBlogs";
import { deleteCommentt } from "@/utils/fetchComments";
import { useState } from "react";
import { useSelector } from "react-redux";

interface DialogCommentDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  comment: IComment | null;
}
const DeleteCommentDialog: React.FC<DialogCommentDeleteProps> = ({
  isOpen,
  onClose,
  comment,
}) => {
  const user = useSelector((state: any) => state.user);
  const [error, setError] = useState<string>("");
  //handle submit to delete Blog
  const handleSubmit = async () => {
    setError("");
    if (user) {
      try {
        let responce = null;
        if (comment) {
            //Check user id of blog owner
          if (comment.userId == user.id) {
            responce = await deleteCommentt(comment.id);
          } else {
            responce = { message: "Can not Delete this Comment." };
          }
        }
        if (responce.data) {
          alert("Success To Delete");
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
  if (!isOpen) return null;

  return (
    <dialog
      open={isOpen}
      onClose={onClose}
      id="my_modal_3"
      className="fixed inset-0 flex items-center justify-center w-11/12 lg:w-[400px] "
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Dialog Box */}
      <div className=" bg-white rounded-lg shadow-lg w-full lg:w-full  flex flex-col p-6 gap-3 relative">
        {/* Title */}
        <h2 className="text-md font-semibold text-gray-900 mb-2  text-center mx-12">
          Please confirm if you wish to delete the comment
        </h2>

        {/* Content */}
        <div className="flex-grow font-normal leading-6 text-center text-gray-600">
          Are you sure you want to delete the comment? Once deleted, it cannot be
          recovered.
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
        <div className="flex lg:flex-row flex-col justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-white border border-success shadow-md rounded-md px-4 py-2 text-success font-semibold"
          >
            Cancel
          </button>
          <button
            className="bg-red-del border border-red-del shadow-md rounded-md px-4 py-2 text-white font-semibold"
            onClick={() => handleSubmit()}
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};
export default DeleteCommentDialog;
