// hooks/useUser.ts
import { useState, useEffect } from "react";
import { IUser } from "@/types/user.type";
import httpService from "@/service/httpService";
const useUser = (id: string) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //Fetech user
    const fetchUser = async (id: string) => {
      try {
        // Make a GET request to fetch user data by ID
        const response = await httpService.get<any>(`/user/${id}`);
        const { data } = response;
        if (data) {
          setUser(data); //set user data
        } else {
          setUser(null); //not user data
          setError(response.message); // Set error state with response message
        }
      } catch (error) {
        setError("Failed to fetch user."); // Set a generic error message
      } finally {
        setLoading(false);
      }
    };
    fetchUser(id);
  }, [id]); // Effect runs when the user ID changes

  return { user, loading, error };
};

export default useUser;
