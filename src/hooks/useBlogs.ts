import httpService from "@/service/httpService";
import { IBlog } from "@/types/blog.type";
import { useCallback, useEffect, useState } from "react";

interface UseBlogsResult {
  blogs: IBlog[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  userId: string | null;
  loadMore: () => void;
}
const useBlogs = (
  tag: string | null,
  initialPage: number = 1,
  limit: number = 5,
  userId: string | null = null
) => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [hasMore, setHasMore] = useState<boolean>(true);
  //Fectch List Blog
  const fetchBlogs = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        //parameter select
        let url = `/blog`;
        if (userId != null) {
          url = url + `/${userId}/user`;
        }
        let query = `?tag=${tag}&page=${page}&limit=${limit}`;
        if (tag == null) {
          query = `?page=${page}&limit=${limit}`;
        }
        // Complete URL for the request
        url = url + query;
        // Make the HTTP GET request
        const response = await httpService.get<any>(url);
        const { data } = response;

        // Update state with fetched data
        if (data) {
          setBlogs(
            (prevBlogs) => (page === 1 ? data : [...prevBlogs, ...data]) // If it's the first page, replace blogs, otherwise append
          );
          setHasMore(data.length === limit); // Check if there are more blogs to load
        } else {
          setError(response.message); // Handle response with no data
        }
      } catch (error: any) {
        setError(error.message); // Handle any fetch error
      } finally {
        setLoading(false); // Set loading state to false after fetch completes
      }
    },
    [userId, page, tag] // Dependencies: fetchBlogs will be recreated if these change
  );

  // Fetch blogs when the component mounts or when `tag` or `userId` changes
  useEffect(() => {
    setPage(1); // Reset page to 1 when tag or userId changes
    setBlogs([]); // Clear previous blogs
    fetchBlogs(1);
  }, [tag, userId]);

  // Load more blogs (pagination)
  const loadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      console.log("nextPage", nextPage);
      setPage(nextPage);
      fetchBlogs(nextPage);
    }
  };

  // Refresh function to fetch the blog again
  const refresh = () => {
    console.log("refresh");
    setPage(1);
    setBlogs([]);
    fetchBlogs(1);
  };
  return { blogs, loading, error, hasMore, loadMore, refresh };
};
export default useBlogs;
