import AddComment from "@/componants/AddComment";
import Blog from "@/componants/Blog";
import Comment from "@/componants/Comment";
import ArrowLeft from "@/componants/Icons/ArrowLeft";
import SearchBar from "@/componants/SearchBar";
import useBlogs from "@/hooks/useBlogs";
import { IBlog, Tag } from "@/types/blog.type";
import Fuse from "fuse.js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OwnBlog() {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);
  // If no user is found, redirect to the login page
  if (!user) {
    router.push("/login");
  }
  const [searchBlog, setSearchBlog] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  //useBlogs to fetch list of blog
  const { blogs, loading, error, hasMore, loadMore, refresh } = useBlogs(
    selectedTag, //Community Select
    1, //page
    10, //limit by page
    user?.id // Pass user ID to fetch blogs specific to the user
  );
  const [results, setResults] = useState<any>(blogs); //blog result to show on page

  // Initialize Fuse.js for fuzzy searching blogs
  const fuse = new Fuse(blogs, {
    keys: ["title"], // Fields to search in 'title'
    includeScore: true, // Optional: Include score in results for further analysis
    threshold: 0.3, // Optional: Adjust threshold for fuzzy search
  });

  // Effect to update search results based on search input
  useEffect(() => {
    if (searchBlog) {
      const result = fuse.search(searchBlog);
      setResults(result.map((item) => item.item)); // Update results with search items
    } else {
      setResults(blogs); // Show all blogs when search input is empty
    }
  }, [searchBlog, blogs]); // Run this effect when searchBlog or blogs change

  return (
    <div className=" flex   w-full justify-center  overflow-x-auto">
      <div className="flex flex-col w-full lg:w-3/6 lg:px-0 px-4 items-center">
        {/* Seacrh bar by text search and community */}
        <SearchBar
          refresh={refresh}
          searchBlog={searchBlog}
          selectedTag={selectedTag}
          setSearchBlog={setSearchBlog}
          setSelectedTag={setSelectedTag}
        />
        {/* Blog list of Specific user */}
        <div className="flex flex-col border border-gray-400 rounded-xl py-2 w-full bg-white  mb-6">
          {results.map((data: IBlog, index: number) => (
            <Blog refresh={refresh} data={data} key={index} full={false} />
          ))}
        </div>
        {/* Show more Blog by button */}
        {hasMore && !loading && (
          <button
            className="flex bg-success load-more justify-center text-white font-semibold text-sm  items-center p-0 mb-6 w-[105px] h-[40px] rounded-full"
            onClick={loadMore}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
