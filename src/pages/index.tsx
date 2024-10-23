import Image from "next/image";
import localFont from "next/font/local";
import Blog from "@/componants/Blog";
import Comment from "@/componants/Comment";
import SearchIcon from "@/componants/Icons/SearchIcon";
import SearchBar from "@/componants/SearchBar";
import { useEffect, useState } from "react";
import { IBlog, Tag } from "@/types/blog.type";
import Fuse from "fuse.js";
import useBlogs from "@/hooks/useBlogs";
import BlogDialog from "@/componants/Dialog/BlogDialog";
import { tr } from "date-fns/locale";

// const posts = [
//   { id: 1, author: 'Wittawat', category: 'History', title: 'The Beginning of the End of the World', description: 'The afterlife sitcom The Good Place comes to its culmination...', comments: 32 },
//   { id: 2, author: 'Zach', category: 'History', title: 'The Big Short War', description: 'Tall, athletic, handsome with cerulean eyes...', comments: 4 },
//   { id: 3, author: 'Nicholas', category: 'Exercise', title: 'The Mental Health Benefits of Exercise', description: 'You already know that exercise is good for your body...', comments: 32 },
//   { id: 4, author: 'Carl', category: 'History', title: 'What Makes a Man Betray His Country?', description: 'The life of Adolf Tolkachev, Soviet dissident and CIA spy...', comments: 0 },
// ];
export default function Home() {
  const [searchBlog, setSearchBlog] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  //useBlogs to fetch list of blog
  const { blogs, loading, error, hasMore, loadMore, refresh } = useBlogs(
    selectedTag, //Community Select
    1, //page
    10 //limit by page
  );
  const [results, setResults] = useState<any>(blogs);
  // Initialize Fuse.js for fuzzy searching blogs
  const fuse = new Fuse(blogs, {
    keys: ["title"], // Fields to search in
    includeScore: true, // Optional: Include score in results for further analysis
    threshold: 0.3, // Optional: Adjust threshold for fuzzy search
  });
  // Effect to update search results based on search input
  useEffect(() => {
    console.log("searchBlog ", searchBlog);
    if (searchBlog) {
      const result = fuse.search(searchBlog);
      setResults(result.map((item) => item.item));
    } else {
      setResults(blogs); // Show all posts when search is empty
    }
  }, [searchBlog, blogs]); // Run this effect when searchBlog or blogs change

  return (
    <div className=" flex   w-full justify-center  overflow-x-auto ">
      <div className="flex flex-col w-full lg:w-3/6 px-6  items-center">
        {/* Seacrh bar by text search and community */}
        <SearchBar
          refresh={refresh}
          searchBlog={searchBlog}
          selectedTag={selectedTag}
          setSearchBlog={setSearchBlog}
          setSelectedTag={setSelectedTag}
        />
        {/* Blog list of Specific user */}
        <div className="flex flex-col border border-gray-400 rounded-xl py-2 bg-white w-full  mb-6">
          {results.map((data: IBlog, index: number) => (
            <Blog refresh={refresh} data={data} key={index} full={false} />
          ))}
        </div>
        {/* Show more Blog by button */}
        {hasMore && !loading && (
          <button
            className="flex bg-success justify-center text-white font-semibold text-sm  p-2 items-center mb-6 w-[105px] rounded-full"
            onClick={loadMore}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
