import { IBlog, Tag } from "@/types/blog.type";
import exp from "constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dropdown from "../Dropdown";
import { CreateBlog, addBlogPost, updateBlogPost } from "@/utils/fetchBlogs";

interface DialogBlogProps {
  isOpen: boolean;
  onClose: () => void;
  blog: IBlog | null;
}
const BlogDialog: React.FC<DialogBlogProps> = ({ isOpen, onClose, blog }) => {
  const user = useSelector((state: any) => state.user);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [header, setHeader] = useState<string>(blog ? "Edit" : "Create");
  const [error, setError] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  //handle Submit Edit or Add
  const handleSubmit = async () => {
    setError("");
    if (user) {
      try {
        const payload: CreateBlog = {
          title: title,
          content: content,
          community: selectedTag as Tag,
          userId: user.id,
        };
        console.log("payload", payload);
        let responce = null;
        if (!blog) {
          responce = await addBlogPost(payload);
        } else {
          if (blog.userId == user.id) {
            responce = await updateBlogPost(blog.id, payload);
          } else {
            responce = { message: "Can not Edit this Blog." };
          }
        }
        if (responce.data) {
          // Clear the  after submission
          setTitle("");
          setContent("");
          setSelectedTag(null);
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
  //Set State when Blog in change
  //Clear error message
  useEffect(() => {
    setError('')
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setSelectedTag(blog.community as Tag);
    }
  }, [blog]);

  if (!isOpen) return null;
  return (
    <dialog
      open={isOpen}
      onClose={onClose}
      id="my_modal_3"
      className="fixed inset-0 flex items-center justify-center w-11/12 lg:w-5/12 "
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Dialog Box */}
      <div className="bg-white rounded-lg shadow-lg w-full lg:w-full  flex flex-col p-6 gap-3 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-6 h-6 border-2 border-none text-black flex justify-center items-center rounded-full"
          onClick={onClose}
          aria-label="Close dialog"
        >
          X
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2 ">
          {header} Post
        </h2>

        {/* Community */}
        <Dropdown
          tag={selectedTag}
          setTag={setSelectedTag}
          title={"choose a community"}
        />

        {/* Header */}
        <div className="w-full min-w-[200px] ">
          <input
            className="w-full  border border-gray-300 rounded-md p-2  text-color-base "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        {/* Content */}
        <div className="flex-grow">
          <textarea
            className="w-full h-[150px] border border-gray-300 rounded-md p-2 resize-none text-color-base"
            placeholder="What’s on your mind..."
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
        <div className="flex lg:flex-row flex-col justify-end gap-2 mt-4">
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
export default BlogDialog;
