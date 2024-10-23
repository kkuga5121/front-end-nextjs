import AddComment from "@/componants/AddComment";
import Blog from "@/componants/Blog";
import Comment from "@/componants/Comment";
import CommentDialog from "@/componants/Dialog/CommentDialog";
import ArrowLeft from "@/componants/Icons/ArrowLeft";
import { useBlog } from "@/hooks/useBlog";
import { formatShortDistanceToNow } from "@/lib/time.service";
import { IComment } from "@/types/comment.type";
import { useRouter } from "next/router";
//Blog to show Blog and comment
export default function BlogPage() {
  const router = useRouter();
  const { blogId } = router.query;
  //useBlog hook fetch blog and comment
  const { blog, loading, error, refresh } = useBlog(blogId as string);
  //return to previous page
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="flex w-screen bg-white items-start justify-center overflow-auto">
      <div className=" flex flex-col w-full lg:w-4/6 mx-4 justify-center bg-white my-5 mb-10">
        {/* Button to  previous page*/}
        <button className="flex mb-6 w-fit" onClick={() => handleBack()}>
          <ArrowLeft />
        </button>
        {/* Blog show full content */}
        <Blog refresh={refresh} data={blog ?? null} full={true} />
        {/* Add comment button */}
        <AddComment blogId={blogId} refresh={refresh} />
        {/* List comment of blog */}
        {blog?.comments.map((comment: IComment) => {
          return (
            <Comment
              refresh={refresh}
              data={comment}
              key={comment.id}
              username={comment.user.username}
              additionalInfo={formatShortDistanceToNow(comment.createdAt)}
              content={comment.content}
            />
          );
        })}
      </div>
    </div>
  );
}
