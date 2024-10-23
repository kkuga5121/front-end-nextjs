import httpService from "@/service/httpService";
import { IBlog } from "@/types/blog.type";
import { useState, useEffect, useCallback } from "react";
export function useBlog(id: string) {
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog function
  const fetchBlog = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      if (!id) return;

      let url = `/blog/${id}`;
      const response = await httpService.get<any>(url);
      if (response.data) {
        setBlog(response.data);
      } else {
        setError("Blog not Found");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]); // Dependency array includes id

  useEffect(() => {
    fetchBlog(); // Initial fetch when id changes
  }, [fetchBlog]); // Use fetchBlog in the effect

  // Refresh function to fetch the blog again
  const refresh = () => {
    fetchBlog(); // Call the fetchBlog function again
  };

  return { blog, loading, error, refresh };
}
